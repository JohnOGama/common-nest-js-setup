import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/app/db/drizzle.config';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  basePath: '/api/auth',
  secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here',
  trustedOrigins: [process.env.BETTER_AUTH_URL || 'http://localhost:3000'],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // Add your social providers here if needed
  },
});
