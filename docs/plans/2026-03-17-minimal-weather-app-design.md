# Minimal Weather App Design

**Goal:** Add a second, smaller React weather app that covers the laboratory requirements without replacing or changing the current dashboard.

**Context:** The existing app already satisfies the feature set, but it is split across multiple components and presentation files. The user wants an additional version that is easier to print and review while remaining fully functional.

## Chosen Approach

Add a separate Vite entry page at `minimal.html` and mount a new React tree from `src/minimal/main.jsx`. The new UI will live in one compact component, reuse the existing `fetchWeatherData` service, and keep the current `index.html` dashboard untouched.

## Why This Approach

- It preserves the current submission and avoids regression risk in the existing app.
- It still satisfies the framework requirement because the added version is also a React app.
- It keeps the new code small by reusing the existing API, caching, and fallback logic instead of rewriting networking.

## Required Behaviors Covered

- City search input
- Current weather display
- Weather icon display
- Five-day forecast
- Loading state
- Error handling for invalid city and network failure
- Theme toggle
- Responsive layout for mobile, tablet, and desktop

## Performance Optimizations Covered

- `localStorage` weather caching already provided by `src/services/weatherApi.js`
- Production CSS/JS minification provided by the Vite build
- Asset-light UI that avoids large images and reuses emoji icons instead of additional image requests

## Files To Add

- `minimal.html`
- `src/minimal/main.jsx`
- `src/minimal/MinimalApp.jsx`
- `src/minimal/minimal.css`
- `src/test/minimal-app.test.jsx`

## Verification Plan

- Run targeted test for the new app
- Run full test suite
- Run lint
- Run build
- Launch Vite and verify the new `/minimal.html` page renders and works
