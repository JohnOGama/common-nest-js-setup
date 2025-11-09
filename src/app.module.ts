import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './app/api/product/product.module';
import { AuthModule } from './app/api/auth/auth.module';
import {
  AuthGuard,
  AuthModule as BetterAuthModule,
} from '@thallesp/nestjs-better-auth';
import { APP_GUARD } from '@nestjs/core';
import { DrizzleModule } from './db/drizzle.module';
import { createAuthInstance } from './config/better-auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    BetterAuthModule.forRootAsync({
      useFactory: async () => {
        const auth = await createAuthInstance();
        return { auth };
      },
    }),
    ProductModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
