import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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
        <main className="main-content">
          <Switch>
            <Route path="/" exact>
              <h1>Welcome to CBT Tools</h1>
              <p>Select a page from the navigation above.</p>
            </Route>
            <Route path="/thinking-errors" component={ThinkingErrors} />
            <Route path="/cbt-form" component={CBTForm} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;