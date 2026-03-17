# Component Architecture
The application is broken down into modular React Functional Components to maintain clear separation of concerns.

- **App.jsx**: The main container that holds state and passes it down to child components.
- **SearchForm.jsx**: Handles user input and triggers the search action.
- **WeatherCard.jsx**: Displays the current weather details (temperature, humidity, wind).
- **ForecastSection.jsx**: Displays the 5-day forecast mapping over an array of data.
- **ThemeToggle.jsx**: Manages dark/light mode switching.
- **LoadingState.jsx & ErrorState.jsx**: Provide feedback for data fetching states.
