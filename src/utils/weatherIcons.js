const iconMap = {
  '01d': { symbol: 'Clear', label: 'Clear sky', variant: 'sun' },
  '01n': { symbol: 'Clear night', label: 'Clear night', variant: 'moon' },
  '02d': { symbol: 'Partly cloudy', label: 'Few clouds', variant: 'partly-cloudy' },
  '02n': { symbol: 'Night clouds', label: 'Night clouds', variant: 'night-cloud' },
  '03d': { symbol: 'Clouds', label: 'Scattered clouds', variant: 'cloud' },
  '03n': { symbol: 'Clouds', label: 'Scattered clouds', variant: 'cloud' },
  '04d': { symbol: 'Clouds', label: 'Broken clouds', variant: 'cloud' },
  '04n': { symbol: 'Clouds', label: 'Broken clouds', variant: 'cloud' },
  '09d': { symbol: 'Rain', label: 'Shower rain', variant: 'rain' },
  '09n': { symbol: 'Rain', label: 'Shower rain', variant: 'rain' },
  '10d': { symbol: 'Rain', label: 'Rain', variant: 'rain' },
  '10n': { symbol: 'Rain', label: 'Rain', variant: 'rain' },
  '11d': { symbol: 'Thunderstorm', label: 'Thunderstorm', variant: 'storm' },
  '11n': { symbol: 'Thunderstorm', label: 'Thunderstorm', variant: 'storm' },
  '13d': { symbol: 'Snow', label: 'Snow', variant: 'snow' },
  '13n': { symbol: 'Snow', label: 'Snow', variant: 'snow' },
  '50d': { symbol: 'Mist', label: 'Mist', variant: 'mist' },
  '50n': { symbol: 'Mist', label: 'Mist', variant: 'mist' },
};

export function resolveWeatherIcon(iconCode) {
  const icon = iconMap[iconCode];

  if (icon) {
    return {
      ...icon,
      iconUrl: null,
    };
  }

  return {
    symbol: 'Weather',
    label: 'Weather icon unavailable',
    variant: 'unknown',
    iconUrl: null,
  };
}

export function resolveWeatherCode(weatherCode, isDay = true) {
  if (weatherCode === 0) {
    return resolveWeatherIcon(isDay ? '01d' : '01n');
  }

  if ([1, 2].includes(weatherCode)) {
    return resolveWeatherIcon(isDay ? '02d' : '02n');
  }

  if ([3].includes(weatherCode)) {
    return resolveWeatherIcon('03d');
  }

  if ([45, 48].includes(weatherCode)) {
    return resolveWeatherIcon('50d');
  }

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return resolveWeatherIcon('10d');
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return resolveWeatherIcon('13d');
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return resolveWeatherIcon('11d');
  }

  return resolveWeatherIcon('03d');
}
