const iconMap = {
  '01d': { symbol: 'Clear', label: 'Clear sky' },
  '01n': { symbol: 'Clear', label: 'Clear night' },
  '02d': { symbol: 'Cloud', label: 'Few clouds' },
  '02n': { symbol: 'Cloud', label: 'Night clouds' },
  '03d': { symbol: 'Cloud', label: 'Scattered clouds' },
  '03n': { symbol: 'Cloud', label: 'Scattered clouds' },
  '04d': { symbol: 'Cloud', label: 'Broken clouds' },
  '04n': { symbol: 'Cloud', label: 'Broken clouds' },
  '09d': { symbol: 'Rain', label: 'Shower rain' },
  '09n': { symbol: 'Rain', label: 'Shower rain' },
  '10d': { symbol: 'Rain', label: 'Rain' },
  '10n': { symbol: 'Rain', label: 'Rain' },
  '11d': { symbol: 'Storm', label: 'Thunderstorm' },
  '11n': { symbol: 'Storm', label: 'Thunderstorm' },
  '13d': { symbol: 'Snow', label: 'Snow' },
  '13n': { symbol: 'Snow', label: 'Snow' },
  '50d': { symbol: 'Mist', label: 'Mist' },
  '50n': { symbol: 'Mist', label: 'Mist' },
};

export function resolveWeatherIcon(iconCode) {
  const icon = iconMap[iconCode];

  if (icon) {
    return {
      ...icon,
      iconUrl: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
    };
  }

  return {
    symbol: 'Weather',
    label: 'Weather icon unavailable',
    iconUrl: null,
  };
}
