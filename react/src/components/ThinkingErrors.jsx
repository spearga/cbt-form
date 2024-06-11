import React from 'react';

const unhelpfulThinkingHabits = [
  {
    name: "All-or-Nothing Thinking",
    description: "Viewing situations in black-and-white terms, without recognizing any middle ground."
  },
  {
    name: "Overgeneralization",
    description: "Making broad interpretations from a single or a few events."
  },
  {
    name: "Mental Filter",
    description: "Focusing exclusively on negative aspects of a situation while ignoring positive ones."
  },
  {
    name: "Disqualifying the Positive",
    description: "Rejecting positive experiences by insisting they 'don’t count' for some reason or another."
  },
  {
    name: "Jumping to Conclusions",
    description: "Making negative interpretations without definite facts to support them.",
    subtypes: [
      {
        name: "Mind Reading",
        description: "Assuming others are thinking negatively about you without any evidence."
      },
      {
        name: "Fortune Telling",
        description: "Predicting that things will turn out badly without any basis."
      }
    ]
  },
  {
    name: "Magnification (Catastrophizing) or Minimization",
    description: "Blowing things out of proportion or minimizing their importance."
  },
  {
    name: "Emotional Reasoning",
    description: "Assuming that because you feel a certain way, it must be true."
  },
  {
    name: "Should Statements",
    description: "Using 'should,' 'must,' or 'ought to' statements that set unrealistic expectations for oneself or others."
  },
  {
    name: "Labeling and Mislabeling",
    description: "Assigning labels to oneself or others based on a single event or behavior."
  },
  {
    name: "Personalization",
    description: "Taking responsibility for events outside of your control or blaming oneself for negative outcomes."
  }
];

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  title: {
    textAlign: 'center',
    color: '#333'
  },
  habit: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '15px',
    marginBottom: '15px'
  },
  habitTitle: {
    color: '#0056b3'
  },
  habitDescription: {
    color: '#555'
  },
  subtype: {
    marginLeft: '20px',
    padding: '10px',
    backgroundColor: '#f0f8ff',
    borderRadius: '5px'
  },
  subtypeTitle: {
    color: '#004085'
  },
  subtypeDescription: {
    color: '#555'
  }
};

const ThinkingHabit = ({ habit }) => (
  <div style={styles.habit}>
    <h3 style={styles.habitTitle}>{habit.name}</h3>
    <p style={styles.habitDescription}>{habit.description}</p>
    {habit.subtypes && (
      <div>
        {habit.subtypes.map((subtype, index) => (
          <div key={index} style={styles.subtype}>
            <h4 style={styles.subtypeTitle}>{subtype.name}</h4>
            <p style={styles.subtypeDescription}>{subtype.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ThinkingErrors = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>Unhelpful Thinking Habits</h1>
    {unhelpfulThinkingHabits.map((habit, index) => (
      <ThinkingHabit key={index} habit={habit} />
    ))}
  </div>
);

export default ThinkingErrors;

