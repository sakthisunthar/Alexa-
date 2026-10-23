import { Link } from 'react-router-dom';
import { Map, MessageSquare, Briefcase, Settings } from 'lucide-react';
import '../../styles/sidebar.css';

const items = [
  { to: '/plan', label: 'Trip Planner', icon: Map },
  { to: '/chat', label: 'Chat Assistant', icon: MessageSquare },
  { to: '/my-trips', label: 'My Trips', icon: Briefcase },
  { to: '/settings', label: 'Settings', icon: Settings },
];

function Sidebar({ activePage }) {
  return (
    <aside className="sidebar">
      {items.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className={`sidebar-item${activePage === to ? ' active' : ''}`}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </aside>
  );
}

export default Sidebar;
