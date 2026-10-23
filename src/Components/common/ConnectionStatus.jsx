import { CheckCircle, XCircle, Loader } from 'lucide-react';
import '../../styles/common.css';

const labels = {
  connected: 'API Connected',
  disconnected: 'Disconnected',
  connecting: 'Connecting...',
};

const icons = {
  connected: CheckCircle,
  disconnected: XCircle,
  connecting: Loader,
};

function ConnectionStatus({ status = 'connected' }) {
  const Icon = icons[status] || CheckCircle;

  return (
    <div className={`connection-status ${status}`}>
      <span className="connection-dot" />
      <span>{labels[status]}</span>
      <Icon size={16} />
    </div>
  );
}

export default ConnectionStatus;
