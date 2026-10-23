import { Briefcase } from 'lucide-react';
import '../../styles/common.css';

function EmptyState({
  title = 'No trips yet',
  message = "You haven't created any trips. Start planning your next adventure!",
  actionLabel = 'Create Your First Trip',
  onAction,
  icon: Icon = Briefcase,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={36} />
      </div>
      <h2>{title}</h2>
      <p className="empty-state-text">{message}</p>
      {onAction && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
