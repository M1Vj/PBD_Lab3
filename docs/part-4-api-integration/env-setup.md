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
- The same project can run in demo mode without exposing a real secret

## Reviewer note

If `.env` is not present, the dashboard falls back to clearly-labeled demo data instead of failing with a blank screen.

If the API key is newly created in OpenWeatherMap, it may also require email confirmation before live requests start succeeding. In this workspace, the key existed locally, but the provider still reported it as invalid until account confirmation is completed.
