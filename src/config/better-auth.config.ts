import { createDrizzleInstance } from '@/db/drizzle.config';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import * as authSchema from '@/app/api/auth/entities/auth.schema';
import { ConfigService } from '@nestjs/config';
import { TokenConfig, TokenKey } from './token.config';
import { openAPI } from 'better-auth/plugins';

export async function createAuthInstance(configService: ConfigService) {
  const db = await createDrizzleInstance(configService);
  const tokenConfig = configService.getOrThrow<TokenConfig>(TokenKey);

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: authSchema,
    }),
    secret: tokenConfig.secretKey,
    trustedOrigins: tokenConfig.trustedOrigins,
    plugins: [openAPI()],
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 60 * 60 * 24 * 7,
      },
      expiresIn: 60 * 60 * 24 * 7,
    },
    advanced: {
      cookiePrefix: tokenConfig.cookiePrefix,
    },
  });
}
