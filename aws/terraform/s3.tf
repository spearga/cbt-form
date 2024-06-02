# S3 Bucket Configuration
resource "aws_s3_bucket" "cbt_gs" {
  bucket = "cbt-gs"
}

resource "aws_s3_bucket_website_configuration" "cbt_gs" {
  bucket = aws_s3_bucket.cbt_gs.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_versioning" "cbt_gs" {
  bucket = aws_s3_bucket.cbt_gs.bucket

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "cbt_gs" {
  bucket = aws_s3_bucket.cbt_gs.id

  block_public_acls   = false
  block_public_policy = false
  ignore_public_acls  = false
  restrict_public_buckets = false
}

data "aws_iam_policy_document" "bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.cbt_gs.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.cbt_gs.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "cbt_gs_policy" {
  bucket = aws_s3_bucket.cbt_gs.id
  policy = data.aws_iam_policy_document.bucket_policy.json
}