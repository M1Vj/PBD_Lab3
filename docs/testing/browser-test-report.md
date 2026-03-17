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
- forecast cards stay inside the viewport on mobile, tablet, and desktop widths
- Firefox and WebKit both rendered the dashboard shell correctly

## Screenshot evidence

- `screenshots/firefox-home.png`
- `screenshots/webkit-home.png`

## Current known limitation

This workspace contained an OpenWeather key in `.env`, but the provider still rejected it because the related account had not finished email confirmation. Because of that:

- Chromium was used for the full dashboard interaction flow
- Demo mode was used for success-state screenshots
- Real invalid-key handling was also captured as evidence

## Suggested follow-up check after OpenWeather confirmation

- search a valid city and capture a live-data screenshot
- search an invalid city and capture the error state
- rerun the same flow in Firefox, Edge, or Safari and replace the shell-only screenshots with full result-state screenshots
