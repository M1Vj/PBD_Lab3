# Part 4: Environment Setup

## Required local file

Create a local `.env` file based on `.env.example`.

```bash
cp .env.example .env
```

Then place the OpenWeather API key inside:

```bash
VITE_WEATHER_API_KEY=your_actual_openweathermap_key
```

## Why this matters

- The API key stays out of version control
- The code can safely read the key through `import.meta.env`
- The same project can still run on a live fallback provider without exposing a real secret

## Reviewer note

If `.env` is not present, the dashboard falls back to clearly-labeled live data from Open-Meteo instead of failing with a blank screen.

If the API key is newly created in OpenWeatherMap, it may also require email confirmation before live requests start succeeding. In that situation, the project still keeps working through the fallback path and shows that source in the current-weather panel.
