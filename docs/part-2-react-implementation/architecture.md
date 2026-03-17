# Part 2: React Architecture

## Why React was used

React fits this activity because the screen changes based on user input and API responses. Instead of manually changing the DOM, the app updates itself when state changes.

## Main architecture decisions

- `App.jsx` keeps the top-level state for the current search, request status, weather result, forecast result, theme, and feedback messages.
- `SearchForm.jsx` handles the city input, validation message, and submit action.
- `WeatherCard.jsx` focuses only on current weather presentation.
- `ForecastSection.jsx` focuses only on the 5-day forecast grid.
- `LoadingState.jsx` and `ErrorState.jsx` make temporary request states visible and understandable.
- `ThemeToggle.jsx` manages light and dark mode persistence through `localStorage`.
- `weatherApi.js` performs API communication and returns already-formatted data so the UI components stay simple.

## Simple data flow

1. The user enters a city.
2. The form submits the value to `App.jsx`.
3. `App.jsx` calls the weather service.
4. The weather service fetches and normalizes the API response.
5. The result is passed down into presentational components.

## Reviewer note

This structure was chosen to keep UI rendering, request logic, and formatting logic separate. That makes the code easier to read, test, and explain.
