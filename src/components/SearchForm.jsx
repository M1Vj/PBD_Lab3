export default function SearchForm({
  city,
  onCityChange,
  onSearch,
  isLoading,
  validationMessage,
}) {
  const feedbackId = validationMessage ? 'city-feedback' : undefined;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSearch(city);
  };

  return (
    <section className="search-panel" aria-labelledby="search-panel-title">
      <div className="search-panel-copy">
        <p className="section-tag">Search Panel</p>
        <h2 id="search-panel-title">Check a city in seconds</h2>
        <p>
          Enter a city or municipality name to load current conditions and a
          five-day forecast.
        </p>
      </div>

      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <div className="field-group">
          <label className="field-label" htmlFor="city-search">
            City or municipality
          </label>
          <input
            id="city-search"
            type="text"
            placeholder="Example: Manila, Tokyo, or London"
            className="search-input"
            value={city}
            onChange={(event) => onCityChange(event.target.value)}
            aria-describedby={feedbackId}
            aria-invalid={validationMessage ? 'true' : 'false'}
            autoComplete="off"
          />
          <p className="field-help">
            The app trims extra spaces and only sends the request when you
            submit the form.
          </p>
          {validationMessage ? (
            <p id="city-feedback" className="field-error" role="alert">
              {validationMessage}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="search-button"
          disabled={isLoading}
          aria-label="Search weather"
        >
          {isLoading ? 'Checking weather...' : 'Search weather'}
        </button>
      </form>
    </section>
  );
}
