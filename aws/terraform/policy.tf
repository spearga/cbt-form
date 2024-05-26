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
