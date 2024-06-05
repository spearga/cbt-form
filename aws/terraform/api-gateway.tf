# Create an API Gateway REST API
resource "aws_api_gateway_rest_api" "example_api" {
  name        = "ExampleAPI"
  description = "API for submitting and getting form data"
}

# Create a resource for form data
resource "aws_api_gateway_resource" "form_data" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  parent_id   = aws_api_gateway_rest_api.example_api.root_resource_id
  path_part   = "form-data"
}

# Create a POST method for submitting form data
resource "aws_api_gateway_method" "post_form_data" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.form_data.id
  http_method   = "POST"
  authorization = "NONE"
}

# Create an integration for the POST method
resource "aws_api_gateway_integration" "post_form_data_integration" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.post_form_data.http_method
  type        = "AWS_PROXY"
  integration_http_method = "POST"
  uri         = aws_lambda_function.example.invoke_arn
}

# Create a GET method for retrieving form data
resource "aws_api_gateway_method" "get_form_data" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.form_data.id
  http_method   = "GET"
  authorization = "NONE"
}

# Create an integration for the GET method
resource "aws_api_gateway_integration" "get_form_data_integration" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.get_form_data.http_method
  type        = "AWS_PROXY"
  integration_http_method = "POST"
  uri         = aws_lambda_function.example.invoke_arn
}

# Deploy the API
resource "aws_api_gateway_deployment" "example_api_deployment" {
  depends_on = [
    aws_api_gateway_method.post_form_data,
    aws_api_gateway_integration.post_form_data_integration,
    aws_api_gateway_method.get_form_data,
    aws_api_gateway_integration.get_form_data_integration,
  ]

  rest_api_id = aws_api_gateway_rest_api.example_api.id
  stage_name  = "prod"
}

# Create a Lambda permission to allow API Gateway to invoke the Lambda function
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.example.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.example_api.execution_arn}/*/*"
}