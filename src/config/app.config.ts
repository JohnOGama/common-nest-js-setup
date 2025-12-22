import { registerAs } from '@nestjs/config';

export const appKey = 'appKey';

export interface AppConfig {
  NODE_ENV: 'development' | 'production';
  BASE_URL: string;
  CORS_ORIGIN: string[];
  PORT: number;
}

export default registerAs(appKey, () => ({
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.NEON_DB_STRING ?? '',

  CORS_ORIGIN: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : [],
  PORT: parseInt(process.env.PORT ?? '3000'),
}));
