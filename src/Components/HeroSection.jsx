import { Link } from 'react-router-dom';

const destinations = [
  {
    name: 'Kyoto, Japan',
    detail: 'Quiet lanes & old gardens',
    image: 'photo-1493976040374-85c8e12f0c0e',
    alt: 'Traditional street in Kyoto framed by trees',
  },
  {
    name: 'Amalfi Coast, Italy',
    detail: 'Sea air & slow afternoons',
    image: 'photo-1533587851505-d119e13fa0d7',
    alt: 'Colorful homes along the Amalfi Coast',
  },
  {
    name: 'Marrakech, Morocco',
    detail: 'Markets, mint tea & color',
    image: 'photo-1539020140153-e479b8c22e70',
    alt: 'A colorful market lane in Marrakech',
  },
];

function HeroSection() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=85"
          alt="Pastel seaside villages nestled into the Italian Riviera"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">
            <span /> YOUR NEXT CHAPTER, SOMEWHERE ELSE
          </p>
          <h1 id="hero-title">
            A good trip
            <br />
            starts with <em>you.</em>
          </h1>
          <p className="hero-copy">
            Tell us what you love — your pace, your passions, your budget. Our
            AI travel assistant turns that into a journey worth remembering.
          </p>
          <Link className="primary-action" to="/plan">
            Start planning your trip <span aria-hidden="true">&#8594;</span>
          </Link>
          <p className="hero-caption">AI-powered itineraries, tailored to you</p>
        </div>
        <div className="hero-index" aria-hidden="true">
          01 <span /> 03
        </div>
        <a className="scroll-cue" href="#destinations">
          <span className="scroll-line" aria-hidden="true" />
          SCROLL TO EXPLORE
        </a>
      </section>

      <section
        className="inspiration"
        id="destinations"
        aria-labelledby="inspiration-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow eyebrow-dark">A PLACE TO BEGIN</p>
            <h2 id="inspiration-title">
              Where could <em>you</em> go?
            </h2>
          </div>
          <p className="section-intro">
            A few places to get your imagination moving. The best itinerary is
            the one that feels like yours.
          </p>
        </div>

        <div className="destination-grid">
          {destinations.map((d, i) => (
            <Link
              className="destination"
              to={`/plan?destination=${encodeURIComponent(d.name)}`}
              key={d.name}
              aria-label={`Plan a trip to ${d.name}`}
            >
              <div className="destination-image-wrap">
                <img
                  src={`https://images.unsplash.com/${d.image}?auto=format&fit=crop&w=900&q=80`}
                  alt={d.alt}
                  loading="lazy"
                />
                <span className="destination-number">0{i + 1}</span>
                <span className="destination-arrow" aria-hidden="true">
                  &#8599;
                </span>
              </div>
              <div className="destination-meta">
                <h3>{d.name}</h3>
                <p>{d.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="approach"
        id="how-it-works"
        aria-labelledby="approach-title"
      >
        <p className="eyebrow eyebrow-dark">HOW IT WORKS</p>
        <h2 id="approach-title">
          Less searching.
          <br />
          <em>More exploring.</em>
        </h2>

        <div className="approach-steps">
          <div className="approach-step">
            <span className="step-number">01</span>
            <h3>Share your vision</h3>
            <p>
              Tell us where you want to go, when, your budget, and what kind of
              experiences you love.
            </p>
          </div>
          <div className="approach-step">
            <span className="step-number">02</span>
            <h3>AI builds your itinerary</h3>
            <p>
              Get a personalized day-by-day plan with activities, meals, and
              estimated costs.
            </p>
          </div>
          <div className="approach-step">
            <span className="step-number">03</span>
            <h3>Refine through conversation</h3>
            <p>
              Chat with your travel assistant to adjust anything until the trip
              feels right.
            </p>
          </div>
        </div>

        <Link className="primary-action approach-cta" to="/plan">
          Try it now <span aria-hidden="true">&#8594;</span>
        </Link>
      </section>
    </>
  );
}

export default HeroSection;
