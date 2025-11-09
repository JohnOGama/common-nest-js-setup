import { SendGridConfig, SendGridKey } from '@/config/send-grid.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly sendGridApiKey: SendGridConfig;

  constructor(private readonly configService: ConfigService) {
    this.sendGridApiKey =
      this.configService.getOrThrow<SendGridConfig>(SendGridKey);

    if (!this.sendGridApiKey.key) {
      throw new Error('SendGrid API key is not configured');
    }

    sgMail.setApiKey(this.sendGridApiKey.key);
  }

  async send() {}
}
