import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import FeatureHighlights from './FeatureHighlights';
import '../../styles/hero.css';

function HeroSection({ onWatchDemo }) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>
                Your Perfect Trip{' '}
                <span>Starts with AI</span>
              </h1>
              <p className="hero-description">
                Discover amazing destinations, get personalized itineraries, and
                plan your dream vacation with TripGenie AI – your intelligent
                travel companion.
              </p>
              <div className="hero-buttons">
                <Link to="/plan" className="btn btn-primary btn-lg">
                  Start Planning <ArrowRight size={18} />
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={onWatchDemo}
                >
                  <Play size={18} /> Watch Demo
                </button>
              </div>
            </div>

            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
                alt="Beautiful aerial view of a turquoise lake surrounded by mountains"
              />
              <div className="hero-image-overlay" />
            </div>
          </div>
        </div>
      </section>

      <FeatureHighlights />
    </>
  );
}

export default HeroSection;
