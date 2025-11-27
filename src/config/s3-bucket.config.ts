import { registerAs } from '@nestjs/config';

export const S3BucketKey = 's3BucketConfig';

export interface S3BucketConfig {
  s3AccessKey: string;
  s3SecretAccessKey: string;
  s3AwsRegion: string;
  s3BucketName: string;
}

export default registerAs(S3BucketKey, () => ({
  s3AccessKey: process.env.S3_ACCESS_KEY_ID,
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  s3AwsRegion: process.env.S3_AWS_REGION,
  s3BucketName: process.env.S3_BUCKET_NAME,
}));
