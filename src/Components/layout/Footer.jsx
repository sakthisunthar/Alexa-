import { Link } from 'react-router-dom';
import { Compass, Globe, MessageCircle, Video, Mail } from 'lucide-react';
import '../../styles/footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-section">
            <div className="footer-logo">
              <Compass size={22} />
              TripGenie AI
            </div>
            <p className="footer-tagline">Plan Smarter. Travel Further.</p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/plan">Plan Trip</Link></li>
              <li><Link to="/my-trips">My Trips</Link></li>
              <li><Link to="/">About</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Follow Us</h4>
            <div className="footer-socials">
              <a href="#!" className="footer-social-link" aria-label="Facebook"><Globe size={18} /></a>
              <a href="#!" className="footer-social-link" aria-label="Twitter"><MessageCircle size={18} /></a>
              <a href="#!" className="footer-social-link" aria-label="YouTube"><Video size={18} /></a>
              <a href="#!" className="footer-social-link" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} TripGenie AI. All rights reserved.</span>
          <span className="footer-bottom-love">Built with <span>&hearts;</span> for travelers</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
