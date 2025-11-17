import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsS3Service {
  constructor(private readonly config: ConfigService) {}

  createClient(): S3Client {
    const region = 'us-east-1';
    const accessKeyId = this.config.get<string>('S3_AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('S3_AWS_SECRET_ACCESS_KEY');
    const creds =
      accessKeyId && secretAccessKey
        ? { accessKeyId, secretAccessKey }
        : undefined;
    return new S3Client({ region, credentials: creds });
  }

  async putPublicObject(params: {
    bucket: string;
    key: string;
    body: Buffer;
    contentType?: string;
  }): Promise<void> {
    const client = this.createClient();
    const cmd = new PutObjectCommand({
      Bucket: params.bucket,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType || 'application/octet-stream',
    });
    await client.send(cmd);
  }
}
