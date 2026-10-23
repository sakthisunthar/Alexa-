import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { sampleMessages } from '../../data/sampleChat';
import '../../styles/chat.css';

function ChatInterface({ messages: propMessages, onSendMessage, isConnected }) {
  const [localMessages, setLocalMessages] = useState(sampleMessages);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef(null);

  const messages = propMessages || localMessages;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    if (onSendMessage) {
      onSendMessage(text);
      return;
    }

    setLocalMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        role: 'assistant',
        content:
          'This is a demo preview. Connect the backend API to get AI-powered travel planning responses.',
        timestamp: new Date().toISOString(),
      };
      setLocalMessages((prev) => [...prev, reply]);
      setIsSending(false);
    }, 1000);
  };

  return (
    <div className="chat-main">
      <div className="chat-main-header">
        <h2>AI Travel Assistant</h2>
        <p>Ask anything about your trip, get recommendations, or modify your itinerary.</p>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isSending && (
          <div className="chat-msg chat-msg-assistant">
            <div className="chat-avatar">T</div>
            <div className="chat-bubble">Thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isSending} />
    </div>
  );
}

export default ChatInterface;
