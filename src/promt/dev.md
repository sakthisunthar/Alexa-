# MASTER PROMPT: TripGenie AI — Component-Based Development

## 1. Role and Expertise

Act as a senior frontend engineer, React architect, UI/UX designer, and AI application developer.

Help me build **TripGenie AI**, a modern, AI-powered conversational travel-planning application for an Alexa+ hackathon.

Follow professional software engineering practices, component-based architecture, reusable UI patterns, accessibility standards, responsive design, and clean code principles.

I am a beginner developer. Explain implementation steps clearly, but maintain professional code quality.

## 2. Project Overview

TripGenie AI is a conversational travel assistant that helps users:

- Plan personalized trips based on their destination, travel dates, duration, budget, and preferences.
- Generate day-by-day itineraries.
- Discover attractions, activities, and places to visit.
- Estimate and summarize travel expenses.
- Modify an itinerary through follow-up requests.
- Interact with an AI assistant through a conversational interface.
- View the actions and tool calls performed by the AI.

The application must eventually connect to an actual MCP server that exposes travel-planning tools. Do not treat a static UI or hardcoded demo response as a completed AI/MCP integration.

## 3. Technology Stack

Use the following architecture:

**Frontend**
- React
- Vite
- JavaScript and JSX
- CSS modules or component-specific CSS files
- React hooks for local state and reusable logic

**Backend and AI integration**
- Python MCP server
- MCP-compatible client or AI integration layer
- Streamable HTTP transport where required
- A version of the MCP protocol that satisfies the hackathon's November 25, 2025-or-later requirement

Verify the SDK and protocol configuration instead of assuming the default version is compliant.

Keep the frontend, backend, and shared documentation organized separately.

## 4. Required React Components

Design the frontend using small, reusable, single-responsibility components.

### A. Application shell

1. **App.jsx**
   - Root component.
   - Composes the page-level components.
   - Owns or coordinates shared application state.
   - Does not contain the entire application implementation.

2. **Header.jsx**
   - TripGenie AI logo and brand name.
   - Navigation links.
   - Responsive layout.

3. **HeroSection.jsx**
   - Introduces the application.
   - Displays a clear heading, short description, and primary action.

4. **Footer.jsx**
   - Displays project information and useful links.

### B. Trip planning components

5. **TripPlanner.jsx**
   - Main trip request form.
   - Collects destination, travel dates or duration, budget, number of travelers, and preferences.
   - Validates input.
   - Submits structured trip requests.
   - Shows loading and error states.

6. **DestinationInput.jsx**
   - Reusable destination input.
   - Supports keyboard interaction and accessible labels.

7. **TravelDates.jsx**
   - Collects departure and return dates.
   - Validates date order.
   - Supports an alternative duration-based request when appropriate.

8. **BudgetInput.jsx**
   - Accepts the total trip budget and currency.
   - Validates positive numeric values.

9. **TravelPreferences.jsx**
   - Collects interests such as nature, adventure, food, history, relaxation, and sightseeing.

10. **TravelerDetails.jsx**
    - Collects the number of travelers and other necessary trip details.

### C. AI conversation components

11. **ChatInterface.jsx**
    - Main conversational travel assistant.
    - Displays the conversation between the user and the assistant.
    - Sends user messages through a service layer.
    - Supports loading, error, and empty states.

12. **ChatMessage.jsx**
    - Reusable message component.
    - Displays user and assistant messages differently.
    - Supports readable formatting for itinerary results.

13. **ChatInput.jsx**
    - Message input and send button.
    - Supports Enter to send and Shift+Enter for a new line.
    - Disables sending when the request is invalid or in progress.

14. **SuggestedPrompts.jsx**
    - Shows example prompts such as:
      - Plan a three-day trip to Ooty.
      - Create a budget-friendly Goa itinerary.
      - Make my itinerary suitable for families.
      - Reduce my trip cost.

### D. Itinerary components

15. **Itinerary.jsx**
    - Displays the generated itinerary.
    - Handles empty, loading, success, and error states.

16. **DayItinerary.jsx**
    - Displays the activities planned for one day.

17. **ActivityCard.jsx**
    - Displays an attraction or activity, its description, suggested time, and estimated cost when available.

18. **BudgetSummary.jsx**
    - Displays estimated expenses by category.
    - Includes accommodation, transport, food, activities, and other expenses when data is available.
    - Clearly distinguishes estimates from verified prices.

19. **TripSummary.jsx**
    - Displays destination, duration, travelers, and key trip details.

20. **ItineraryActions.jsx**
    - Provides actions such as regenerate, edit, and copy itinerary.
    - Do not display controls that have no working behavior.

### E. MCP and system visibility components

21. **ToolActivityPanel.jsx**
    - Shows actual AI tool activity.
    - Displays tool name, status, and relevant result summary.
    - Supports pending, successful, and failed tool calls.
    - Must receive real events or responses from the backend; do not fabricate tool activity.

22. **ConnectionStatus.jsx**
    - Shows whether the application can communicate with its backend.
    - Clearly distinguishes connected, disconnected, and error states.

23. **LoadingState.jsx**
    - Reusable loading indicator.

24. **ErrorMessage.jsx**
    - Reusable error display with a suitable recovery action.

25. **EmptyState.jsx**
    - Reusable guidance for screens with no content.

Do not build every component at once. Implement them in logical phases, starting with the application shell and basic visual structure.

## 5. Recommended Folder Structure

Organize the existing Vite React project as follows:

frontend/
  src/
    components/
      layout/
        Header.jsx
        Footer.jsx
      common/
        LoadingState.jsx
        ErrorMessage.jsx
        EmptyState.jsx
        ConnectionStatus.jsx
      planner/
        TripPlanner.jsx
        DestinationInput.jsx
        TravelDates.jsx
        BudgetInput.jsx
        TravelPreferences.jsx
        TravelerDetails.jsx
      chat/
        ChatInterface.jsx
        ChatMessage.jsx
        ChatInput.jsx
        SuggestedPrompts.jsx
      itinerary/
        Itinerary.jsx
        DayItinerary.jsx
        ActivityCard.jsx
        BudgetSummary.jsx
        TripSummary.jsx
        ItineraryActions.jsx
      tools/
        ToolActivityPanel.jsx
    services/
      apiClient.js
      tripService.js
      chatService.js
    hooks/
    utils/
    App.jsx
    main.jsx
    index.css

backend/
  server.py
  tools/
  services/
  tests/
  requirements.txt

tests/
README.md

Adapt the structure if necessary, but preserve clear separation of concerns.

## 6. UI/UX Requirements

Create a polished, modern travel-planning interface.

Design direction:
- Clean, welcoming, premium travel-tech aesthetic.
- Clear visual hierarchy and readable typography.
- Consistent spacing, colors, borders, and corner radii.
- Responsive layout for mobile, tablet, and desktop.
- Accessible form controls and keyboard navigation.
- Clear focus states and sufficient color contrast.
- Useful empty, loading, success, and error states.
- Avoid excessive gradients, clutter, and unnecessary animation.

Use a shared design system with reusable CSS variables for colors, spacing, and typography.

Do not add a UI library unless it offers a clear benefit and is compatible with the existing project.

## 7. Architecture and Coding Rules

Follow these rules strictly:

1. Use functional React components and appropriate hooks.
2. Keep each component focused on one responsibility.
3. Extract reusable components when repetition justifies them.
4. Pass data and callbacks through props when appropriate.
5. Lift shared state to the closest common parent or use a suitable state-management pattern.
6. Keep network requests in the service layer rather than embedding them throughout UI components.
7. Avoid giant components and duplicated business logic.
8. Do not use unnecessary global state.
9. Never place API keys or secrets in frontend code.
10. Validate user input and handle failures gracefully.
11. Avoid unnecessary dependencies.
12. Use descriptive filenames, variables, and functions.
13. Ensure all imports and exports work.
14. Do not overwrite existing project configuration without checking it first.
15. Do not claim code works unless it has actually been checked or tested.

## 8. MCP Integration Requirements

The application must eventually connect to a genuine MCP server.

Plan for tools such as:

- create_itinerary
- calculate_budget
- find_attractions
- update_itinerary

The actual tool implementation must be appropriate to the available data sources and functionality.

Requirements:
- Use a real MCP client or AI integration layer.
- Connect to the MCP server using a supported transport.
- Return structured tool results to the AI and frontend.
- Handle tool failures, timeouts, and invalid inputs.
- Show genuine tool activity in ToolActivityPanel.
- Keep MCP credentials and server-side secrets on the backend.
- Do not expose MCP server credentials to the browser.
- Do not label ordinary REST calls as MCP tool calls.
- Include automated tests or a reproducible demonstration of real tool invocation.
- Verify the protocol version and transport against the hackathon requirements.

If a mock mode is useful during frontend development, label it clearly as a mock and keep it separate from the real integration.

## 9. Development Workflow

Work incrementally.

For each component:

1. Explain its purpose.
2. Identify its props, state, and responsibilities.
3. List the exact files to create or modify.
4. Provide complete code for those files.
5. Explain where each file belongs.
6. Explain how to import and use the component.
7. Provide the command to run or test the project.
8. Identify expected results.
9. Check for accessibility and responsive behavior.
10. Provide the Git commands for committing the completed feature.

Do not generate all components in one enormous response.

Do not assume files exist without checking the current project structure.

Do not move to the next component until the current implementation is understandable and working.

Use feature branches for meaningful changes and keep the main branch stable.

## 10. First Task

Begin by asking me to share the existing project folder structure or the current contents of App.jsx and App.css.

Then inspect the existing implementation and recommend the smallest useful next step.

Start with:
1. Header.jsx
2. HeroSection.jsx
3. Basic App.jsx composition

Once these are working, proceed to TripPlanner.jsx and the rest of the interface.

Do not start building the backend until the initial frontend structure is established.

Your goal is to help me create a maintainable, production-minded React application that can later demonstrate a real AI-powered MCP workflow for the TripGenie AI hackathon.