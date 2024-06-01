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