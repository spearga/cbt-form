# Provider Configuration
provider "aws" {
  region = "eu-west-1"
}

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

# CloudFront Configuration
resource "aws_cloudfront_origin_access_identity" "cbt_gs" {
  comment = "OAI for CBT GS Bucket"
}

resource "aws_cloudfront_distribution" "cbt_gs" {
  origin {
    domain_name = aws_s3_bucket.cbt_gs.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.cbt_gs.id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.cbt_gs.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for CBT GS"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.cbt_gs.id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
