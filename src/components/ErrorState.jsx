export default function ErrorState({ message, onRetry, hasRetainedResults }) {
  return (
    <section className="status-panel error-panel" role="alert">
      <div>
        <p className="section-tag">Request status</p>
        <h2>{hasRetainedResults ? 'Could not refresh the forecast' : 'Weather lookup failed'}</h2>
        <p>{message}</p>
      </div>

      {onRetry ? (
        <button type="button" className="secondary-button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </section>
  );
}
