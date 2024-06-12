// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ThinkingErrors from './components/ThinkingErrors';
import CBTForm from './components/CBTForm';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Sidebar />
        <div className="content">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<>
                <h1>Welcome to CBT Tools</h1>
              </>} />
              <Route path="/thinking-errors" element={<ThinkingErrors />} />
              <Route path="/cbt-form" element={<CBTForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
