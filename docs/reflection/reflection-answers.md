# Reflection Answers

**1. Why was React selected for this project?**
React was selected because its component-based architecture directly addresses the problem of scalability seen in the static Part 1. Constructing reusable units like `WeatherCard` and `ForecastSection` and wiring them to a top-level state via `App.jsx` naturally allowed real-time updates and seamless data fetching without rigid DOM manipulation or full page refreshes.

**2. What was the most difficult part of integrating the API?**
The complexity arose from manipulating two distinct data structures (the `current` API format and the `forecast` list array). OpenWeatherMap returns forecasts every 3 hours natively, which meant writing logic in `weatherApi.js` to effectively filter these down into a 5-day format that only extracts the noontime values required for the layout.

**3. How did responsive design improve usability?**
It eliminated horizontal scrolling entirely. Moving from a broad Desktop layout (where the 5 forecast cards fit perfectly alongside each other) directly to a vertical stacked list on Mobile guaranteed that the text sizing and hit targets (like the search button and theme toggle) remained highly accessible without the user needing to pinch and zoom.

**4. Which optimization had the greatest impact and why?**
The LocalStorage Caching block inside `weatherApi.js` provided the largest impact visually and economically. Because weather metrics do not change minute by minute, saving the parsed `finalData` string to local storage with a 10-minute expiry completely mitigated overlapping API pinging if users navigated or rapid-searched. It prevents API rate-limiting thresholds and makes the load time instant.
