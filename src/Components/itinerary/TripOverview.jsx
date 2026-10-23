import { MapPin, Calendar, Users, DollarSign, Tag, Building } from 'lucide-react';
import '../../styles/itinerary.css';

function TripOverview({ trip }) {
  const fmt = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const items = [
    {
      icon: <MapPin size={16} />,
      label: 'Destination',
      value: trip.destination,
    },
    {
      icon: <Calendar size={16} />,
      label: 'Dates',
      value: trip.startDate && trip.endDate
        ? `${fmt(trip.startDate)} – ${fmt(trip.endDate)}`
        : '—',
    },
    {
      icon: <Users size={16} />,
      label: 'Travelers',
      value: `${trip.travelers} People`,
    },
    {
      icon: <DollarSign size={16} />,
      label: 'Budget',
      value: `$${trip.budget?.total?.toLocaleString()} (${trip.budget?.currency})`,
    },
    {
      icon: <Tag size={16} />,
      label: 'Travel Style',
      value: trip.interests?.join(', ') || trip.travelStyle || '—',
    },
    {
      icon: <Building size={16} />,
      label: 'Accommodation',
      value: trip.accommodation || '—',
    },
  ];

  return (
    <div className="trip-overview-card">
      <h3>Trip Overview</h3>
      <div className="trip-overview-grid">
        {items.map((item, i) => (
          <div key={i} className="trip-overview-item">
            <div className="trip-overview-icon">{item.icon}</div>
            <div>
              <span className="trip-overview-label">{item.label}</span>
              <span className="trip-overview-value">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripOverview;
