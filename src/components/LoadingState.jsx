export default function LoadingState({ city }) {
  return (
    <section className="status-panel loading-panel" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      <div>
        <p className="section-tag">Loading</p>
        <h2>Fetching the latest weather details</h2>
        <p>
          {city
            ? `Checking conditions for ${city.trim()}.`
            : 'Preparing the weather dashboard.'}
        </p>
      </div>
    </section>
  );
}
