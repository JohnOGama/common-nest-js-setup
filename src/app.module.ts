import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './app/api/product/product.module';
import { AuthModule } from './app/api/auth/auth.module';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { DrizzleModule } from './db/drizzle.module';
import { createAuthInstance } from './config/better-auth.config';
import { PaymentsModule } from './app/api/payments/payments.module';
import { ServicesModule } from './services/services.module';
import sendGridConfig from './config/send-grid.config';
import swaggerConfig from './config/swagger.config';
import databaseConfig from './config/database.config';
import tokenConfig from './config/token.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [sendGridConfig, swaggerConfig, databaseConfig, tokenConfig],
    }),
    DrizzleModule,
    BetterAuthModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const auth = await createAuthInstance(configService);
        return {
          auth,
          disableGlobalAuthGuard: true,
        };
      },
    }),
    ProductModule,
    AuthModule,
    PaymentsModule,
    ServicesModule,
  ],
})
export class AppModule {}
