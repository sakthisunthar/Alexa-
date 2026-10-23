import ActivityCard from './ActivityCard';
import '../../styles/itinerary.css';

function DayItinerary({ days }) {
  const fmtDate = (d) =>
    new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="day-itinerary">
      <h3>Day-by-Day Itinerary</h3>
      <div className="day-timeline">
        {days.map((day) => (
          <div key={day.dayNumber} className="day-block">
            <div className="day-marker">
              <div className="day-marker-circle">
                <span>Day {day.dayNumber}</span>
              </div>
              {day.date && <span className="day-marker-date">{fmtDate(day.date)}</span>}
            </div>
            <div className="day-content">
              <h4 className="day-title">{day.title}</h4>
              <div className="day-activities">
                {day.activities.map((act, i) => (
                  <ActivityCard key={i} activity={act} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayItinerary;
