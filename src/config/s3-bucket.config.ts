import { registerAs } from '@nestjs/config';

export const S3BucketKey = 's3BucketConfig';

export interface S3BucketConfig {
  s3_accessKey: string;
  s3_secretAccessKey: string;
  s3_awsRegion: string;
  s3_bucketName: string;
}

export default registerAs(S3BucketKey, () => ({
  s3_accessKey: process.env.S3_ACCESS_KEY_ID,
  s3_secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  s3_awsRegion: process.env.S3_AWS_REGION,
  s3_bucketName: process.env.S3_BUCKET_NAME,
}));
