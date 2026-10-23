import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react';
import '../../styles/common.css';

const typeIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

function Toast({ message, type = 'success', onClose, visible }) {
  const [exiting, setExiting] = useState(false);
  const Icon = typeIcons[type] || CheckCircle;

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onClose?.(), 250);
    }, 5000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onClose?.(), 250);
  };

  return (
    <div className="toast-container">
      <div className={`toast ${type}${exiting ? ' exiting' : ''}`}>
        <span className="toast-icon">
          <Icon size={16} />
        </span>
        <span className="toast-text">{message}</span>
        <button className="toast-close" onClick={handleClose} aria-label="Close">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
