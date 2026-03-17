import { memo } from 'react';

const detailItems = [
  { label: 'Humidity', key: 'humidity', suffix: '%' },
  { label: 'Wind speed', key: 'windSpeed', suffix: ' km/h' },
  { label: 'Feels like', key: 'feelsLike', suffix: '°C' },
  { label: 'Pressure', key: 'pressure', suffix: ' hPa' },
];

function formatMetric(value, suffix) {
  return value === 'N/A' ? value : `${value}${suffix}`;
}

const WeatherCard = memo(function WeatherCard({
  data,
  lastUpdated,
  dataSource,
}) {
  if (!data) return null;

  return (
    <section className="weather-panel" aria-labelledby="current-weather-title">
      <div className="panel-heading">
        <div>
          <p className="section-tag">Current Weather</p>
          <h2 id="current-weather-title">{data.city}</h2>
        </div>
        <div className="source-block">
          <p>{lastUpdated}</p>
          {dataSource === 'mock' ? (
            <span className="source-chip source-chip-demo">
              Demo data: add your API key for live results
            </span>
          ) : (
            <span className="source-chip">Live API data</span>
          )}
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-block">
          <div className="weather-glyph">
            {data.iconUrl ? (
              <img
                src={data.iconUrl}
                alt={data.iconLabel}
                className="weather-icon-image"
              />
            ) : (
              <span aria-hidden="true">{data.icon}</span>
            )}
          </div>
          <div>
            <p className="temperature">{data.temp === 'N/A' ? 'N/A' : `${data.temp}°C`}</p>
            <p className="condition">{data.condition}</p>
            <p className="condition-detail">{data.conditionDetail}</p>
          </div>
        </div>

        <div className="metrics-grid">
          {detailItems.map((item) => (
            <article className="metric-card" key={item.key}>
              <p className="metric-label">{item.label}</p>
              <p className="metric-value">
                {formatMetric(data[item.key], item.suffix)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default WeatherCard;
