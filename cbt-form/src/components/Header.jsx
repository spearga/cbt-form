import React from 'react';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <div className="container">
        <h1>CBT Tracker</h1>
        <button className="toggle-button" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
