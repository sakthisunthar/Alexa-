# TripGenie AI

AI-powered travel planning assistant that generates personalized day-by-day itineraries, budget breakdowns, and conversational trip refinement.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React SPA     │────▶│   FastAPI        │────▶│   MCP Server    │
│   :3000         │     │   :8000          │     │   :8001          │
│                 │     │                  │     │                  │
│ Trip planner    │     │ /api/trips/*     │     │ search_dest…     │
│ Chat interface  │     │ /api/chat        │     │ get_dest_info    │
│ Itinerary view  │     │ /api/health      │     │ calc_budget      │
│ Budget summary  │     │                  │     │ find_activities   │
│ Tool activity   │     │ AI service       │     │ build_itinerary  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Frontend** — React 19 + React Router v6, Context/useReducer state management, CSS custom properties design system.

**Backend** — FastAPI with Pydantic v2 models. Dual-mode AI: full Claude integration when an API key is configured, sample-data fallback when it isn't.

**MCP Server** — Model Context Protocol server (SDK v2, Streamable HTTP transport) exposing 5 travel-planning tools that Claude can invoke during conversations.

## Quick Start (Windows PowerShell)

### 1. Install dependencies

```powershell
# Frontend
npm install

# Backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
```

### 2. Configure environment

```powershell
Copy-Item backend\.env.example backend\.env
# Edit backend\.env to add your ANTHROPIC_API_KEY (optional — app works without it in sample-data mode)
```

### 3. Start all three servers

Open three terminal windows:

```powershell
# Terminal 1 — Frontend
npm start
# → http://localhost:3000

# Terminal 2 — Backend API
.\venv\Scripts\Activate.ps1
python -m backend.main
# → http://localhost:8000

# Terminal 3 — MCP Server
.\venv\Scripts\Activate.ps1
python -m backend.mcp_server
# → http://localhost:8001
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_URL` | `http://localhost:8000` | Backend URL (frontend) |
| `API_HOST` | `0.0.0.0` | Backend bind address |
| `API_PORT` | `8000` | Backend port |
| `ANTHROPIC_API_KEY` | *(empty)* | Claude API key; leave empty for sample-data mode |
| `AI_MODEL` | `claude-sonnet-4-20250514` | Claude model to use |
| `MCP_SERVER_URL` | `http://localhost:8001/mcp` | MCP server endpoint |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated allowed origins |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check (status, version, AI config) |
| `POST` | `/api/trips/generate` | Generate itinerary from trip request |
| `GET` | `/api/trips/{id}` | Retrieve a generated trip |
| `POST` | `/api/trips/{id}/modify` | Modify an existing trip |
| `GET` | `/api/trips/{id}/tools` | Get tool activity for a trip |
| `POST` | `/api/chat` | Send a chat message |

## MCP Tools

The MCP server exposes these tools via Streamable HTTP transport:

| Tool | Description |
|---|---|
| `search_destinations` | Find destinations by interests and region |
| `get_destination_info` | Get detailed info for a specific destination |
| `calculate_trip_budget` | Compute budget breakdown by category |
| `find_activities_tool` | Discover activities matching interests |
| `build_itinerary` | Generate a complete day-by-day itinerary |

### Verify MCP server

```powershell
# List available tools
curl http://localhost:8001/mcp -H "Content-Type: application/json" `
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}'
```

## Sample Data

When no `ANTHROPIC_API_KEY` is configured, the app runs in **sample-data mode**:

- Trip generation uses curated destination data for 6 cities: Kyoto, Bali, Paris, London, Marrakech, Amalfi Coast
- Chat returns helpful responses labeled as sample-data mode
- Budget calculations use estimated pricing tiers
- All sample-data responses include `"dataSource": "sample"` and the UI shows a notice

This is intentional — the app is fully functional for demonstration without an API key.

## Running Tests

```powershell
# Frontend
npm test

# Backend
.\venv\Scripts\Activate.ps1
python -m pytest backend\tests\ -v
```

## Project Structure

```
tripgenie/
├── src/                        # React frontend
│   ├── Components/
│   │   ├── App.jsx             # Root with router
│   │   ├── Header.jsx          # Navigation
│   │   ├── HeroSection.jsx     # Landing page hero
│   │   ├── chat/               # Chat interface components
│   │   ├── common/             # LoadingState, ErrorMessage, EmptyState
│   │   ├── itinerary/          # Itinerary, DaySchedule, ActivityCard, BudgetSummary
│   │   ├── layout/             # Footer
│   │   ├── planner/            # TripPlanner form
│   │   └── tools/              # ToolActivityPanel
│   ├── context/TripContext.js   # State management
│   ├── pages/                   # LandingPage, PlannerPage
│   ├── services/api.js          # API client
│   └── styles/                  # CSS modules
├── backend/
│   ├── config.py                # Settings from env
│   ├── main.py                  # FastAPI app
│   ├── mcp_server.py            # MCP server (Streamable HTTP)
│   ├── models/                  # Pydantic request/response models
│   ├── routes/                  # API route handlers
│   ├── services/                # AI, trip generation, budget calculation
│   ├── data/                    # Sample destination & activity data
│   └── tests/                   # pytest test suite
└── package.json
```
