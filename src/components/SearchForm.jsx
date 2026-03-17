export default function SearchForm({ city, setCity, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <section className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Search for a city..." 
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </section>
  );
}