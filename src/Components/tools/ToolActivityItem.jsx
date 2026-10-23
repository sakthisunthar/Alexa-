import { useState } from 'react';
import { ChevronDown, ChevronRight, Wrench, Check, X, Loader } from 'lucide-react';
import '../../styles/tools.css';

function ToolActivityItem({ activity }) {
  const [expanded, setExpanded] = useState(false);

  const statusBadge = {
    success: <span className="badge badge-success"><Check size={10} /> Success</span>,
    error: <span className="badge badge-error"><X size={10} /> Failed</span>,
    pending: <span className="badge badge-warning"><Loader size={10} className="spin" /> Pending</span>,
  };

  const fmtTime = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`tool-item${expanded ? ' tool-item-expanded' : ''}`}>
      <div className="tool-item-row" onClick={() => setExpanded(!expanded)}>
        <div className="tool-item-icon">
          <Wrench size={16} />
        </div>
        <div className="tool-item-info">
          <span className="tool-item-name">{activity.tool}</span>
          <span className="tool-item-summary">{activity.summary}</span>
          {activity.detail && (
            <span className="tool-item-detail">{activity.detail}</span>
          )}
        </div>
        <div className="tool-item-right">
          {statusBadge[activity.status] || statusBadge.pending}
          {activity.timestamp && (
            <span className="tool-item-time">{fmtTime(activity.timestamp)}</span>
          )}
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </div>

      {expanded && (
        <div className="tool-item-details">
          {activity.arguments && (
            <div className="tool-detail-section">
              <h5>Arguments</h5>
              <pre>{JSON.stringify(activity.arguments, null, 2)}</pre>
            </div>
          )}
          {activity.result && (
            <div className="tool-detail-section">
              <h5>Result</h5>
              <pre>{JSON.stringify(activity.result, null, 2)}</pre>
            </div>
          )}
          {activity.duration && (
            <span className="tool-detail-duration">Duration: {activity.duration}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default ToolActivityItem;
