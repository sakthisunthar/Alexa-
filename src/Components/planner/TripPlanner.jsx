import { useState } from 'react';
import PlannerSteps from './PlannerSteps';
import StepBasicDetails from './StepBasicDetails';
import StepPreferences from './StepPreferences';
import StepReview from './StepReview';
import '../../styles/planner.css';

function TripPlanner({ onGenerate, initialDestination }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    destination: initialDestination || '',
    departureCity: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: '',
    currency: 'USD',
    travelStyle: 'moderate',
    accommodation: 'hotel',
    transportation: 'mixed',
    interests: [],
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      if (onGenerate) await onGenerate(formData);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepBasicDetails
            formData={formData}
            setFormData={setFormData}
            onNext={() => setCurrentStep(2)}
            onBack={() => window.history.back()}
          />
        );
      case 2:
        return (
          <StepPreferences
            formData={formData}
            setFormData={setFormData}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <StepReview
            formData={formData}
            onGenerate={handleGenerate}
            onBack={() => setCurrentStep(2)}
            onEditStep={(step) => setCurrentStep(step)}
            isGenerating={isGenerating}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="planner-layout">
      <div className="planner-form-panel">
        <div className="planner-form-header">
          <h2>Plan Your Dream Trip</h2>
          <p>Tell us about your travel preferences and let AI create the perfect itinerary for you.</p>
        </div>
        <PlannerSteps currentStep={currentStep} />
        {renderStep()}
      </div>
      <div className="planner-side-panel">
        <div className="planner-side-overlay" />
        <div className="planner-side-content">
          <h2>Better Plans<br />Bigger Adventures</h2>
          <blockquote>
            &ldquo;The world is a book and those who do not travel read only one page.&rdquo;
            <cite>— Saint Augustine</cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;
