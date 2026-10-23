import { useState } from 'react';
import { Link } from 'react-router-dom';
import ItineraryHero from './ItineraryHero';
import TripOverview from './TripOverview';
import DayItinerary from './DayItinerary';
import BudgetSummary from './BudgetSummary';
import ItineraryActions from './ItineraryActions';
import { sampleTrip } from '../../data/sampleTrips';
import '../../styles/itinerary.css';

const TABS = ['Overview', 'Itinerary', 'Budget', 'Tools', 'Chat'];

function Itinerary({ trip: propTrip }) {
  const trip = propTrip || sampleTrip;
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="itinerary-page">
      <ItineraryHero trip={trip} />

      <div className="itin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`itin-tab${activeTab === tab ? ' itin-tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="itin-content container">
        {activeTab === 'Overview' && (
          <div className="itin-overview-grid">
            <TripOverview trip={trip} />
            <DayItinerary days={trip.days || []} />
          </div>
        )}

        {activeTab === 'Itinerary' && (
          <DayItinerary days={trip.days || []} />
        )}

        {activeTab === 'Budget' && (
          <BudgetSummary budget={trip.budget} />
        )}

        {activeTab === 'Tools' && (
          <div className="itin-placeholder">
            <p>View tool execution details</p>
            <Link to="/tools" className="btn btn-primary">Open Tool Activity</Link>
          </div>
        )}

        {activeTab === 'Chat' && (
          <div className="itin-placeholder">
            <p>Continue the conversation about this trip</p>
            <Link to="/chat" className="btn btn-primary">Open Chat</Link>
          </div>
        )}

        <ItineraryActions
          onViewFull={() => setActiveTab('Itinerary')}
          onModify={() => {}}
          onRegenerate={() => {}}
          onShare={() => {}}
        />
      </div>

      {trip.dataSource === 'sample' && (
        <p className="itin-data-notice container">
          Prices and availability are estimates based on sample data.
        </p>
      )}
    </div>
  );
}

export default Itinerary;
