# Part 2: Implementation Notes

## Important implementation choices

- The app trims extra spaces before searching.
- Empty submit attempts show a visible validation message instead of silently doing nothing.
- Existing weather results stay visible if a refresh fails, so the interface remains usable.
- The API service returns already-formatted values like pressure, humidity, and day labels.
- Theme preference is stored in `localStorage` so the selected mode survives refreshes in the same browser.

## Accessibility notes

- The input uses a visible label instead of relying only on placeholder text.
- Validation and request errors use live feedback so screen readers can announce them.
- Buttons keep readable text and keyboard focus styling.

## Reviewer note

These choices were made to satisfy both the functional lab requirements and the usability expectations of a real frontend application.
