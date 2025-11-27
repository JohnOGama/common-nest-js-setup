import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  GetObjectAclCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { S3BucketConfig, S3BucketKey } from '@/config/s3-bucket.config';
import { v4 as uuidv4 } from 'uuid';
import { UploadSingleDto } from './dto/upload-single.dto';

@Injectable()
export class S3Service {
  private client: S3Client;
  private bucketName =
    this.configService.get<S3BucketConfig>(S3BucketKey)?.s3BucketName;

  constructor(private readonly configService: ConfigService) {
    const region =
      this.configService.get<S3BucketConfig>(S3BucketKey)?.s3AwsRegion;
    const accessKeyId =
      this.configService.get<S3BucketConfig>(S3BucketKey)?.s3AccessKey;
    const secretAccessKey =
      this.configService.get<S3BucketConfig>(S3BucketKey)?.s3SecretAccessKey;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('S3 configuration is missing');
    }

    this.client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadSingle({ file, isPublic = true }: UploadSingleDto) {
    try {
      const key = uuidv4();
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: isPublic ? 'public-read' : 'private',

        Metadata: {
          originalName: file.originalname,
          size: file.size.toString(),
        },
      });
      await this.client.send(command);

      const url = isPublic
        ? this.getFileUrl(key)
        : await this.getPresignedSignedUrl(key);

      return {
        url,
        key,
        isPublic,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  getFileUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  async getPresignedSignedUrl(key) {
    try {
      const command = new GetObjectAclCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 86400, // 24 hours
      });

      return url;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
