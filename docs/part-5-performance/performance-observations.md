# Part 5: Performance Observations

## Measured build output

Latest production build output:

- `dist/assets/hero-5sT3BiRD.png`: `44.91 kB`
- `dist/assets/index-BX7GECGg.css`: `9.13 kB` (`2.54 kB` gzip)
- `dist/assets/index-DQm0r2dt.js`: `204.65 kB` (`64.43 kB` gzip)

## Observations

- The asset sizes are reasonable for a lab-scale React dashboard
- The current weather and forecast panels render immediately when cached data is available
- The dashboard avoids request spam because it only fetches on submit and reuses cached entries for repeat searches

## Reviewer note

This project does not aim for extreme bundle-size optimization. The goal is practical frontend optimization that is easy to explain and clearly visible in the codebase.
