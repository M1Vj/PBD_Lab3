import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchWeatherData } from '../services/weatherApi';

describe('fetchWeatherData', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    vi.stubEnv('VITE_WEATHER_API_KEY', 'test-key');
  });

  it('normalizes incomplete API payloads into safe renderable data', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'Manila',
          main: { temp: 29.2 },
          weather: [],
          wind: {},
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          list: [
            {
              dt: 1710000000,
              dt_txt: '2024-03-09 12:00:00',
              main: {},
              weather: [],
            },
          ],
        }),
      });

    const result = await fetchWeatherData('Manila');

    expect(result.current.city).toBe('Manila');
    expect(result.current.condition).toBe('Unknown conditions');
    expect(result.current.humidity).toBe('N/A');
    expect(result.current.pressure).toBe('N/A');
    expect(result.forecast[0]).toMatchObject({
      temp: 'N/A',
      desc: 'Unavailable',
    });
  });

  it('throws a retry-friendly error when the network request fails', async () => {
    fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(fetchWeatherData('Manila')).rejects.toThrow(
      /check your connection and try again/i,
    );
  });

  it('falls back to the alternate provider when the OpenWeather key is invalid', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ cod: 401, message: 'Invalid API key' }),
    })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              name: 'Manila',
              country: 'Philippines',
              latitude: 14.6042,
              longitude: 120.9822,
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          current: {
            temperature_2m: 30.2,
            relative_humidity_2m: 78,
            apparent_temperature: 34,
            pressure_msl: 1008,
            wind_speed_10m: 18.3,
            weather_code: 3,
            is_day: 1,
          },
          daily: {
            time: ['2026-03-18', '2026-03-19', '2026-03-20', '2026-03-21', '2026-03-22'],
            temperature_2m_max: [31, 30, 29, 28, 32],
            weather_code: [3, 61, 95, 0, 45],
          },
        }),
    });

    const result = await fetchWeatherData('Manila');

    expect(result.meta.source).toBe('fallback');
    expect(result.meta.providerLabel).toBe('Open-Meteo');
    expect(result.current.city).toContain('Manila');
  });

  it('uses a live fallback provider when no OpenWeather key is configured', async () => {
    vi.stubEnv('VITE_WEATHER_API_KEY', '');

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              name: 'Manila',
              country: 'Philippines',
              latitude: 14.6042,
              longitude: 120.9822,
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          current: {
            temperature_2m: 30.2,
            relative_humidity_2m: 78,
            apparent_temperature: 34,
            pressure_msl: 1008,
            wind_speed_10m: 18.3,
            weather_code: 3,
            is_day: 1,
          },
          daily: {
            time: ['2026-03-18', '2026-03-19', '2026-03-20', '2026-03-21', '2026-03-22'],
            temperature_2m_max: [31, 30, 29, 28, 32],
            weather_code: [3, 61, 95, 0, 45],
          },
        }),
      });

    const result = await fetchWeatherData('Manila');

    expect(result.meta.source).toBe('fallback');
    expect(result.meta.providerLabel).toBe('Open-Meteo');
    expect(result.current.city).toContain('Manila');
    expect(result.forecast).toHaveLength(5);
  });
});
