import { Globe, CheckCircle } from 'lucide-react';
import '../../styles/common.css';

const defaultSteps = [
  { label: 'Searching destinations', status: 'pending' },
  { label: 'Getting destination info', status: 'pending' },
  { label: 'Calculating budget', status: 'pending' },
  { label: 'Building itinerary', status: 'pending' },
];

function LoadingState({
  title = 'Creating Your Perfect Itinerary...',
  subtitle = 'Our AI is gathering information, checking destinations, calculating your budget and building a personalized travel plan for you.',
  steps = defaultSteps,
  progress = 0,
}) {
  return (
    <div className="loading-state">
      <div className="loading-icon">
        <Globe size={36} />
      </div>
      <h2>{title}</h2>
      <p className="loading-subtitle">{subtitle}</p>

      <div className="loading-steps">
        {steps.map((step, i) => (
          <div key={i} className={`loading-step ${step.status}`}>
            <span className="loading-step-icon">
              {step.status === 'completed' && <CheckCircle size={18} />}
              {step.status === 'active' && <div className="loading-spinner" />}
              {step.status === 'pending' && (
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: '2px solid var(--border)',
                }} />
              )}
            </span>
            {step.label}
          </div>
        ))}
      </div>

      <div className="loading-progress">
        <div
          className="loading-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default LoadingState;
