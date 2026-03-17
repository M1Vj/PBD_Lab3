# Error Handling
We've incorporated functional UI feedback based directly on API response states:
- **404 Errors**: Handled specifically to let the user know their searched city was invalid.
- **Generic Fallback**: If the fetch fails to execute (e.g. CORS block, token issue, or offline client), we display a readable "Failed to fetch weather data." error via the `ErrorState` component instead of crashing the UI tree.
