import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Bell, User, Menu, X } from 'lucide-react';
import '../../styles/header.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/plan', label: 'Plan Trip' },
  { to: '/my-trips', label: 'My Trips' },
];

function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="header-logo" to="/">
        <Compass size={24} />
        TripGenie AI
      </Link>

      <nav className="header-nav">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={pathname === to ? 'active' : ''}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <button className="header-icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button className="header-icon-btn" aria-label="Profile">
          <User size={18} />
        </button>
        <button className="header-signin">Sign In</button>
        <button
          className="header-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`header-mobile-menu${mobileOpen ? ' open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={pathname === to ? 'active' : ''}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}

export default Header;
