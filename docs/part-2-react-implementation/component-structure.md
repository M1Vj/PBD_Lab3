# Part 2: Component Structure

## Component list

- `App.jsx`: top-level coordinator for state and layout
- `SearchForm.jsx`: labeled input, helper text, validation, and submit button
- `ThemeToggle.jsx`: theme switch with `localStorage` persistence
- `WeatherCard.jsx`: current weather presentation
- `ForecastSection.jsx`: forecast grid presentation
- `LoadingState.jsx`: request-in-progress feedback
- `ErrorState.jsx`: readable error state with retry button

## Why this structure is useful

Each file has one clear purpose. That makes the project easier to test and easier to explain during checking. Instead of putting everything in one component, the project splits the dashboard into small parts that can be reviewed one by one.

## Screenshot evidence

- `screenshots/empty-state.png`
- `screenshots/search-results.png`
