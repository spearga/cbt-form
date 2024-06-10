# Define the IAM role for Lambda
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_example_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Define the custom IAM policy for S3 access
resource "aws_iam_policy" "lambda_s3_policy" {
  name        = "lambda_s3_policy"
  description = "Policy for Lambda to access S3"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ],
        Resource = [
          "arn:aws:s3:::cbt-gs",                # Replace with your actual bucket name
          "arn:aws:s3:::cbt-gs/Responces/*",    # Replace with your actual bucket name and prefix
          "arn:aws:s3:::cbt-gs/form-data/*"     # Replace with your actual bucket name and prefix
        ]
      }
    ]
  })
}

# Attach the custom policy to the Lambda execution role
resource "aws_iam_role_policy_attachment" "lambda_attach_s3_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_s3_policy.arn
}

# Define the Lambda function using S3
resource "aws_lambda_function" "example" {
  function_name = "ServerlessExample"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "main.handler"
  runtime       = "nodejs18.x"
  s3_bucket     = "cbt-gs"
  s3_key        = "v1.0.4/lambda.zip"
}

