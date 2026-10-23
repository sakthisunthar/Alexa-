import { Link, useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="TripGenie AI home">
        <span className="brand-mark" aria-hidden="true">T</span>
        <span className="brand-name">tripgenie<span>AI</span></span>
      </Link>

      <nav className="site-nav" aria-label="Main navigation">
        {isHome && <a href="#destinations">Destinations</a>}
        {isHome && <a href="#how-it-works">How it works</a>}
        <Link to="/plan">Plan a trip</Link>
      </nav>

      <Link className="header-action" to="/plan">
        Start planning <span aria-hidden="true">&#8599;</span>
      </Link>
    </header>
  );
}

export default Header;
