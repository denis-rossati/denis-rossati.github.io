import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import magnifier from '../icons/magnifying-glass.png';
import user from '../icons/profile.png';

import './styles/SearchBar.css';

export default function searchBar({ searchFunction }) {
  const [inputValue, setInputValue] = useState('');

  const changeInputState = (value) => setInputValue(value);

  return (
    <nav>
      <Link to="/profile">
        <img src={user} alt="user icon" />
      </Link>
      <input
        id="search-box"
        name="search-box"
        type="text"
        placeholder="Insert your search here..."
        onChange={({ target: { value } }) => changeInputState(value)}
      />
      <button
        id="search-button"
        name="search-button"
        type="button"
        onClick={() => searchFunction(inputValue)}
      >
        <img
          src={magnifier}
          alt="Magnifier frame"
        />
      </button>
    </nav>
  );
}
