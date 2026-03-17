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

  it('returns a specific message for an invalid API key', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ cod: 401, message: 'Invalid API key' }),
    });

    await expect(fetchWeatherData('Manila')).rejects.toThrow(
      /api key is missing or invalid/i,
    );
  });
});
