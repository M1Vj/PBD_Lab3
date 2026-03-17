# Responsive Dynamic Weather Dashboard

This repository contains the full submission for Laboratory Activity 3. It starts with a static reference layout, then moves into a React-based dashboard that fetches weather data, adapts across screen sizes, and documents the whole build in the `docs/` folder for instructor review.

## What The Project Shows

- A static weather mockup in [`/Users/vjmabansag/Projects/PBD_Lab3/static.html`](/Users/vjmabansag/Projects/PBD_Lab3/static.html)
- A dynamic React dashboard in [`/Users/vjmabansag/Projects/PBD_Lab3/src/App.jsx`](/Users/vjmabansag/Projects/PBD_Lab3/src/App.jsx)
- A separated API service in [`/Users/vjmabansag/Projects/PBD_Lab3/src/services/weatherApi.js`](/Users/vjmabansag/Projects/PBD_Lab3/src/services/weatherApi.js)
- Responsive layout work and browser-testing evidence in `docs/`

## Tech Stack

- React 19 with functional components
- Vite for local development and production build output
- CSS with responsive breakpoints and theme variables
- OpenWeatherMap as the primary weather source with Open-Meteo as a live fallback
- Vitest and Testing Library for behavior checks

## How To Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create a local `.env` file from `.env.example`:

```bash
cp .env.example .env
```

3. Add your OpenWeather API key:

```bash
VITE_WEATHER_API_KEY=your_actual_openweathermap_key
```

4. Start the development server:

```bash
npm run dev
```

5. Optional verification commands:

```bash
npm test
npm run lint
npm run build
```

## Project Structure

```text
docs/
  part-1-static/
  part-2-react-implementation/
  part-3-responsive-design/
  part-4-api-integration/
  part-5-performance/
  testing/
  reflection/
src/
  assets/
  components/
  hooks/
  services/
  styles/
  test/
  utils/
static.html
.env.example
package.json
```

## Notes For The Reviewer

- If `.env` is missing or the OpenWeather key is not working yet, the UI falls back to live weather data from Open-Meteo instead of using mock data.
- For primary-provider verification, add a valid OpenWeather API key to `.env` before testing.
- The main documentation for explanation, screenshots, and evidence lives in [`/Users/vjmabansag/Projects/PBD_Lab3/docs`](/Users/vjmabansag/Projects/PBD_Lab3/docs).
