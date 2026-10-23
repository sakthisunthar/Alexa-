import { Wrench } from 'lucide-react';
import ToolActivityItem from './ToolActivityItem';
import { sampleToolActivities, mcpProtocolNote } from '../../data/sampleToolActivities';
import '../../styles/tools.css';

function ToolActivityPanel({ activities }) {
  const items = activities || sampleToolActivities;

  return (
    <div className="tool-panel">
      <div className="tool-panel-header">
        <div className="tool-panel-icon">
          <Wrench size={20} />
        </div>
        <div>
          <h2>MCP Tool Activity</h2>
          <p>Real-time view of tools being called and their results.</p>
        </div>
      </div>

      <div className="tool-panel-list">
        {items.map((activity) => (
          <ToolActivityItem key={activity.id} activity={activity} />
        ))}
      </div>

      <p className="tool-panel-note">{mcpProtocolNote}</p>
    </div>
  );
}

export default ToolActivityPanel;
