import React from 'react';


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

