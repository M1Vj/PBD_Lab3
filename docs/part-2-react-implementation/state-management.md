# State Management
State is managed locally using React's `useState` hook. 

- `city`: Tracks the current input string.
- `weatherData`: Stores the current mock weather data object.
- `forecast`: Stores an array of 5 daily forecast objects.
- `isLoading`: Boolean to show/hide the LoadingState component.
- `error`: String to display meaningful error messages if a search fails.
- `theme`: String ('light' | 'dark') tracking the UI appearance.

Lifting state to `App.jsx` allows data to flow downward correctly into pure presentational components like `WeatherCard` and `ForecastSection`.
