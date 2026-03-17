# Responsive Dynamic Weather Dashboard

## Project Description
A responsive, dual-theme weather dashboard built iteratively from a static HTML layout into a fully dynamic React architecture utilizing standard state hooks, local caching mechanisms, and external API requests. Built specifically to satisfy Laboratory Requirements for a complete, production-lite structural exercise without utilizing any cloud databases.

## Technology Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Standard CSS (Flexbox/Grid variables)
- **API**: External provider (e.g., OpenWeatherMap compatible) via `fetch`

## Setup & Running Locally
1. Clone the repository natively.
2. Install dependencies: `npm install`
3. Duplicate `.env.example` into `.env` and fill the API key.
   ```
   VITE_WEATHER_API_KEY=your_key_here
   ```
4. Run locally: `npm run dev`
5. Create production bundle: `npm run build`

## Project Structure Overview
- **`src/components/`**: Clean UI boundaries (`SearchForm`, `WeatherCard`, `ThemeToggle`).
- **`src/services/`**: Abstracted API logic and formatting (`weatherApi.js`).
- **`src/styles/`**: Responsive rules, `.dark`/`.light` globals.
- **`docs/`**: Comprehensive markdown documentation matching step-by-step implementations.
