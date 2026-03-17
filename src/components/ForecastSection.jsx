export default function ForecastSection({ forecast }) {
  if (!forecast || forecast.length === 0) return null;
  
  return (
    <section className="forecast-section">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, idx) => (
          <div key={idx} className="forecast-card">
            <div className="forecast-date">{day.date}</div>
            <div className="forecast-icon">{day.icon}</div>
            <div className="forecast-temp">{day.temp}°C</div>
            <div className="forecast-desc">{day.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}