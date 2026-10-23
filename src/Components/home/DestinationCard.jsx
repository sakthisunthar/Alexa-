import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function DestinationCard({ destination }) {
  const { name, country, image } = destination;

  return (
    <Link
      className="destination-card"
      to={`/plan?destination=${encodeURIComponent(name)}`}
    >
      <div className="destination-card-image">
        <img src={image} alt={`${name}, ${country}`} loading="lazy" />
        <div className="destination-card-gradient" />
      </div>
      <div className="destination-card-body">
        <div className="destination-card-info">
          <h3>{name}</h3>
          <span>{country}</span>
        </div>
        <div className="destination-card-arrow">
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}

export default DestinationCard;
