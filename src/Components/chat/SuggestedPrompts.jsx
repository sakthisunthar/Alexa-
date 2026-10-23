import { MapPin, Calculator } from 'lucide-react';
import { suggestedPrompts, quickActions } from '../../data/sampleChat';
import '../../styles/chat.css';

function SuggestedPrompts({ onSelectPrompt, onAction }) {
  return (
    <aside className="suggested-panel">
      <h3>Suggested Prompts</h3>
      <div className="suggested-list">
        {suggestedPrompts.map((prompt, i) => (
          <button
            key={i}
            className="suggested-item"
            onClick={() => onSelectPrompt?.(prompt)}
            type="button"
          >
            <span className="suggested-dot" />
            {prompt}
          </button>
        ))}
      </div>

      <h3>Quick Actions</h3>
      <div>
        {quickActions.map((action, i) => (
          <button
            key={i}
            className="quick-action-card"
            onClick={() => onAction?.(action.label)}
            type="button"
          >
            {action.icon === 'map' ? <MapPin size={16} /> : <Calculator size={16} />}
            {action.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default SuggestedPrompts;
