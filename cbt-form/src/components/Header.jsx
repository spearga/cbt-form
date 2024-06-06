import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header>
      <h1>CBT Tools</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/thinking-errors">Unhelpful Thinking Habits</Link>
          </li>
          <li>
            <Link to="/cbt-form">CBT Form</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

