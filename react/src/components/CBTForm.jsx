import React, { useState } from 'react';
import InputField from './InputField';
import Modal from './Modal'; // Assuming you have a Modal component
import './css/CBTForm.css';

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
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.situation.trim()) newErrors.situation = "Situation is required.";
    if (!form.emotionLabel.trim()) newErrors.emotionLabel = "Emotion/Mood label is required.";
    if (form.emotionValue === '' || form.emotionValue < 0 || form.emotionValue > 100) {
      newErrors.emotionValue = "Please rate emotions between 0 and 100.";
    }
    if (!form.physicalSensations.trim()) newErrors.physicalSensations = "Physical sensations are required.";
    if (!form.unhelpfulThoughts.trim()) newErrors.unhelpfulThoughts = "Unhelpful thoughts are required.";
    if (!form.alternativeThoughts.trim()) newErrors.alternativeThoughts = "Alternative thoughts are required.";
    if (!form.actions.trim()) newErrors.actions = "Actions are required.";
    if (!form.bestResponse.trim()) newErrors.bestResponse = "Best response is required.";
    if (form.reRateEmotion === '' || form.reRateEmotion < 0 || form.reRateEmotion > 100) {
      newErrors.reRateEmotion = "Please re-rate emotions between 0 and 100.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmissionStatus(null);
    } else {
      try {
        const response = await fetch('https://iliasoxlx7.execute-api.eu-west-1.amazonaws.com/prod/form-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });
        if (response.ok) {
          setSubmissionStatus('Success');
          setForm({
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
        } else {
          setSubmissionStatus('Error');
        }
      } catch {
        setSubmissionStatus('Error');
      }
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h2>Cognitive Behavioral Therapy (CBT) Form</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Situation"
          name="situation"
          value={form.situation}
          onChange={handleChange}
          error={errors.situation}
        />
        <div className="emotion-row">
          <InputField
            label="Emotions / Moods"
            name="emotionLabel"
            value={form.emotionLabel}
            onChange={handleChange}
            error={errors.emotionLabel}
          />
          <InputField
            label="Rate (0 – 100%)"
            type="number"
            name="emotionValue"
            value={form.emotionValue}
            onChange={handleChange}
            min="0"
            max="100"
            error={errors.emotionValue}
          />
        </div>
        <InputField
          label="Physical Sensations"
          name="physicalSensations"
          value={form.physicalSensations}
          onChange={handleChange}
          error={errors.physicalSensations}
        />
        <InputField
          label="Unhelpful Thoughts / Images"
          name="unhelpfulThoughts"
          value={form.unhelpfulThoughts}
          onChange={handleChange}
          error={errors.unhelpfulThoughts}
        />
        <InputField
          label="Alternative / Realistic Thoughts"
          name="alternativeThoughts"
          value={form.alternativeThoughts}
          onChange={handleChange}
          error={errors.alternativeThoughts}
        />
        <InputField
          label="What I did / What I could do / Defusion technique"
          name="actions"
          value={form.actions}
          onChange={handleChange}
          error={errors.actions}
        />
        <InputField
          label="What’s the best response?"
          name="bestResponse"
          value={form.bestResponse}
          onChange={handleChange}
          error={errors.bestResponse}
        />
        <InputField
          label="Re-rate Emotion (0 – 100%)"
          type="number"
          name="reRateEmotion"
          value={form.reRateEmotion}
          onChange={handleChange}
          min="0"
          max="100"
          error={errors.reRateEmotion}
        />
        <button type="submit">Submit</button>
      </form>
      {showModal && (
        <Modal closeModal={closeModal} submissionStatus={submissionStatus} />
      )}
    </div>
  );
};

export default CBTForm;
