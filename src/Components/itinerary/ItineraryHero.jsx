import { Calendar, Users, DollarSign, Sparkles } from 'lucide-react';
import '../../styles/itinerary.css';

function ItineraryHero({ trip }) {
  const daysCount = trip.days?.length || 0;
  const fmt = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="itin-hero">
      <img
        className="itin-hero-img"
        src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
        alt={trip.destination}
      />
      <div className="itin-hero-overlay" />
      <div className="itin-hero-content">
        <h1>{trip.destination?.replace(/,.*/, '') || 'Trip'} Adventure</h1>
        <div className="itin-hero-meta">
          <span><Calendar size={14} /> {daysCount} Days</span>
          <span><Users size={14} /> {trip.travelers} Travelers</span>
          <span>
            <DollarSign size={14} /> ${trip.budget?.total?.toLocaleString()} ({trip.budget?.currency})
          </span>
        </div>
        <p className="itin-hero-dates">
          {trip.startDate && trip.endDate
            ? `${fmt(trip.startDate)} – ${fmt(trip.endDate)}`
            : ''}
        </p>
        <span className="badge badge-success itin-hero-badge">
          <Sparkles size={12} /> Generated with AI
        </span>
      </div>
    </div>
  );
}

export default ItineraryHero;
