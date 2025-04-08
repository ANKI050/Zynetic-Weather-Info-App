import React from 'react';
import './RecentSearches.css';

const RecentSearches = ({ searches, onSearch, isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {isOpen && (
        <>
          <h3>Recent Searches</h3>
          <ul>
            {searches.length > 0 ? (
              searches.map((city, index) => (
                <li key={index} onClick={() => onSearch(city)}>
                  {city}
                </li>
              ))
            ) : (
              <li className="empty">No recent searches</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default RecentSearches;
