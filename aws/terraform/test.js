const AWS = require('aws-sdk');

// Set the region
AWS.config.update({ region: 'eu-west-1' }); // Replace with your region

const lambda = new AWS.Lambda();

const payload = {
  body: JSON.stringify({
    situation: "A situation description",
    emotionLabel: "happy",
    emotionValue: 5,
    physicalSensations: "None",
    unhelpfulThoughts: "No unhelpful thoughts",
    alternativeThoughts: "Positive thinking",
    actions: "Took a walk",
    bestResponse: "Stay calm",
    reRateEmotion: 3
  })
};

const params = {
  FunctionName: 'ServerlessExample', // Replace with your function name
  Payload: JSON.stringify(payload)
};

lambda.invoke(params, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Function response:', data);
  }
});

