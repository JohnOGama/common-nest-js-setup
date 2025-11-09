import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
})
export class ServicesModule {}
