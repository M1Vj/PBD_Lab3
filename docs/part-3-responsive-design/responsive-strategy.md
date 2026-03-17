# Responsive Strategy
The application explicitly uses modern CSS Grid and Flexbox within `src/styles/App.css` to build an adaptable layout.
Breakpoints established via `@media` tags enforce visual shifts when on limited width screens.

- **Desktop (>768px)**: Forecast displays in a single row taking full horizontal space sequentially.
- **Tablet (<768px)**: Forecast items wrap into a grid pattern where items stretch across `calc(33.333% - 1rem)`.
- **Mobile (<480px)**: Content stacks sequentially. Forms stack perfectly. The weather card details rearrange into vertical rows instead of a horizontal stretch.
