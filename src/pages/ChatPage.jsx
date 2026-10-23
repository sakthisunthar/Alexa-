import { useNavigate } from 'react-router-dom';
import Header from '../Components/layout/Header';
import Sidebar from '../Components/layout/Sidebar';
import ChatInterface from '../Components/chat/ChatInterface';
import SuggestedPrompts from '../Components/chat/SuggestedPrompts';
import '../styles/pages.css';

function ChatPage() {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action === 'View My Trips') navigate('/my-trips');
  };

  return (
    <>
      <Header />
      <div className="chat-page">
        <Sidebar activePage="chat" />
        <ChatInterface />
        <SuggestedPrompts onAction={handleAction} />
      </div>
    </>
  );
}

export default ChatPage;
