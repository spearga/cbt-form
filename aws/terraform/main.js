const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = 'cbt-gs'; // Replace with your bucket name
  const formDataPrefix = 'form-data/'; // S3 prefix for form data

  try {
    if (event.httpMethod === 'POST') {
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
      const key = `${formDataPrefix}${Date.now()}.json`; // Unique key for each form submission

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
        body: JSON.stringify({ message: 'Form data saved successfully' })
      };
    } else if (event.httpMethod === 'GET') {
      // List objects in the form data prefix
      const listParams = {
        Bucket: bucketName,
        Prefix: formDataPrefix
      };

      const data = await s3.listObjectsV2(listParams).promise();
      const objects = data.Contents.map((obj) => obj.Key);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form data retrieved successfully', data: objects })
      };
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method not allowed' })
      };
    }
  } catch (error) {
    console.error('Error handling request:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to handle request', error: error.message })
    };
  }
};

