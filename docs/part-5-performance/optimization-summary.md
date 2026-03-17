# Part 5: Optimization Summary

The final project uses these practical optimization techniques:

1. LocalStorage cache in the weather service
   - repeated searches for the same city within 10 minutes can reuse cached data
   - this reduces repeated API requests

2. Presentation-level memoization
   - `WeatherCard.jsx` and `ForecastSection.jsx` are wrapped with `React.memo`
   - this avoids unnecessary re-rendering when unrelated state changes

3. Submit-only request flow
   - the app does not fetch on every keypress
   - requests happen only when the form is submitted

4. Production build minification
   - the Vite production build outputs compressed assets automatically

5. Lazy-loaded decorative image
   - the empty-state illustration uses `loading="lazy"`
   - this prevents the illustration from competing with the first interactive render
