# Reflection Answers

## 1. Why was React selected for this project?

React was selected because the interface depends on changing data and repeated user interaction. It is easier to manage a search form, request status, theme state, and weather results when the UI updates from state instead of manual DOM changes.

## 2. What was the most difficult part of integrating the API?

The hardest part was not the fetch call itself. The harder part was cleaning the response so the interface would stay stable even when some fields were missing. Forecast data also arrives in 3-hour blocks, so it had to be simplified into a cleaner 5-day view.

## 3. How did responsive design improve usability?

Responsive design made the same dashboard usable on phone, tablet, and desktop without horizontal scrolling. The search controls stay touch-friendly, and the forecast becomes easier to compare as more space becomes available.

## 4. Which optimization had the greatest impact and why?

The local cache had the biggest practical impact. It cuts repeat API requests for the same city, which makes the app feel faster and also reduces unnecessary network usage.
