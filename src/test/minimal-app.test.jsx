import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MinimalApp from '../minimal/MinimalApp';

vi.mock('../services/weatherApi', () => ({
  fetchWeatherData: vi.fn(),
}));

import { fetchWeatherData } from '../services/weatherApi';

const mockWeatherData = {
  current: {
    city: 'Manila',
    temp: 31,
    condition: 'Cloudy',
    conditionDetail: 'overcast clouds',
    humidity: 78,
    windSpeed: 18,
    feelsLike: 35,
    pressure: 1008,
    icon: '☁️',
    iconLabel: 'Cloudy',
  },
  forecast: [
    { dayLabel: 'Wed', date: 'Mar 18', temp: 31, desc: 'Cloudy', icon: '☁️', iconLabel: 'Cloudy' },
    { dayLabel: 'Thu', date: 'Mar 19', temp: 30, desc: 'Rain', icon: '🌧️', iconLabel: 'Rain' },
    { dayLabel: 'Fri', date: 'Mar 20', temp: 29, desc: 'Storm', icon: '⛈️', iconLabel: 'Storm' },
    { dayLabel: 'Sat', date: 'Mar 21', temp: 28, desc: 'Sunny', icon: '☀️', iconLabel: 'Sunny' },
    { dayLabel: 'Sun', date: 'Mar 22', temp: 32, desc: 'Fog', icon: '🌫️', iconLabel: 'Fog' },
  ],
  meta: {
    source: 'live',
    providerLabel: 'OpenWeatherMap',
    fetchedAtLabel: 'Updated 9:10 AM',
  },
};

describe('MinimalApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => 'light'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('shows validation when the user submits an empty city', async () => {
    const user = userEvent.setup();

    render(<MinimalApp />);

    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/enter a city/i);
  });

  it('renders current weather and five-day forecast after a successful search', async () => {
    const user = userEvent.setup();
    fetchWeatherData.mockResolvedValue(mockWeatherData);

    render(<MinimalApp />);

    await user.type(screen.getByLabelText(/city/i), 'Manila');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /manila/i })).toBeInTheDocument();
    });

    expect(
      within(screen.getByRole('region', { name: /current weather/i })).getByText(/31°c/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/5-day forecast/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });

  it('toggles between light and dark theme', async () => {
    const user = userEvent.setup();

    render(<MinimalApp />);

    await user.click(screen.getByRole('button', { name: /dark mode/i }));

    expect(screen.getByRole('button', { name: /light mode/i })).toBeInTheDocument();
  });
});
