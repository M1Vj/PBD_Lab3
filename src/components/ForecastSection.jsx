import { memo } from 'react';

const ForecastSection = memo(function ForecastSection({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <section className="forecast-panel" aria-labelledby="forecast-title">
      <div className="panel-heading">
        <div>
          <p className="section-tag">Forecast Outlook</p>
          <h2 id="forecast-title">Five-day forecast</h2>
        </div>
        <p className="panel-caption">
          Midday forecast snapshots keep each day easy to compare at a glance.
        </p>
      </div>

      <div className="forecast-grid">
        {forecast.map((day) => (
          <article className="forecast-card" key={day.date}>
            <p className="forecast-day">{day.dayLabel}</p>
            <p className="forecast-date">{day.date}</p>
            <div className="forecast-icon">
              {day.iconUrl ? (
                <img
                  src={day.iconUrl}
                  alt={day.iconLabel}
                  className="forecast-icon-image"
                />
              ) : (
                <span aria-hidden="true">{day.icon}</span>
              )}
            </div>
            <p className="forecast-temp">
              {day.temp === 'N/A' ? 'N/A' : `${day.temp}°C`}
            </p>
            <p className="forecast-desc">{day.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
});

export default ForecastSection;
