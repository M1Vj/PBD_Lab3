import { useState } from 'react';
import './styles/App.css';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import ForecastSection from './components/ForecastSection';
import ThemeToggle from './components/ThemeToggle';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const handleSearch = (searchCity) => {
    setIsLoading(true);
    setError('');
    
    // Mocking an API call
    setTimeout(() => {
      if (searchCity.toLowerCase() === 'error') {
        setError('City not found. Please try again.');
        setWeatherData(null);
        setForecast([]);
      } else {
        setWeatherData({
          city: searchCity.toUpperCase(),
          temp: 22,
          condition: 'Clear Sky ☀️',
          humidity: 45,
          windSpeed: 12
        });
        setForecast([
          { date: 'Oct 11', icon: '☀️', temp: 24, desc: 'Clear' },
          { date: 'Oct 12', icon: '⛅', temp: 22, desc: 'Partly Cloudy' },
          { date: 'Oct 13', icon: '🌧️', temp: 19, desc: 'Light Rain' },
          { date: 'Oct 14', icon: '☁️', temp: 20, desc: 'Cloudy' },
          { date: 'Oct 15', icon: '☀️', temp: 25, desc: 'Sunny' }
        ]);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Weather Dashboard</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <main className="main-content">
        <SearchForm city={city} setCity={setCity} onSearch={handleSearch} />
        
        {isLoading && <LoadingState />}
        {error && <ErrorState message={error} />}
        
        {!isLoading && !error && weatherData && (
          <>
            <WeatherCard data={weatherData} />
            <ForecastSection forecast={forecast} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
