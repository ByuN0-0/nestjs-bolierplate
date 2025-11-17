import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';

@Injectable()
export class AwsCloudFrontService {
  constructor(private readonly config: ConfigService) {}

  createClient(): CloudFrontClient {
    const region = this.config.get<string>('AWS_REGION') || 'ap-northeast-2';
    const accessKeyId = this.config.get<string>('S3_AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.config.get<string>('S3_AWS_SECRET_ACCESS_KEY');
    const creds =
      accessKeyId && secretAccessKey
        ? { accessKeyId, secretAccessKey }
        : undefined;
    return new CloudFrontClient({ region, credentials: creds });
  }

  async invalidateOne(distributionId: string, path: string): Promise<void> {
    const client = this.createClient();
    const cmd = new CreateInvalidationCommand({
      DistributionId: distributionId,
      InvalidationBatch: {
        CallerReference: `${Date.now()}-${path}`,
        Paths: { Quantity: 1, Items: [path] },
      },
    });
    await client.send(cmd);
  }
}
