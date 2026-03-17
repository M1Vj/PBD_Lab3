import {
  CircleHelp,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  MoonStar,
  Snowflake,
  SunMedium,
} from 'lucide-react';

const iconMap = {
  sun: SunMedium,
  moon: MoonStar,
  cloud: Cloud,
  'partly-cloudy': CloudSun,
  'night-cloud': CloudMoon,
  rain: CloudRain,
  storm: CloudLightning,
  snow: Snowflake,
  mist: CloudFog,
  unknown: CircleHelp,
};

export default function WeatherIcon({ variant, label, className = '' }) {
  const Icon = iconMap[variant] || CircleHelp;

  return (
    <span className={`${className} weather-icon weather-icon--${variant || 'unknown'}`.trim()} role="img" aria-label={label}>
      <Icon strokeWidth={1.8} />
    </span>
  );
}
