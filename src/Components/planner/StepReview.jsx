import { ChevronLeft, Sparkles, Pencil, MapPin, Calendar, Users, DollarSign, Compass, Home, Car, Heart } from 'lucide-react';

function StepReview({ formData, onGenerate, onBack, onEditStep, isGenerating }) {
  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const days = formData.startDate && formData.endDate
    ? Math.max(1, Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / 86400000) + 1)
    : 0;

  return (
    <div className="step-form">
      <div className="review-card">
        <div className="review-section">
          <div className="review-section__header">
            <h3>Trip Details</h3>
            <button type="button" className="review-edit" onClick={() => onEditStep(1)}>
              <Pencil size={14} /> Edit
            </button>
          </div>
          <div className="review-grid">
            <div className="review-item">
              <MapPin size={16} className="review-item__icon" />
              <div>
                <span className="review-item__label">Destination</span>
                <span className="review-item__value">{formData.destination || '—'}</span>
              </div>
            </div>
            {formData.departureCity && (
              <div className="review-item">
                <MapPin size={16} className="review-item__icon" />
                <div>
                  <span className="review-item__label">Departure</span>
                  <span className="review-item__value">{formData.departureCity}</span>
                </div>
              </div>
            )}
            <div className="review-item">
              <Calendar size={16} className="review-item__icon" />
              <div>
                <span className="review-item__label">Dates</span>
                <span className="review-item__value">
                  {formatDate(formData.startDate)} — {formatDate(formData.endDate)}
                  {days > 0 && ` (${days} day${days !== 1 ? 's' : ''})`}
                </span>
              </div>
            </div>
            <div className="review-item">
              <Users size={16} className="review-item__icon" />
              <div>
                <span className="review-item__label">Travelers</span>
                <span className="review-item__value">{formData.travelers || 2} people</span>
              </div>
            </div>
            <div className="review-item">
              <DollarSign size={16} className="review-item__icon" />
              <div>
                <span className="review-item__label">Budget</span>
                <span className="review-item__value">
                  {formData.budget ? `${formData.budget} ${formData.currency || 'USD'}` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="review-divider" />

        <div className="review-section">
          <div className="review-section__header">
            <h3>Preferences</h3>
            <button type="button" className="review-edit" onClick={() => onEditStep(2)}>
              <Pencil size={14} /> Edit
            </button>
          </div>
          <div className="review-grid">
            <div className="review-item">
              <Compass size={16} className="review-item__icon" />
              <div>
                <span className="review-item__label">Travel Style</span>
                <span className="review-item__value" style={{ textTransform: 'capitalize' }}>
                  {formData.travelStyle || 'moderate'}
                </span>
              </div>
            </div>
            <div className="review-item">
              <Home size={16} className="review-item__icon" />
              <div>
                <span className="review-item__label">Accommodation</span>
                <span className="review-item__value" style={{ textTransform: 'capitalize' }}>
                  {formData.accommodation || 'hotel'}
                </span>
              </div>
            </div>
            <div className="review-item">
              <Car size={16} className="review-item__icon" />
              <div>
                <span className="review-item__label">Transportation</span>
                <span className="review-item__value" style={{ textTransform: 'capitalize' }}>
                  {formData.transportation || 'mixed'}
                </span>
              </div>
            </div>
          </div>

          {(formData.interests || []).length > 0 && (
            <div className="review-item" style={{ marginTop: 12 }}>
              <Heart size={16} className="review-item__icon" />
              <div>
                <span className="review-item__label">Interests</span>
                <div className="review-badges">
                  {formData.interests.map(i => (
                    <span key={i} className="badge badge-info" style={{ textTransform: 'capitalize' }}>{i}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="step-actions step-actions--col">
        <button
          type="button"
          className="btn btn-primary btn-lg generate-btn"
          onClick={onGenerate}
          disabled={isGenerating}
        >
          <Sparkles size={18} />
          {isGenerating ? 'Generating...' : 'Generate Itinerary'}
        </button>
        <p className="generate-note">AI will create a personalized itinerary based on your preferences</p>
        <button type="button" className="btn btn-secondary" onClick={onBack} style={{ alignSelf: 'flex-start' }}>
          <ChevronLeft size={16} /> Back
        </button>
      </div>
    </div>
  );
}

export default StepReview;
