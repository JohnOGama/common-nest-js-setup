import { registerAs } from '@nestjs/config';

export const SendGridKey = 'sendgridKey';

export interface SendGridConfig {
  key: string;
}

export default registerAs(SendGridKey, () => ({
  key: process.env.SENDGRID_API_KEY,
}));
