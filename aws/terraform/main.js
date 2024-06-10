const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);

    // Extract form data
    const formData = {
      situation: requestBody.situation,
      emotionLabel: requestBody.emotionLabel,
      emotionValue: requestBody.emotionValue,
      physicalSensations: requestBody.physicalSensations,
      unhelpfulThoughts: requestBody.unhelpfulThoughts,
      alternativeThoughts: requestBody.alternativeThoughts,
      actions: requestBody.actions,
      bestResponse: requestBody.bestResponse,
      reRateEmotion: requestBody.reRateEmotion
    };

    // Define S3 bucket and key
    const bucketName = 'cbt-gs'; // Replace with your bucket name
    const key = `form-data/${Date.now()}.json`; // Unique key for each form submission

    // Prepare the parameters for the S3 putObject call
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: JSON.stringify(formData),
      ContentType: 'application/json'
    };

    // Save the form data to S3
    await s3.putObject(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3001",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
      },
      body: JSON.stringify({ message: 'Form data saved successfully' })
    };
  } catch (error) {
    console.error('Error saving form data to S3:', error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3001",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
      },
      body: JSON.stringify({ message: 'Failed to save form data', error: error.message })
    };
  }
};
