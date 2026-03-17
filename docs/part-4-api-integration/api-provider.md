# Part 4: API Provider

The project uses OpenWeatherMap as the main provider and Open-Meteo as the live fallback provider.

## Why this provider was selected

- It offers separate endpoints for current weather and forecast data
- It is widely used in frontend classroom projects
- It works well with environment-variable based API key setup in Vite
- A second live provider keeps the app working even when the primary key is missing or still waiting for activation

## Where the integration lives

All request logic is placed in [`/Users/vjmabansag/Projects/PBD_Lab3/src/services/weatherApi.js`](/Users/vjmabansag/Projects/PBD_Lab3/src/services/weatherApi.js). This keeps the React components focused on presentation instead of networking details. The UI shows which live provider is currently supplying the weather data.
