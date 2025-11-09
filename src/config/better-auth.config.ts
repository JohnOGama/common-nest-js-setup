import { createDrizzleInstance } from '@/db/drizzle.config';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export async function createAuthInstance() {
  const db = await createDrizzleInstance();

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
    }),
    basePath: '/api/auth',
    secret: process.env.BETTER_AUTH_SECRET || 'your-secret-key-here',
    trustedOrigins: [
      process.env.BETTER_AUTH_FRONT_END_URL || 'http://localhost:3000',
    ],
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
    },
    socialProviders: {
      // Add your social providers here if needed
    },
  });
}
