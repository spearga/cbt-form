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