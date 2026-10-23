import { useState } from 'react';
import { Send } from 'lucide-react';
import '../../styles/chat.css';

function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-bar" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={1}
        disabled={disabled}
        aria-label="Message"
      />
      <button
        type="submit"
        className="chat-send-btn"
        disabled={disabled || !text.trim()}
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

export default ChatInput;
