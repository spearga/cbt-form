resource "aws_iam_role" "lambda_exec" {
  name = "serverless_example_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

  inline_policy {
    name = "s3-access-policy"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::cbt-gs/v1.0.2/lambda.zip"
    }
  ]
}
EOF
  }
}

resource "aws_lambda_function" "example" {
  function_name = "ServerlessExample"
  s3_bucket     = "cbt-gs"
  s3_key        = "v1.0.2/lambda.zip"
  handler       = "main.handler"
  runtime       = "nodejs18.x"
  role          = aws_iam_role.lambda_exec.arn
}
