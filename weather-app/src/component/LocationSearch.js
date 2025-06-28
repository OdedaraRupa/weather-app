import React, { useState } from "react";

const LocationSearch = ({
  searchInput,
  setSearchInput,
  handleSearch,
  suggestions,
  handleInputChange,
  fetchSuggestion,
}) => {
  return (
    <>
      <form  className="layout-row">
        <input
          value={searchInput}
          onChange={handleInputChange}
          type="text"
          placeholder="Search.."
        />
       
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="suggestion-item px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => fetchSuggestion(item)}
            >
              {item.name}, {item.state ? item.state + ", " : ""}
              {item.country}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default LocationSearch;
