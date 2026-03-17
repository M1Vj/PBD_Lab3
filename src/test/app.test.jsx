import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

vi.mock('../services/weatherApi', () => ({
  fetchWeatherData: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => 'light'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('shows a guided empty state before the first search', () => {
    render(<App />);

    expect(screen.getByText(/start with a city search/i)).toBeInTheDocument();
    expect(
      screen.getByText(/switch themes, search a city, and review the five-day outlook/i),
    ).toBeInTheDocument();
  });

  it('shows accessible validation when the city field is submitted empty', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: /search weather/i }));

    expect(screen.getByLabelText(/city or municipality/i)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(/enter a city before searching/i);
  });
});
