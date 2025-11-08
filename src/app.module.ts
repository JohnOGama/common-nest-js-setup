import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './app/api/product/product.module';
import { AuthModule } from './app/api/auth/auth.module';
import {
  AuthGuard,
  AuthModule as BetterAuthModule,
} from '@thallesp/nestjs-better-auth';
import { auth } from './app/config/better-auth.config';
import { APP_GUARD } from '@nestjs/core';
import { DrizzleModule } from './app/db/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    BetterAuthModule.forRoot({ auth }),
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
