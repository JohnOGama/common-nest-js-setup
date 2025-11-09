import { registerAs } from '@nestjs/config';

export const SendGridKey = 'sendgrid_key';

export interface SendGridConfig {
  key: string;
}

export default registerAs(SendGridKey, () => ({
  key: process.env.SENDGRID_API_KEY,
}));
