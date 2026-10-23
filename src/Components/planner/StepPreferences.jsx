import { ChevronLeft, ChevronRight } from 'lucide-react';
import { travelStyles, accommodationTypes, transportTypes, interestOptions } from '../../data/destinations';

function StepPreferences({ formData, setFormData, onNext, onBack }) {
  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const toggleInterest = (interest) => {
    const val = interest.toLowerCase();
    const current = formData.interests || [];
    const next = current.includes(val)
      ? current.filter(i => i !== val)
      : [...current, val];
    set('interests', next);
  };

  return (
    <div className="step-form">
      <div className="step-section">
        <h3 className="step-section__title">Travel Style</h3>
        <p className="step-section__desc">How do you like to travel?</p>
        <div className="pref-cards pref-cards--row">
          {travelStyles.map(s => (
            <button
              key={s.id}
              type="button"
              className={`pref-card ${formData.travelStyle === s.id ? 'pref-card--selected' : ''}`}
              onClick={() => set('travelStyle', s.id)}
            >
              <span className="pref-card__icon">{s.icon}</span>
              <span className="pref-card__label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="step-section">
        <h3 className="step-section__title">Accommodation</h3>
        <p className="step-section__desc">Where would you prefer to stay?</p>
        <div className="pref-cards pref-cards--row pref-cards--wrap">
          {accommodationTypes.map(a => (
            <button
              key={a.id}
              type="button"
              className={`pref-card pref-card--sm ${formData.accommodation === a.id ? 'pref-card--selected' : ''}`}
              onClick={() => set('accommodation', a.id)}
            >
              <span className="pref-card__label">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="step-section">
        <h3 className="step-section__title">Transportation</h3>
        <p className="step-section__desc">How do you prefer to get around?</p>
        <div className="pref-cards pref-cards--row">
          {transportTypes.map(t => (
            <button
              key={t.id}
              type="button"
              className={`pref-card pref-card--sm ${formData.transportation === t.id ? 'pref-card--selected' : ''}`}
              onClick={() => set('transportation', t.id)}
            >
              <span className="pref-card__label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="step-section">
        <h3 className="step-section__title">Interests</h3>
        <p className="step-section__desc">Select what excites you (choose as many as you like)</p>
        <div className="interest-chips">
          {interestOptions.map(interest => {
            const val = interest.toLowerCase();
            const active = (formData.interests || []).includes(val);
            return (
              <button
                key={interest}
                type="button"
                className={`interest-chip ${active ? 'interest-chip--active' : ''}`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="step-actions">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          <ChevronLeft size={16} /> Back
        </button>
        <button type="button" className="btn btn-primary" onClick={onNext}>
          Next: Review <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default StepPreferences;
