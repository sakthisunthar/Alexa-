import { Clock } from 'lucide-react';
import '../../styles/itinerary.css';

const CATEGORY_COLORS = {
  culture: '#6366F1',
  food: '#F59E0B',
  nature: '#10B981',
  adventure: '#EF4444',
  relaxation: '#8B5CF6',
  shopping: '#EC4899',
  transport: '#64748B',
  sightseeing: '#2563EB',
};

function ActivityCard({ activity }) {
  const color = CATEGORY_COLORS[activity.category] || '#64748B';

  return (
    <div className="act-card">
      <div className="act-card-time">
        <Clock size={12} />
        <span>{activity.time}</span>
      </div>
      <div className="act-card-body">
        <div className="act-card-header">
          <h4>{activity.name}</h4>
          {activity.category && (
            <span className="act-card-tag" style={{ background: color + '15', color }}>
              {activity.category}
            </span>
          )}
        </div>
        {activity.description && (
          <p className="act-card-desc">{activity.description}</p>
        )}
        {activity.location && (
          <span className="act-card-location">{activity.location}</span>
        )}
      </div>
      {activity.image && (
        <img
          className="act-card-thumb"
          src={activity.image}
          alt={activity.name}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default ActivityCard;
