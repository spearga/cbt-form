import React, { useState, useEffect } from 'react';
import './App.css';

const CBTForm = () => {
  const [form, setForm] = useState({
    situation: '',
    emotionLabel: '',
    emotionValue: '',
    physicalSensations: '',
    unhelpfulThoughts: '',
    alternativeThoughts: '',
    actions: '',
    bestResponse: '',
    reRateEmotion: ''
  });

  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (form.emotionValue < 0 || form.emotionValue > 100 || isNaN(form.emotionValue)) {
      newErrors.emotionValue = "Please rate emotions between 0 and 100.";
    }

    if (form.reRateEmotion < 0 || form.reRateEmotion > 100 || isNaN(form.reRateEmotion)) {
      newErrors.reRateEmotion = "Please re-rate emotions between 0 and 100.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted:', form);
      // Handle form submission, e.g., send it to an API
    }
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>CBT Tracker</h1>
          <button className="toggle-button" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <h2>Cognitive Behavioral Therapy (CBT) Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Situation:
                <input
                  type="text"
                  name="situation"
                  value={form.situation}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="emotion-row">
              <label>
                Emotions / Moods:
                <input
                  type="text"
                  name="emotionLabel"
                  value={form.emotionLabel}
                  onChange={handleChange}
                />
              </label>
              <label>
                Rate (0 – 100%):
                <input
                  type="number"
                  name="emotionValue"
                  value={form.emotionValue}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
                {errors.emotionValue && <p className="error">{errors.emotionValue}</p>}
              </label>
            </div>
            <div>
              <label>
                Physical Sensations:
                <input
                  type="text"
                  name="physicalSensations"
                  value={form.physicalSensations}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Unhelpful Thoughts / Images:
                <input
                  type="text"
                  name="unhelpfulThoughts"
                  value={form.unhelpfulThoughts}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Alternative / Realistic Thoughts:
                <input
                  type="text"
                  name="alternativeThoughts"
                  value={form.alternativeThoughts}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                What I did / What I could do / Defusion technique:
                <input
                  type="text"
                  name="actions"
                  value={form.actions}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                What’s the best response?:
                <input
                  type="text"
                  name="bestResponse"
                  value={form.bestResponse}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Re-rate Emotion 0-100%:
                <input
                  type="number"
                  name="reRateEmotion"
                  value={form.reRateEmotion}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
                {errors.reRateEmotion && <p className="error">{errors.reRateEmotion}</p>}
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 CBT Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CBTForm;

