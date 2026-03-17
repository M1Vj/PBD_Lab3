# Part 4: Endpoint Reference

The app uses these HTTPS endpoints:

1. Current weather

```text
https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric
```

2. Five-day forecast

```text
https://api.openweathermap.org/data/2.5/forecast?q={CITY}&appid={API_KEY}&units=metric
```

## Required query parameters

- `q`: city name
- `appid`: API key
- `units=metric`: makes temperatures and wind-related values easier to present for this lab

## How the forecast is simplified

The forecast endpoint returns 3-hour entries. The app filters those entries and keeps midday snapshots so the UI can display a clean 5-day forecast instead of 40 raw time blocks.
