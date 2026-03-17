# Part 2: State Management

The project uses React state in one top-level component so the weather flow stays predictable.

## Main state values

- `city`: the current text inside the search field
- `weatherData`: the normalized current weather object
- `forecast`: the normalized 5-day forecast list
- `isLoading`: controls the loading panel while a request is in progress
- `error`: stores the current request error message
- `validationMessage`: stores form-level validation feedback
- `theme`: stores the selected light or dark theme
- `hasSearched`: distinguishes the empty state from later request states
- `lastUpdated`: stores the display text for when the weather data was last prepared
- `dataSource`: shows whether the dashboard is using the primary live provider or the fallback live provider
- `dataProvider`: stores the provider name shown in the current-weather source chip

## Why the state lives in `App.jsx`

The same state affects several parts of the interface at once:

- the search panel
- the loading panel
- the error panel
- the weather card
- the forecast section

Keeping that state in one parent component prevents duplicated logic and avoids components disagreeing about what the current request status is.
