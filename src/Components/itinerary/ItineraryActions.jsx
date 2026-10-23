import { Eye, Edit, RefreshCw, Share2 } from 'lucide-react';
import '../../styles/itinerary.css';

function ItineraryActions({ onViewFull, onModify, onRegenerate, onShare }) {
  return (
    <div className="itin-actions">
      <button className="btn btn-primary btn-lg itin-actions-main" onClick={onViewFull}>
        <Eye size={16} /> View Full Itinerary
      </button>
      <div className="itin-actions-row">
        <button className="btn btn-secondary" onClick={onModify}>
          <Edit size={14} /> Modify Trip
        </button>
        <button className="btn btn-secondary" onClick={onRegenerate}>
          <RefreshCw size={14} /> Regenerate
        </button>
        <button className="btn btn-secondary" onClick={onShare}>
          <Share2 size={14} /> Share
        </button>
      </div>
    </div>
  );
}

export default ItineraryActions;
