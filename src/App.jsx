import { useState } from 'react';
import './styles/App.css';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import ForecastSection from './components/ForecastSection';
import ThemeToggle from './components/ThemeToggle';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { fetchWeatherData } from './services/weatherApi';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSearch = async (searchCity) => {
    setIsLoading(true);
    setError('');
    setWeatherData(null);
    setForecast([]);
    
    try {
      const data = await fetchWeatherData(searchCity);
      setWeatherData(data.current);
      setForecast(data.forecast);
    } catch (err) {
      setError(err.message || 'Failed to fetch the weather data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Weather Dashboard</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
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
