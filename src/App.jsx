import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Weather Dashboard</h1>
        <button className="theme-toggle">🌙 Dark Mode</button>
      </header>

      <main className="main-content">
        <section className="search-section">
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Search for a city..." 
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </section>

        <section className="weather-section">
          <div className="weather-card">
            <h2 className="city-name">Tokyo, JP</h2>
            <div className="weather-main">
              <span className="temperature">22°C</span>
              <span className="condition">Clear Sky ☀️</span>
            </div>
            <div className="weather-details">
              <div className="detail-item">
                <span className="label">Humidity</span>
                <span className="value">45%</span>
              </div>
              <div className="detail-item">
                <span className="label">Wind Speed</span>
                <span className="value">12 km/h</span>
              </div>
            </div>
          </div>
        </section>

        <section className="forecast-section">
          <h3>5-Day Forecast</h3>
          <div className="forecast-container">
            {[1, 2, 3, 4, 5].map((day) => (
              <div key={day} className="forecast-card">
                <div className="forecast-date">Oct {10 + day}</div>
                <div className="forecast-icon">☀️</div>
                <div className="forecast-temp">24°C</div>
                <div className="forecast-desc">Clear</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
