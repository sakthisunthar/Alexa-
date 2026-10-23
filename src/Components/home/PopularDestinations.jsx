import { popularDestinations } from '../../data/destinations';
import DestinationCard from './DestinationCard';
import '../../styles/destinations.css';

function PopularDestinations() {
  return (
    <section className="destinations-section">
      <div className="container">
        <div className="destinations-header">
          <h2>Popular Destinations</h2>
          <p>Explore some of the world's most loved destinations</p>
        </div>
        <div className="destinations-grid">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;
