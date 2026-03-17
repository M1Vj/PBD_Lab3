import { resolveWeatherCode, resolveWeatherIcon } from '../utils/weatherIcons';

const CACHE_TTL = 10 * 60 * 1000;
const CURRENT_WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';
const OPEN_METEO_GEOCODING_ENDPOINT = 'https://geocoding-api.open-meteo.com/v1/search';
const OPEN_METEO_FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast';

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

function buildFallbackGeocodingUrl(city) {
  const url = new URL(OPEN_METEO_GEOCODING_ENDPOINT);
  url.searchParams.set('name', city);
  url.searchParams.set('count', '1');
  url.searchParams.set('language', 'en');
  url.searchParams.set('format', 'json');
  return url.toString();
}

function buildFallbackForecastUrl(latitude, longitude) {
  const url = new URL(OPEN_METEO_FORECAST_ENDPOINT);
  url.searchParams.set('latitude', latitude);
  url.searchParams.set('longitude', longitude);
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,weather_code,is_day',
  );
  url.searchParams.set('daily', 'weather_code,temperature_2m_max');
  url.searchParams.set('forecast_days', '5');
  url.searchParams.set('timezone', 'auto');
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
    iconVariant: icon.variant,
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
    iconVariant: icon.variant,
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
      providerLabel: 'OpenWeatherMap',
      fetchedAtLabel: `Updated ${new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })}`,
    },
  };
}

function formatFallbackData(location, forecast) {
  const currentWeather = resolveWeatherCode(
    forecast.current?.weather_code,
    forecast.current?.is_day === 1,
  );

  return {
    current: {
      city: `${safeText(location.name, 'Unknown location')}${location.country ? `, ${location.country}` : ''}`,
      temp: safeMetric(forecast.current?.temperature_2m),
      condition: safeText(currentWeather.symbol, 'Unknown conditions'),
      conditionDetail: safeText(currentWeather.label, 'Detailed weather notes are unavailable.'),
      humidity: safeMetric(forecast.current?.relative_humidity_2m),
      windSpeed: safeMetric(forecast.current?.wind_speed_10m),
      feelsLike: safeMetric(forecast.current?.apparent_temperature),
      pressure: safeMetric(forecast.current?.pressure_msl),
      icon: currentWeather.symbol,
      iconLabel: currentWeather.label,
      iconVariant: currentWeather.variant,
    },
    forecast: (forecast.daily?.time || []).slice(0, 5).map((time, index) => {
      const icon = resolveWeatherCode(forecast.daily?.weather_code?.[index], true);
      const date = new Date(time);

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        dayLabel: date.toLocaleDateString('en-US', { weekday: 'short' }),
        temp: safeMetric(forecast.daily?.temperature_2m_max?.[index]),
        desc: safeText(icon.symbol, 'Unavailable'),
        icon: icon.symbol,
        iconLabel: icon.label,
        iconVariant: icon.variant,
      };
    }),
    meta: {
      source: 'fallback',
      providerLabel: 'Open-Meteo',
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

async function fetchFallbackWeather(city) {
  try {
    const geocodingResponse = await fetch(buildFallbackGeocodingUrl(city));
    const geocodingData = await geocodingResponse.json();
    const location = geocodingData.results?.[0];

    if (!location) {
      throw new Error(`We couldn't find "${city}". Check the spelling and try again.`);
    }

    const forecastResponse = await fetch(
      buildFallbackForecastUrl(location.latitude, location.longitude),
    );
    const forecastData = await forecastResponse.json();

    if (!forecastResponse.ok || !forecastData?.current || !forecastData?.daily) {
      throw new Error('The fallback weather service is unavailable right now. Please try again.');
    }

    return formatFallbackData(location, forecastData);
  } catch (error) {
    if (error instanceof Error && error.message.includes("couldn't find")) {
      throw error;
    }

    throw new Error(
      'We could not reach the weather service. Check your connection and try again.',
    );
  }
}

export async function fetchWeatherData(city) {
  const cached = getCachedWeather(city);
  if (cached) {
    return cached;
  }

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
    const fallbackData = await fetchFallbackWeather(city);
    setCachedWeather(city, fallbackData);
    return fallbackData;
  }

  try {
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
  } catch (error) {
    if (error instanceof Error && error.message.includes("couldn't find")) {
      throw error;
    }

    const fallbackData = await fetchFallbackWeather(city);
    setCachedWeather(city, fallbackData);
    return fallbackData;
  }
}
