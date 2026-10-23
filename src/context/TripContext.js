import { createContext, useContext, useReducer, useCallback } from 'react';

const TripContext = createContext(null);

const initialState = {
  tripRequest: {
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: '',
    currency: 'USD',
    travelStyle: 'moderate',
    interests: [],
    accommodation: 'hotel',
    transportation: 'mixed',
  },
  currentTrip: null,
  messages: [],
  toolActivity: [],
  isGenerating: false,
  isChatting: false,
  error: null,
  activeView: 'form',
};

function tripReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        tripRequest: { ...state.tripRequest, [action.field]: action.value },
      };
    case 'TOGGLE_INTEREST': {
      const has = state.tripRequest.interests.includes(action.interest);
      return {
        ...state,
        tripRequest: {
          ...state.tripRequest,
          interests: has
            ? state.tripRequest.interests.filter((i) => i !== action.interest)
            : [...state.tripRequest.interests, action.interest],
        },
      };
    }
    case 'GENERATE_START':
      return { ...state, isGenerating: true, error: null };
    case 'GENERATE_SUCCESS':
      return {
        ...state,
        isGenerating: false,
        currentTrip: action.trip,
        activeView: 'itinerary',
        error: null,
      };
    case 'GENERATE_ERROR':
      return { ...state, isGenerating: false, error: action.error };
    case 'CHAT_START':
      return { ...state, isChatting: true };
    case 'CHAT_SUCCESS':
      return { ...state, isChatting: false };
    case 'CHAT_ERROR':
      return { ...state, isChatting: false, error: action.error };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message] };
    case 'ADD_TOOL_ACTIVITY':
      return {
        ...state,
        toolActivity: [...state.toolActivity, action.activity],
      };
    case 'UPDATE_TOOL_ACTIVITY':
      return {
        ...state,
        toolActivity: state.toolActivity.map((t) =>
          t.id === action.id ? { ...t, ...action.updates } : t
        ),
      };
    case 'SET_TRIP':
      return { ...state, currentTrip: action.trip };
    case 'SET_VIEW':
      return { ...state, activeView: action.view };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'RESET':
      return {
        ...initialState,
        messages: state.messages,
        toolActivity: state.toolActivity,
      };
    default:
      return state;
  }
}

export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, initialState);
  const setField = useCallback(
    (field, value) => dispatch({ type: 'SET_FIELD', field, value }),
    []
  );
  const toggleInterest = useCallback(
    (interest) => dispatch({ type: 'TOGGLE_INTEREST', interest }),
    []
  );
  return (
    <TripContext.Provider value={{ state, dispatch, setField, toggleInterest }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used within TripProvider');
  return ctx;
}
