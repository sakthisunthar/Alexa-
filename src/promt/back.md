# MASTER PROMPT — TripGenie AI

Act as a senior full-stack AI engineer, Python backend developer, React developer, and Model Context Protocol (MCP) specialist. Help me build a complete, working hackathon project called **TripGenie AI**.

I am a beginner, so write clean, modular code and explain important steps simply. Work directly with the files in my currently opened VS Code repository.

## 1. Project objective

Build an AI-powered travel planning application that helps users:
- Discover destinations based on their interests.
- Create personalized day-by-day itineraries.
- Plan trips based on dates, budget, and number of travelers.
- Estimate expenses for accommodation, food, transportation, and activities.
- Chat with an AI travel assistant.
- Modify their itinerary through follow-up chat messages.
- See which AI tools are being called and what results they return.

The project must have a functional frontend and backend. It must not be just a static UI or a simulated AI conversation.

## 2. Technology stack

Frontend:
- React with Vite.
- JavaScript and JSX.
- Component-based architecture.
- Responsive CSS.
- Fetch API for backend communication.

Backend:
- Python.
- FastAPI for REST endpoints.
- Pydantic for validation.
- An AI model connected through a configurable provider API.
- The official Python MCP SDK for actual MCP tools.
- SQLite for persistent trip storage if practical.

MCP requirements:
- Use a real MCP client/server interaction.
- Use Streamable HTTP transport.
- Support MCP protocol version `2025-11-25` or a compatible newer version, verified against the installed SDK and negotiated protocol.
- Do not merely create REST endpoints and call them MCP.
- Do not fake tool discovery or tool execution.
- The AI integration must discover and invoke tools exposed by the MCP server, then use their actual results to construct its response.

Check current official documentation and installed package versions before implementation.

## 3. Frontend requirements

Build a polished, modern, responsive travel application with:
- Header and navigation.
- Hero section.
- Trip planner form.
- Destination input.
- Travel dates.
- Budget input.
- Traveler details.
- Travel preferences.
- AI chat interface.
- Suggested prompts.
- Day-by-day itinerary.
- Activity cards.
- Budget summary.
- Trip summary.
- Itinerary actions.
- MCP tool activity panel.
- Loading states, errors, and empty states.
- Backend connection status.

Use reusable components rather than placing the entire application in one large file.

Suggested structure:

`frontend/src/components/layout/`
- Header.jsx
- HeroSection.jsx
- Footer.jsx

`frontend/src/components/planner/`
- TripPlanner.jsx
- DestinationInput.jsx
- TravelDates.jsx
- BudgetInput.jsx
- TravelPreferences.jsx
- TravelerDetails.jsx

`frontend/src/components/chat/`
- ChatInterface.jsx
- ChatMessage.jsx
- ChatInput.jsx
- SuggestedPrompts.jsx

`frontend/src/components/itinerary/`
- Itinerary.jsx
- DayItinerary.jsx
- ActivityCard.jsx
- BudgetSummary.jsx
- TripSummary.jsx
- ItineraryActions.jsx

`frontend/src/components/tools/`
- ToolActivityPanel.jsx

`frontend/src/components/common/`
- ConnectionStatus.jsx
- LoadingState.jsx
- ErrorMessage.jsx
- EmptyState.jsx

`frontend/src/services/`
- apiClient.js
- tripService.js
- chatService.js

Adjust this structure when necessary to fit the repository. Do not duplicate existing files or overwrite working code without checking first.

## 4. Backend requirements

Create a modular Python backend in `backend/`.

Suggested modules:
- `main.py` — FastAPI application and REST endpoints.
- `config.py` — environment configuration.
- `models/` — validated request and response schemas.
- `services/ai_service.py` — AI integration and tool-calling orchestration.
- `services/trip_service.py` — trip planning and itinerary logic.
- `services/budget_service.py` — expense calculations.
- `mcp_server.py` — MCP server and tool registration.
- `data/` — clearly labelled sample destinations and activities.
- `tests/` — automated tests.

Implement endpoints such as:
- `GET /api/health`
- `POST /api/trips/generate`
- `GET /api/trips/{trip_id}`
- `POST /api/chat`
- `POST /api/trips/{trip_id}/modify`

Choose appropriate request and response schemas. Handle invalid inputs, unavailable services, and unexpected errors gracefully.

## 5. MCP tools

Implement and test these real MCP tools:

1. `search_destinations`
   - Search destinations by interests, region, season, or activity type.
   - Return structured results.

2. `calculate_trip_budget`
   - Estimate costs based on destination, duration, travelers, and budget preferences.
   - Return a category breakdown and total.

3. `get_destination_info`
   - Return destination information, recommended activities, and practical travel notes.

4. `build_itinerary`
   - Build a day-by-day itinerary based on destination, dates, preferences, and budget.
   - Return structured itinerary data.

5. `find_activities`
   - Find relevant activities for the destination and user preferences.

Use real tool execution through the MCP protocol. Display tool names, arguments where safe, execution status, and actual returned results in the frontend's tool activity panel.

Use sample data honestly when live data providers are not configured. Never represent invented prices, weather, availability, or bookings as live verified information.

## 6. AI integration

Integrate a configurable AI provider using environment variables.

The AI should:
- Understand natural-language travel requests.
- Ask clarifying questions when essential information is missing.
- Decide when to call MCP tools.
- Execute tool calls through a real MCP client.
- Send tool results back to the model when needed.
- Generate an itinerary using the retrieved results.
- Answer follow-up questions.
- Modify an existing itinerary when requested.
- Return structured data for the React interface.

Implement the complete tool-calling loop, including multiple tool calls when appropriate, error handling, and a safe maximum iteration limit.

Never expose provider API keys in frontend code.

If API credentials are unavailable, provide a clearly labelled demo mode that still calls the actual MCP server and uses its returned results. Do not pretend the AI provider is connected when it is not.

## 7. Budget and trip data

Store trips and itineraries in SQLite if feasible.

Support:
- Trip destination.
- Start and end dates.
- Number of travelers.
- Total budget and currency.
- Travel preferences.
- Daily itinerary.
- Activity costs.
- Accommodation and transport estimates.
- Total estimated expenditure.
- Remaining budget.

Validate date ranges and numeric inputs. Label sample prices and estimates clearly. Do not claim that a trip has been booked.

## 8. UI and design

Create a premium, welcoming travel-planning interface:
- Clean layout and consistent spacing.
- Attractive travel-inspired visual design.
- Responsive desktop and mobile layouts.
- Readable typography and accessible controls.
- Useful empty, loading, success, and error states.
- Clear budget breakdowns.
- Easy navigation between the planner, chat, and itinerary.
- Visible evidence of actual MCP tool execution.

Keep the UI functional and avoid unnecessary animations or decorative features that delay the core implementation.

## 9. Security and reliability

- Use `.env` for local secrets.
- Provide `.env.example` without real credentials.
- Add `.gitignore` entries for secrets, virtual environments, dependencies, and generated files.
- Configure CORS for the local frontend.
- Validate all inputs.
- Do not expose secrets in logs.
- Add reasonable timeouts and error handling.
- Do not execute arbitrary user-provided code.
- Do not commit or push changes without my permission.

## 10. Testing and verification

Add tests for:
- Health endpoint.
- Trip request validation.
- Budget calculations.
- Itinerary generation.
- SQLite persistence if implemented.
- MCP server startup and tool discovery.
- Actual MCP tool invocation and returned results.
- AI tool-calling orchestration.
- Missing credentials and service failures.
- Frontend API integration.

Run the relevant tests and fix errors rather than claiming they passed without running them.

## 11. Documentation

Create a root README explaining:
- Project architecture.
- Prerequisites.
- Installation instructions.
- Environment variable setup.
- How to start the frontend.
- How to start the FastAPI backend.
- How to start the MCP server.
- How to configure the AI provider.
- How to run tests.
- How to demonstrate an actual MCP tool call.
- Which features use sample data versus live external services.

Provide exact commands for Windows PowerShell where possible.

## 12. Required development workflow

Follow these stages in order:

Stage 1: Inspect the repository, existing Git status, frontend setup, and current files. Explain what already exists and propose a plan. Do not overwrite anything.

Stage 2: Build and run the React application with the core reusable layout and planner components.

Stage 3: Build the FastAPI backend and verify the health endpoint.

Stage 4: Implement the budget calculator, sample destination data, and itinerary generator.

Stage 5: Implement the MCP server and verify tool discovery and execution through the actual MCP protocol.

Stage 6: Connect the AI provider and implement real MCP tool calling.

Stage 7: Connect React to the backend and display the resulting itinerary, budget, and tool activity.

Stage 8: Add storage, error handling, tests, and documentation.

Stage 9: Run the full application and verify the end-to-end demo.

After each stage:
1. List the files created or changed.
2. Explain what was implemented.
3. Run relevant checks and report the actual results.
4. Give me the exact commands to run.
5. Identify any remaining issues.
6. Wait for my approval before starting the next stage.

## Final acceptance criteria

The project is ready for demonstration only when:
- The React application runs.
- The Python API runs.
- The MCP server runs.
- The MCP client discovers and executes at least one actual MCP tool.
- The AI uses actual MCP tool results when provider credentials are configured.
- A user can submit trip details and receive a structured itinerary and budget.
- The UI shows real tool execution activity.
- Errors and missing configuration are handled honestly.
- Setup instructions and test results are documented.

**Start with Stage 1 only. Inspect my current repository and explain the implementation plan before modifying files.**