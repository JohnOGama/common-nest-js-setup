import { registerAs } from '@nestjs/config';

export const TokenKey = 'tokenKey';

export interface TokenConfig {
  secretKey: string;
  trustedOrigins: string[];
  cookiePrefix: string;
}

export default registerAs(TokenKey, () => ({
  secretKey: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here',
  trustedOrigins: process.env.BETTER_AUTH_FRONT_END_URL?.split(',') || [
    'http://localhost:3000',
  ],
  cookiePrefix: 'better-auth',
}));
