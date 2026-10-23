import { Brain, CalendarDays, DollarSign, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Planning',
    description: 'Get personalized recommendations',
  },
  {
    icon: CalendarDays,
    title: 'Smart Itineraries',
    description: 'Day-by-day travel plans',
  },
  {
    icon: DollarSign,
    title: 'Budget Estimation',
    description: 'Plan within your budget',
  },
  {
    icon: Zap,
    title: 'Real-Time Insights',
    description: 'Powered by MCP tools',
  },
];

function FeatureHighlights() {
  return (
    <section className="features">
      <div className="container">
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">
                <f.icon size={22} />
              </div>
              <div className="feature-text">
                <h4>{f.title}</h4>
                <p>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureHighlights;
