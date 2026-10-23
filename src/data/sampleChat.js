export const sampleMessages = [
  {
    id: 1,
    role: 'user',
    content: 'Plan a 5 day trip to Bali for 2 people with a budget of $1500. We love nature, beaches and good food.',
    timestamp: '2025-08-14T10:24:00Z',
  },
  {
    id: 2,
    role: 'assistant',
    content: "Great! I'll help you plan a 5-day trip to Bali for 2 people with a budget of $1500. I'll create a personalized itinerary based on your interests in nature, beaches and food. Let me gather some information using our travel tools...",
    timestamp: '2025-08-14T10:24:30Z',
    toolActivity: [
      { tool: 'search_destinations', status: 'success' },
      { tool: 'get_destination_info', status: 'success' },
      { tool: 'find_activities', status: 'success' },
      { tool: 'calculate_trip_budget', status: 'success' },
      { tool: 'build_itinerary', status: 'success' },
    ],
  },
  {
    id: 3,
    role: 'assistant',
    content: "Here's your personalized 5-day Bali itinerary! 🌴\n\nI've included beautiful beaches, nature experiences, great food spots, and a detailed budget breakdown. You can view the full itinerary below.",
    timestamp: '2025-08-14T10:27:00Z',
    hasItinerary: true,
  },
];

export const suggestedPrompts = [
  'Create a 7-day trip to Japan',
  'Find budget-friendly destinations',
  'Best time to visit Europe',
  'Show me beach destinations',
];

export const quickActions = [
  { label: 'View My Trips', icon: 'map' },
  { label: 'Check Budget', icon: 'calculator' },
];
