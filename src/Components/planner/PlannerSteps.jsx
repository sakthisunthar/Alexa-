import { Check } from 'lucide-react';

const defaultSteps = [
  { number: 1, label: 'Basic Details' },
  { number: 2, label: 'Preferences' },
  { number: 3, label: 'Review' },
];

function PlannerSteps({ currentStep = 1, steps = defaultSteps }) {
  return (
    <div className="planner-steps">
      {steps.map((step, i) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        const isFuture = currentStep < step.number;

        return (
          <div key={step.number} className="planner-steps__item">
            {i > 0 && (
              <div
                className={`planner-steps__line ${isCompleted || isActive ? 'planner-steps__line--done' : ''}`}
              />
            )}
            <div
              className={`planner-steps__circle ${
                isCompleted
                  ? 'planner-steps__circle--completed'
                  : isActive
                  ? 'planner-steps__circle--active'
                  : 'planner-steps__circle--future'
              }`}
            >
              {isCompleted ? <Check size={14} strokeWidth={3} /> : step.number}
            </div>
            <span
              className={`planner-steps__label ${
                isFuture ? 'planner-steps__label--muted' : ''
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default PlannerSteps;
