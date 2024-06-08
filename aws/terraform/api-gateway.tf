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
  rest_api_id             = aws_api_gateway_rest_api.example_api.id
  resource_id             = aws_api_gateway_resource.form_data.id
  http_method             = aws_api_gateway_method.post_form_data.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = aws_lambda_function.example.invoke_arn
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
  rest_api_id             = aws_api_gateway_rest_api.example_api.id
  resource_id             = aws_api_gateway_resource.form_data.id
  http_method             = aws_api_gateway_method.get_form_data.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = aws_lambda_function.example.invoke_arn
}

# Add OPTIONS method for CORS preflight
resource "aws_api_gateway_method" "options_form_data" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.form_data.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# Mock integration for OPTIONS method
resource "aws_api_gateway_integration" "options_form_data_integration" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.options_form_data.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = jsonencode(
      {
        statusCode = 200
      }
    )
  }
}

# Method response for OPTIONS
resource "aws_api_gateway_method_response" "options_200" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.options_form_data.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# Integration response for OPTIONS
resource "aws_api_gateway_integration_response" "options_200" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.options_form_data.http_method
  status_code = aws_api_gateway_method_response.options_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

# Method response for POST
resource "aws_api_gateway_method_response" "post_200" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.post_form_data.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true,
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true
  }
}

# Integration response for POST
resource "aws_api_gateway_integration_response" "post_200" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.post_form_data.http_method
  status_code = aws_api_gateway_method_response.post_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = "'*'",
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
  }
}

# Method response for GET
resource "aws_api_gateway_method_response" "get_200" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.get_form_data.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true,
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true
  }
}

# Integration response for GET
resource "aws_api_gateway_integration_response" "get_200" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  resource_id = aws_api_gateway_resource.form_data.id
  http_method = aws_api_gateway_method.get_form_data.http_method
  status_code = aws_api_gateway_method_response.get_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = "'*'",
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,OPTIONS'"
  }
}

# Deploy the API
resource "aws_api_gateway_deployment" "example_api_deployment" {
  depends_on = [
    aws_api_gateway_method.post_form_data,
    aws_api_gateway_integration.post_form_data_integration,
    aws_api_gateway_method.get_form_data,
    aws_api_gateway_integration.get_form_data_integration,
    aws_api_gateway_method.options_form_data,
    aws_api_gateway_integration.options_form_data_integration
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
  source_arn    = "arn:aws:execute-api:eu-west-1:058264080517:iliasoxlx7/*/*"
}
