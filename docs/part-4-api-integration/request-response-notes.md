# Part 4: Request and Response Notes

## Request process

1. The user submits a city name
2. The service checks local cache first
3. If no fresh cache exists, the service calls the current-weather endpoint
4. The service then calls the forecast endpoint
5. The service normalizes both responses before the UI receives them

## Response normalization

The raw API payload is not passed straight into components. Instead, the service converts it into a safer shape:

- missing text becomes readable fallback text
- missing number fields become `N/A`
- icon codes become display symbols
- forecast entries are reduced to one representative entry per day

## Why normalization is important

This prevents component crashes and keeps the UI simpler. The React components can assume they are receiving display-ready data.
