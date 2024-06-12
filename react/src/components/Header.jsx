import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header>
      <h1>CBT Tools</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
};

export default Header;

