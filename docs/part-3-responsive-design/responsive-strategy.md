# Part 3: Responsive Strategy

The dashboard uses a mobile-first layout. Small screens get stacked sections first, then the layout expands into columns as more space becomes available.

## What changes by screen size

- Mobile: single-column layout, stacked form controls, single-column forecast cards
- Tablet: wider hero section, split search row, 2-column forecast layout
- Desktop: two-column results area and 5-column forecast grid

## Layout tools used

- CSS Grid for the hero, results layout, and forecast layout
- Flexbox for small internal alignments such as buttons and status panels

## Why this strategy works

The current weather card is the highest-priority content, so it stays easy to read on all screen sizes. The forecast expands only when there is enough room for comparison.
