// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/thinking-errors">Thinking Errors</Link></li>
        <li><Link to="/cbt-form">CBT Form</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
