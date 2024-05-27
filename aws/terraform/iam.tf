resource "aws_iam_user" "github_actions_user" {
  name = "github-actions-user"
}

resource "aws_iam_user_policy" "github_actions_user_policy" {
  name   = "github-actions-user-policy"
  user   = aws_iam_user.github_actions_user.name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "s3:PutObject",
          "s3:ListBucket",
          "s3:DeleteObject"
        ],
        Resource = [
          "arn:aws:s3:::cbt-gs",
          "arn:aws:s3:::cbt-gs/*"
        ]
      },
      {
        Effect = "Allow",
        Action = [
          "cloudfront:CreateInvalidation"
        ],
        Resource = "arn:aws:cloudfront::058264080517:distribution/E2KM35PRM9321T"
      }
    ]
  })
}

resource "aws_iam_access_key" "github_actions_user_key" {
  user = aws_iam_user.github_actions_user.name
}

output "aws_access_key_id" {
  value     = aws_iam_access_key.github_actions_user_key.id
  sensitive = true
}

output "aws_secret_access_key" {
  value     = aws_iam_access_key.github_actions_user_key.secret
  sensitive = true
}
