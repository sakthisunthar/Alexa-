import { Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/chat.css';

function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className={`chat-msg ${isUser ? 'chat-msg--user' : 'chat-msg--assistant'}`}>
      {!isUser && (
        <div className="chat-avatar">
          <span>T</span>
        </div>
      )}
      <div className="chat-msg-body">
        <div className="chat-bubble">
          <p className="chat-bubble-text">{message.content}</p>
        </div>

        {message.toolActivity && message.toolActivity.length > 0 && (
          <div className="chat-tool-activity">
            <span className="chat-tool-label">Using MCP tools...</span>
            <ul className="chat-tool-list">
              {message.toolActivity.map((t, i) => (
                <li key={i} className="chat-tool-item">
                  <Check size={14} className="chat-tool-check" />
                  <span className="chat-tool-name">{t.tool}</span>
                  <span className="badge badge-success">Completed</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {message.hasItinerary && (
          <Link to="/itinerary/sample" className="chat-itinerary-link">
            View Full Itinerary <ChevronRight size={16} />
          </Link>
        )}

        {time && <time className="chat-time">{time}</time>}
      </div>
    </div>
  );
}

export default ChatMessage;
