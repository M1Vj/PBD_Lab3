import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherApi';

const initialTheme = () => localStorage.getItem('minimal-theme') || 'light';

export default function MinimalApp() {
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState(initialTheme);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('minimal-theme', theme);
  }, [theme]);

  async function handleSubmit(event) {
    event.preventDefault();
    const city = query.trim();

    if (!city) {
      setError('Enter a city before searching.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const weather = await fetchWeatherData(city);
      setData(weather);
      setQuery(weather.current.city || city);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load weather data.');
    } finally {
      setLoading(false);
    }
  }

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  return (
    <main className="minimal-app">
      <section className="panel">
        <div className="topbar">
          <div>
            <p className="eyebrow">PBD Lab 3</p>
            <h1>Minimal Weather App</h1>
            <p className="subcopy">
              Small React version with live search, forecast, theme toggle, and responsive layout.
            </p>
          </div>
          <button type="button" className="theme-button" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>

        <form className="search-row" onSubmit={handleSubmit}>
          <label className="field">
            <span>City</span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search city"
            />
          </label>
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {error ? (
          <p className="status error" role="alert">
            {error}
          </p>
        ) : null}

        {!data && !loading ? (
          <p className="status">Search for a city to load the current weather and five-day forecast.</p>
        ) : null}

        {data ? (
          <div className="content">
            <section className="card current-card" aria-label="Current weather">
              <div className="current-header">
                <div>
                  <h2>{data.current.city}</h2>
                  <p>{data.current.conditionDetail}</p>
                </div>
                <span className="icon" aria-label={data.current.iconLabel}>
                  {data.current.icon}
                </span>
              </div>
              <p className="temperature">{data.current.temp}°C</p>
              <p className="condition">{data.current.condition}</p>
              <dl className="metrics">
                <div>
                  <dt>Feels like</dt>
                  <dd>{data.current.feelsLike}°C</dd>
                </div>
                <div>
                  <dt>Humidity</dt>
                  <dd>{data.current.humidity}%</dd>
                </div>
                <div>
                  <dt>Wind</dt>
                  <dd>{data.current.windSpeed} km/h</dd>
                </div>
                <div>
                  <dt>Pressure</dt>
                  <dd>{data.current.pressure} hPa</dd>
                </div>
              </dl>
              <p className="source">
                {data.meta.providerLabel} • {data.meta.fetchedAtLabel}
              </p>
            </section>

            <section className="card forecast-card">
              <div className="forecast-heading">
                <h2>5-Day Forecast</h2>
                <p>Compact review view for printing and quick checking.</p>
              </div>
              <ul className="forecast-list">
                {data.forecast.map((day) => (
                  <li key={`${day.dayLabel}-${day.date}`}>
                    <span className="day">
                      <strong>{day.dayLabel}</strong>
                      <small>{day.date}</small>
                    </span>
                    <span className="forecast-icon" aria-label={day.iconLabel}>
                      {day.icon}
                    </span>
                    <span className="forecast-desc">{day.desc}</span>
                    <span className="forecast-temp">{day.temp}°C</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </section>
    </main>
  );
}
