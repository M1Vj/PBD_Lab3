# Endpoint Reference
We interface with two primary OpenWeatherMap REST endpoints:

1. **Current Weather Data**: `https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric`
   - Yields the current conditions, humidity, speed, and real-time icon id mappings.
2. **5-Day / 3-Hour Forecast Data**: `https://api.openweathermap.org/data/2.5/forecast?q={CITY}&appid={API_KEY}&units=metric`
   - Yields a list of 40 timestamps. Our logic filters this data explicitly to grab entries at 12:00:00 to provide a consistent daily snapshot.
