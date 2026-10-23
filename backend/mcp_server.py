"""
TripGenie MCP Server

Exposes travel-planning tools via the Model Context Protocol
using Streamable HTTP transport.

Run: python -m backend.mcp_server
"""

import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from mcp.server.mcpserver import MCPServer

from backend.data.destinations import (
    DESTINATIONS,
    find_destination,
    search_by_interests,
)
from backend.data.activities import filter_activities
from backend.services.budget_service import calculate_budget
from backend.services.trip_service import generate_trip

mcp = MCPServer(
    "TripGenie Travel Tools",
    description="Travel planning tools for destination search, budget calculation, activity discovery, and itinerary building.",
)


@mcp.tool()
def search_destinations(interests: list[str], region: str = "") -> str:
    """Search destinations matching the given interests and optional region.

    Args:
        interests: List of interests like culture, nature, food, adventure.
        region: Optional region filter like East Asia, Western Europe.

    Returns:
        JSON with matching destinations.
    """
    results = search_by_interests(interests, region)
    destinations = []
    for d in results[:5]:
        destinations.append(
            {
                "name": d["name"],
                "country": d["country"],
                "region": d["region"],
                "description": d["description"],
                "highlights": d["highlights"],
                "bestSeason": d.get("best_season", ""),
                "matchingInterests": [
                    i for i in interests if i.lower() in d.get("interests", [])
                ],
            }
        )
    return json.dumps({"destinations": destinations, "dataSource": "sample"})


@mcp.tool()
def get_destination_info(destination: str) -> str:
    """Get detailed information about a specific destination.

    Args:
        destination: Destination name like Kyoto, Paris, Bali.

    Returns:
        JSON with destination details, highlights, and practical info.
    """
    dest = find_destination(destination)
    if not dest:
        return json.dumps(
            {
                "error": f"No data found for '{destination}'. Available: "
                + ", ".join(d["name"] for d in DESTINATIONS.values())
            }
        )

    return json.dumps(
        {
            "name": dest["name"],
            "country": dest["country"],
            "region": dest["region"],
            "description": dest["description"],
            "highlights": dest["highlights"],
            "bestSeason": dest.get("best_season", ""),
            "interests": dest.get("interests", []),
            "dataSource": "sample",
        }
    )


@mcp.tool()
def calculate_trip_budget(
    destination: str,
    days: int,
    travelers: int,
    accommodation: str = "hotel",
    transportation: str = "mixed",
    travel_style: str = "moderate",
    currency: str = "USD",
    total_budget: float = 0,
) -> str:
    """Calculate estimated trip budget based on destination and preferences.

    Args:
        destination: Destination name.
        days: Number of days.
        travelers: Number of travelers.
        accommodation: Accommodation type (budget, hotel, boutique, luxury, apartment).
        transportation: Transport preference (public, rental, mixed, walking).
        travel_style: Travel style (relaxed, moderate, active, adventure).
        currency: Currency code.
        total_budget: Total trip budget for remaining calculation.

    Returns:
        JSON with budget breakdown by category.
    """
    budget = calculate_budget(
        destination=destination,
        days=days,
        travelers=travelers,
        accommodation=accommodation,
        transportation=transportation,
        travel_style=travel_style,
        currency=currency,
        total_budget=total_budget,
    )
    budget["dataSource"] = "sample"
    return json.dumps(budget)


@mcp.tool()
def find_activities_tool(
    destination: str, interests: list[str], max_results: int = 10
) -> str:
    """Find activities and attractions for a destination based on interests.

    Args:
        destination: Destination name.
        interests: List of interests to match.
        max_results: Maximum number of activities to return.

    Returns:
        JSON with matching activities.
    """
    dest_key = _resolve_key(destination)
    activities = filter_activities(dest_key, interests, limit=max_results)

    if not activities:
        return json.dumps(
            {
                "activities": [],
                "message": f"No activities found for '{destination}'. Try one of our featured destinations.",
                "dataSource": "sample",
            }
        )

    clean = []
    for a in activities:
        clean.append(
            {
                "name": a["name"],
                "description": a["description"],
                "location": a.get("location", destination),
                "duration": a.get("duration", "1-2 hours"),
                "estimatedCost": a.get("estimatedCost", 0),
                "category": a.get("category", "sightseeing"),
            }
        )

    return json.dumps(
        {"activities": clean, "destination": destination, "dataSource": "sample"}
    )


@mcp.tool()
def build_itinerary(
    destination: str,
    start_date: str,
    end_date: str,
    travelers: int = 2,
    interests: list[str] | None = None,
    budget: float = 0,
    currency: str = "USD",
    accommodation: str = "hotel",
    transportation: str = "mixed",
    travel_style: str = "moderate",
) -> str:
    """Build a complete day-by-day trip itinerary.

    Args:
        destination: Destination name.
        start_date: Start date in YYYY-MM-DD format.
        end_date: End date in YYYY-MM-DD format.
        travelers: Number of travelers.
        interests: List of travel interests.
        budget: Total budget amount.
        currency: Currency code.
        accommodation: Accommodation preference.
        transportation: Transportation preference.
        travel_style: Travel style.

    Returns:
        JSON with complete itinerary including days, activities, and budget.
    """
    request_data = {
        "destination": destination,
        "startDate": start_date,
        "endDate": end_date,
        "travelers": travelers,
        "interests": interests or [],
        "budget": str(budget),
        "currency": currency,
        "accommodation": accommodation,
        "transportation": transportation,
        "travelStyle": travel_style,
    }

    trip = generate_trip(request_data)
    return json.dumps(trip)


def _resolve_key(destination: str) -> str:
    d = destination.lower().strip()
    mapping = {
        "kyoto": "kyoto",
        "japan": "kyoto",
        "bali": "bali",
        "indonesia": "bali",
        "paris": "paris",
        "france": "paris",
        "london": "london",
        "marrakech": "marrakech",
        "morocco": "marrakech",
        "amalfi": "amalfi",
        "italy": "amalfi",
    }
    for keyword, key in mapping.items():
        if keyword in d:
            return key
    return ""


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=8001)
    args = parser.parse_args()

    mcp.run(transport="streamable-http", host=args.host, port=args.port)
