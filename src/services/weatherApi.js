import { resolveWeatherIcon } from '../utils/weatherIcons';

const CACHE_TTL = 10 * 60 * 1000;
const CURRENT_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';

function safeMetric(value) {
  return Number.isFinite(value) ? Math.round(value) : 'N/A';
}

function safeText(value, fallback) {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function buildWeatherUrl(baseUrl, city, apiKey) {
  const url = new URL(baseUrl);
  url.searchParams.set('q', city);
  url.searchParams.set('appid', apiKey);
  url.searchParams.set('units', 'metric');
  return url.toString();
}

async function requestJson(url, city) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`We couldn't find "${city}". Check the spelling and try again.`);
      }

      if (response.status === 401) {
        throw new Error('The weather API key is missing or invalid. Update your local .env file.');
      }

      throw new Error('The weather service is unavailable right now. Please try again.');
    }

    const payload = await response.json();
    if (!payload || typeof payload !== 'object') {
      throw new Error('The weather service returned an unexpected response.');
    }

    return payload;
  } catch (error) {
    if (error instanceof Error && error.message) {
      if (error.message.includes("couldn't find")) {
        throw error;
      }

      if (error.message.includes('API key is missing or invalid')) {
        throw error;
      }

      if (error.message.includes('unexpected response')) {
        throw error;
      }
    }

    throw new Error(
      'We could not reach the weather service. Check your connection and try again.',
    );
  }
}

function normalizeCurrentWeather(current) {
  const primaryWeather = current.weather?.[0] || {};
  const icon = resolveWeatherIcon(primaryWeather.icon);

  return {
    city: safeText(current.name, 'Unknown location'),
    temp: safeMetric(current.main?.temp),
    condition: safeText(primaryWeather.main, 'Unknown conditions'),
    conditionDetail: safeText(
      primaryWeather.description,
      'Detailed weather notes are unavailable.',
    ),
    humidity: safeMetric(current.main?.humidity),
    windSpeed: Number.isFinite(current.wind?.speed)
      ? Math.round(current.wind.speed * 3.6)
      : 'N/A',
    feelsLike: safeMetric(current.main?.feels_like),
    pressure: safeMetric(current.main?.pressure),
    icon: icon.symbol,
    iconLabel: icon.label,
    iconUrl: icon.iconUrl,
  };
}

function normalizeForecastDay(item) {
  const primaryWeather = item.weather?.[0] || {};
  const icon = resolveWeatherIcon(primaryWeather.icon);
  const date = new Date(item.dt * 1000);

  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    dayLabel: date.toLocaleDateString('en-US', { weekday: 'short' }),
    temp: safeMetric(item.main?.temp),
    desc: safeText(primaryWeather.main, 'Unavailable'),
    icon: icon.symbol,
    iconLabel: icon.label,
    iconUrl: icon.iconUrl,
  };
}

export function formatWeatherData(current, forecast, source = 'live') {
  const forecastList = Array.isArray(forecast.list) ? forecast.list : [];
  const middayEntries = forecastList.filter(
    (item) => typeof item?.dt_txt === 'string' && item.dt_txt.includes('12:00:00'),
  );

  return {
    current: normalizeCurrentWeather(current),
    forecast: middayEntries.slice(0, 5).map(normalizeForecastDay),
    meta: {
      source,
      fetchedAtLabel: `Updated ${new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })}`,
    },
  };
}

function getCacheKey(city) {
  return `weather_cache_${city.toLowerCase()}`;
}

function getCachedWeather(city) {
  const cached = localStorage.getItem(getCacheKey(city));
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    const expired = Date.now() - parsed.timestamp > CACHE_TTL;
    if (expired) {
      localStorage.removeItem(getCacheKey(city));
      return null;
    }
    return parsed.data;
  } catch {
    localStorage.removeItem(getCacheKey(city));
    return null;
  }
}

function setCachedWeather(city, data) {
  localStorage.setItem(
    getCacheKey(city),
    JSON.stringify({
      timestamp: Date.now(),
      data,
    }),
  );
}

function getMockData(city) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        formatWeatherData(
          {
            name: city,
            main: {
              temp: 29,
              humidity: 78,
              feels_like: 33,
              pressure: 1008,
            },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            wind: { speed: 4.8 },
          },
          {
            list: [
              {
                dt: 1710000000,
                dt_txt: '2024-03-09 12:00:00',
                main: { temp: 30 },
                weather: [{ main: 'Clear', icon: '01d' }],
              },
              {
                dt: 1710086400,
                dt_txt: '2024-03-10 12:00:00',
                main: { temp: 29 },
                weather: [{ main: 'Clouds', icon: '03d' }],
              },
              {
                dt: 1710172800,
                dt_txt: '2024-03-11 12:00:00',
                main: { temp: 28 },
                weather: [{ main: 'Rain', icon: '10d' }],
              },
              {
                dt: 1710259200,
                dt_txt: '2024-03-12 12:00:00',
                main: { temp: 27 },
                weather: [{ main: 'Thunderstorm', icon: '11d' }],
              },
              {
                dt: 1710345600,
                dt_txt: '2024-03-13 12:00:00',
                main: { temp: 31 },
                weather: [{ main: 'Sunny', icon: '01d' }],
              },
            ],
          },
          'mock',
        ),
      );
    }, 500);
  });
}

export async function fetchWeatherData(city) {
  const cached = getCachedWeather(city);
  if (cached) {
    return cached;
  }

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
    return getMockData(city);
  }

  const currentWeather = await requestJson(
    buildWeatherUrl(CURRENT_WEATHER_ENDPOINT, city, apiKey),
    city,
  );
  const forecastWeather = await requestJson(
    buildWeatherUrl(FORECAST_ENDPOINT, city, apiKey),
    city,
  );

  const formatted = formatWeatherData(currentWeather, forecastWeather);
  setCachedWeather(city, formatted);
  return formatted;
}
