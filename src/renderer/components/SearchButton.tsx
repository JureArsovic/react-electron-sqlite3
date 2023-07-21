import React, { useState } from 'react';
import './SearchButton.css';

const SearchButton = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Open a new browser window/tab with the search query
    window.open(`https://scholar.google.si/scholar?q=${query}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter search query"
          className="search-bar"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchButton;