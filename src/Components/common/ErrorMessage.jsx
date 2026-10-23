import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/common.css';

function ErrorMessage({
  message = "We couldn't load your trip details. Please try again or contact support if the problem persists.",
  onRetry,
  onGoHome,
}) {
  const navigate = useNavigate();

  const handleHome = () => {
    if (onGoHome) onGoHome();
    else navigate('/');
  };

  return (
    <div className="error-state">
      <div className="error-icon">
        <AlertCircle size={36} />
      </div>
      <h2>Something went wrong</h2>
      <p className="error-message-text">{message}</p>
      <div className="error-actions">
        {onRetry && (
          <button className="error-retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
        <button className="error-home-btn" onClick={handleHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
