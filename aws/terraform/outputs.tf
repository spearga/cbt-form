output "s3_bucket_name" {
  value = aws_s3_bucket.cbt_gs.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.cbt_gs.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.cbt_gs.domain_name
}
