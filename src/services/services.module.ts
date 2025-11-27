import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';
import { S3Service } from './s3/s3.service';

@Module({
  providers: [EmailService, S3Service],
  controllers: [EmailController],
})
export class ServicesModule {}
