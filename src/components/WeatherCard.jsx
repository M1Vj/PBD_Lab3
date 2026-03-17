export default function WeatherCard({ data }) {
  if (!data) return null;
  return (
    <section className="weather-section">
      <div className="weather-card">
        <h2 className="city-name">{data.city}</h2>
        <div className="weather-main">
          <span className="temperature">{data.temp}°C</span>
          <span className="condition">{data.condition}</span>
        </div>
        <div className="weather-details">
          <div className="detail-item">
            <span className="label">Humidity</span>
            <span className="value">{data.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="label">Wind Speed</span>
            <span className="value">{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </section>
  );
}