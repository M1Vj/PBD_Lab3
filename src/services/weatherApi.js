export const fetchWeatherData = async (city) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
  if (!API_KEY || API_KEY === 'your_openweathermap_api_key_here') {
     console.warn("Using mock data due to missing API key");
     return getMockData(city);
  }

  // Current weather
  const currentResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  if (!currentResponse.ok) {
    if (currentResponse.status === 404) throw new Error('City not found');
    throw new Error('Failed to fetch weather data');
  }
  
  const currentData = await currentResponse.json();

  // Forecast data (5 days / 3 hours -> we take daily at noon)
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!forecastResponse.ok) {
    throw new Error('Failed to fetch forecast data');
  }

  const forecastData = await forecastResponse.json();

  return formatWeatherData(currentData, forecastData);
};

function formatWeatherData(current, forecast) {
  // Parse 5-day forecast
  const dailyForecasts = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).map(item => {
    const date = new Date(item.dt * 1000);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      temp: Math.round(item.main.temp),
      desc: item.weather[0].main,
      icon: getWeatherIcon(item.weather[0].icon)
    };
  });

  return {
    current: {
      city: current.name,
      temp: Math.round(current.main.temp),
      condition: current.weather[0].main,
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6), // convert m/s to km/h
      icon: getWeatherIcon(current.weather[0].icon)
    },
    forecast: dailyForecasts.slice(0, 5) // ensure 5 days
  };
}

function getWeatherIcon(iconCode) {
  const iconMap = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌧️', '10n': '🌧️',
    '11d': '☔', '11n': '☔',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return iconMap[iconCode] || '🌤️';
}

function getMockData(city) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        current: {
          city: city.toUpperCase(),
          temp: Math.floor(Math.random() * 30),
          condition: 'Mocked Clear ☀️',
          humidity: 50,
          windSpeed: 10,
          icon: '☀️'
        },
        forecast: [
          { date: 'Tomorrow', icon: '☀️', temp: 24, desc: 'Clear' },
          { date: 'Day 2', icon: '⛅', temp: 22, desc: 'Partly Cloudy' },
          { date: 'Day 3', icon: '🌧️', temp: 19, desc: 'Light Rain' },
          { date: 'Day 4', icon: '☁️', temp: 20, desc: 'Cloudy' },
          { date: 'Day 5', icon: '☀️', temp: 25, desc: 'Sunny' }
        ]
      })
    }, 500);
  });
}