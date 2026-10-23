import { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { currencies } from '../../data/destinations';

function StepBasicDetails({ formData, setFormData, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const adjustTravelers = (delta) => {
    const next = Math.max(1, Math.min(20, (formData.travelers || 2) + delta));
    set('travelers', next);
  };

  const validate = () => {
    const errs = {};
    if (!formData.destination?.trim()) errs.destination = 'Destination is required';
    if (!formData.startDate) errs.startDate = 'Start date is required';
    if (!formData.endDate) errs.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      errs.endDate = 'End date must be after start date';
    }
    if (!formData.budget || Number(formData.budget) <= 0) errs.budget = 'Please enter a valid budget';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="step-form">
      <div className="step-section">
        <h3 className="step-section__title">Destination &amp; Dates</h3>

        <div className="form-group">
          <label className="form-label">Where would you like to go?</label>
          <div className="input-with-icon">
            <MapPin size={18} className="input-icon" />
            <input
              className={`input-field input-field--icon ${errors.destination ? 'error' : ''}`}
              type="text"
              placeholder="e.g. Bali, Japan, Italy..."
              value={formData.destination || ''}
              onChange={e => set('destination', e.target.value)}
            />
          </div>
          {errors.destination && <span className="field-error">{errors.destination}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Departure City (Optional)</label>
          <div className="input-with-icon">
            <MapPin size={18} className="input-icon" />
            <input
              className="input-field input-field--icon"
              type="text"
              placeholder="e.g. New York, London..."
              value={formData.departureCity || ''}
              onChange={e => set('departureCity', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <div className="input-with-icon">
              <Calendar size={18} className="input-icon" />
              <input
                className={`input-field input-field--icon ${errors.startDate ? 'error' : ''}`}
                type="date"
                value={formData.startDate || ''}
                onChange={e => set('startDate', e.target.value)}
              />
            </div>
            {errors.startDate && <span className="field-error">{errors.startDate}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <div className="input-with-icon">
              <Calendar size={18} className="input-icon" />
              <input
                className={`input-field input-field--icon ${errors.endDate ? 'error' : ''}`}
                type="date"
                min={formData.startDate || undefined}
                value={formData.endDate || ''}
                onChange={e => set('endDate', e.target.value)}
              />
            </div>
            {errors.endDate && <span className="field-error">{errors.endDate}</span>}
          </div>
        </div>
      </div>

      <div className="step-section">
        <h3 className="step-section__title">Travelers &amp; Budget</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Number of Travelers</label>
            <div className="traveler-counter">
              <button
                type="button"
                className="counter-btn"
                onClick={() => adjustTravelers(-1)}
                disabled={formData.travelers <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="counter-value">{formData.travelers || 2}</span>
              <button
                type="button"
                className="counter-btn"
                onClick={() => adjustTravelers(1)}
                disabled={formData.travelers >= 20}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group form-group--grow">
            <label className="form-label">Total Budget ({formData.currency || 'USD'})</label>
            <div className="input-with-icon">
              <DollarSign size={18} className="input-icon" />
              <input
                className={`input-field input-field--icon ${errors.budget ? 'error' : ''}`}
                type="number"
                min="0"
                placeholder="e.g. 2000"
                value={formData.budget || ''}
                onChange={e => set('budget', e.target.value)}
              />
            </div>
            {errors.budget && <span className="field-error">{errors.budget}</span>}
          </div>
          <div className="form-group" style={{ maxWidth: 140 }}>
            <label className="form-label">Currency</label>
            <select
              className="input-field"
              value={formData.currency || 'USD'}
              onChange={e => set('currency', e.target.value)}
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          <ChevronLeft size={16} /> Back
        </button>
        <button type="button" className="btn btn-primary" onClick={handleNext}>
          Next: Preferences <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default StepBasicDetails;
