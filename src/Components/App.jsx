import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import PlannerPage from '../pages/PlannerPage';
import ChatPage from '../pages/ChatPage';
import ItineraryPage from '../pages/ItineraryPage';
import ToolsPage from '../pages/ToolsPage';
import MyTripsPage from '../pages/MyTripsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plan" element={<PlannerPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/my-trips" element={<MyTripsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
