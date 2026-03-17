# Part 4: Error Handling

The app handles several request-related problems in plain language:

- Empty input: shows validation under the city field
- Invalid city: shows a readable message telling the user to check the spelling
- Missing or invalid API key: explains that the local `.env` file needs attention
- Network failure: asks the user to check the connection and try again
- Unexpected response: prevents the UI from crashing by using safe fallback values

## Why this matters

The interface should not break just because the API response is incomplete or because a request fails. The goal is to keep the app understandable even when the data source has a problem.

## Screenshot evidence

- `screenshots/loading-state.png`
- `screenshots/error-state.png`
