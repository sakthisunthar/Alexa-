import json
import logging
from datetime import datetime

from ..config import settings

logger = logging.getLogger(__name__)

_mcp_client = None


async def get_mcp_client():
    global _mcp_client
    if _mcp_client is not None:
        return _mcp_client
    try:
        from mcp import ClientSession
        from mcp.client.streamable_http import streamable_http_client

        read_stream, write_stream, _ = await streamable_http_client(
            settings.MCP_SERVER_URL
        ).__aenter__()
        session = ClientSession(read_stream, write_stream)
        await session.__aenter__()
        await session.initialize()
        _mcp_client = session
        logger.info("MCP client connected to %s", settings.MCP_SERVER_URL)
        return session
    except Exception as e:
        logger.warning("MCP client connection failed: %s", e)
        return None


async def call_mcp_tool(tool_name: str, arguments: dict) -> tuple[dict, dict]:
    activity = {
        "id": f"tool_{int(datetime.now().timestamp() * 1000)}",
        "tool": tool_name,
        "status": "pending",
        "summary": f"Calling {tool_name}...",
        "timestamp": datetime.now().isoformat(),
    }

    client = await get_mcp_client()
    if client is None:
        activity["status"] = "error"
        activity["summary"] = "MCP server not available"
        return {}, activity

    try:
        result = await client.call_tool(tool_name, arguments)
        content_text = ""
        for block in result.content:
            if hasattr(block, "text"):
                content_text += block.text

        parsed = json.loads(content_text) if content_text else {}
        activity["status"] = "success"
        activity["summary"] = _summarize_tool_result(tool_name, parsed)
        return parsed, activity
    except Exception as e:
        logger.error("MCP tool %s failed: %s", tool_name, e)
        activity["status"] = "error"
        activity["summary"] = f"Tool execution failed: {str(e)[:100]}"
        return {}, activity


async def generate_ai_response(
    message: str, trip_context: dict | None = None
) -> dict:
    tool_activities = []

    if settings.ai_configured:
        return await _call_ai_provider(message, trip_context, tool_activities)

    return _fallback_response(message, trip_context, tool_activities)


async def _call_ai_provider(
    message: str, trip_context: dict | None, tool_activities: list
) -> dict:
    try:
        import anthropic

        client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

        system_prompt = (
            "You are TripGenie, a helpful AI travel planning assistant. "
            "Help users plan trips by providing personalized recommendations, "
            "itineraries, and travel advice. Be conversational and helpful. "
            "When you have enough information, provide structured travel suggestions."
        )

        if trip_context:
            system_prompt += (
                f"\n\nCurrent trip context: destination={trip_context.get('destination')}, "
                f"dates={trip_context.get('startDate')} to {trip_context.get('endDate')}, "
                f"travelers={trip_context.get('travelers')}, "
                f"style={trip_context.get('travelStyle')}."
            )

        mcp_client = await get_mcp_client()
        tools_param = []
        if mcp_client:
            try:
                tools_list = await mcp_client.list_tools()
                for t in tools_list.tools:
                    tools_param.append({
                        "name": t.name,
                        "description": t.description or "",
                        "input_schema": t.inputSchema,
                    })
            except Exception as e:
                logger.warning("Failed to list MCP tools: %s", e)

        messages = [{"role": "user", "content": message}]

        create_kwargs = {
            "model": settings.AI_MODEL,
            "max_tokens": 2048,
            "system": system_prompt,
            "messages": messages,
        }
        if tools_param:
            create_kwargs["tools"] = tools_param

        response = client.messages.create(**create_kwargs)

        max_rounds = 5
        for _ in range(max_rounds):
            if response.stop_reason != "tool_use":
                break

            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result, activity = await call_mcp_tool(
                        block.name, block.input
                    )
                    tool_activities.append(activity)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": json.dumps(result),
                    })

            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": tool_results})

            create_kwargs["messages"] = messages
            response = client.messages.create(**create_kwargs)

        text_parts = [
            b.text for b in response.content if hasattr(b, "text")
        ]
        response_text = "\n".join(text_parts) or "I'm not sure how to help with that."

        return {
            "response": response_text,
            "trip": None,
            "toolActivity": tool_activities,
        }

    except Exception as e:
        logger.error("AI provider error: %s", e)
        return {
            "response": f"AI service encountered an error: {str(e)[:200]}",
            "trip": None,
            "toolActivity": tool_activities,
        }


def _fallback_response(
    message: str, trip_context: dict | None, tool_activities: list
) -> dict:
    msg = message.lower()

    if any(w in msg for w in ["hello", "hi", "hey"]):
        text = (
            "Hello! I'm TripGenie, your travel planning assistant. "
            "I'm currently running in sample-data mode (no AI provider configured). "
            "You can still use the trip planner form to generate itineraries from our "
            "curated destination database. How can I help?"
        )
    elif any(w in msg for w in ["budget", "cost", "price", "expensive", "cheap"]):
        text = (
            "For budget guidance, try filling out the trip planner form with your "
            "destination, dates, and budget. The planner will generate a cost "
            "breakdown based on our sample pricing data. Note: all prices are "
            "estimates from sample data, not live booking rates."
        )
    elif any(w in msg for w in ["plan", "itinerary", "trip", "travel"]):
        text = (
            "I'd love to help you plan! Use the trip planner form on the left to "
            "enter your destination, travel dates, budget, and preferences. "
            "I'll generate a personalized day-by-day itinerary. "
            "(Running in sample-data mode — connect an AI provider for conversational planning.)"
        )
    elif trip_context:
        text = (
            f"You're currently planning a trip to {trip_context.get('destination', 'your destination')}. "
            "To modify your itinerary, try adjusting the trip planner form and regenerating. "
            "(Conversational modifications require an AI provider to be configured.)"
        )
    else:
        text = (
            "I'm TripGenie, running in sample-data mode. I can help with basic "
            "travel questions, but for the full AI experience, an API key needs to "
            "be configured. Meanwhile, use the trip planner form to generate "
            "itineraries from our curated dataset!"
        )

    return {
        "response": text,
        "trip": None,
        "toolActivity": tool_activities,
    }


def _summarize_tool_result(tool_name: str, result: dict) -> str:
    if "destinations" in result:
        count = len(result["destinations"])
        return f"Found {count} destination{'s' if count != 1 else ''}"
    if "activities" in result:
        count = len(result["activities"])
        return f"Found {count} activit{'ies' if count != 1 else 'y'}"
    if "budget" in result or "totalEstimated" in result:
        return "Calculated budget estimates"
    if "days" in result:
        count = len(result["days"])
        return f"Built {count}-day itinerary"
    if "name" in result:
        return f"Retrieved info for {result['name']}"
    return f"{tool_name} completed"
