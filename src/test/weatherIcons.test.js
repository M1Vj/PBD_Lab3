import { describe, expect, it } from 'vitest';
import { resolveWeatherIcon } from '../utils/weatherIcons';

describe('resolveWeatherIcon', () => {
  it('returns a local icon variant instead of a remote image URL', () => {
    const icon = resolveWeatherIcon('10d');

    expect(icon.variant).toBe('rain');
    expect(icon.iconUrl).toBeNull();
    expect(icon.label).toMatch(/rain/i);
  });
});
