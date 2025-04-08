import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onRefresh, currentCity }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
      {currentCity && (
        <button 
          type="button" 
          className="refresh-btn"
          onClick={onRefresh}
        >
          Refresh
        </button>
      )}
    </form>
  );
};

export default SearchBar;