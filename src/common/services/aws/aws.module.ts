import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsS3Service } from './aws-s3.service';
import { AwsCloudFrontService } from './aws-cloudfront.service';

@Module({
  imports: [ConfigModule],
  providers: [AwsS3Service, AwsCloudFrontService],
  exports: [AwsS3Service, AwsCloudFrontService],
})
export class AwsModule {}
