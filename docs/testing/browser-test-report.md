# Browser Test Report

## Browsers checked

- Chromium via Playwright MCP for the full interaction flow
- Firefox via Playwright CLI screenshot capture
- WebKit via Playwright CLI screenshot capture

## What was verified in the current workspace

- empty state renders on first load
- labeled search input and visible helper text
- empty submit shows validation
- theme toggle updates the full interface
- the header stays compact and does not dominate the page
- the five-day forecast stays below the current weather block
- forecast cards stay inside the viewport on mobile, tablet, and desktop widths
- Firefox and WebKit both rendered the dashboard shell correctly

## Screenshot evidence

- `screenshots/firefox-home.png`
- `screenshots/webkit-home.png`

## Provider behavior in the current workspace

- When OpenWeatherMap responds normally, the result chip shows `OpenWeatherMap live data`
- When the OpenWeather key is missing or rejected, the app falls back to `Open-Meteo live fallback`
- This keeps the project on real weather data instead of switching to mock content
