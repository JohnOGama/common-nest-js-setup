import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDrizzleInstance } from './drizzle.config';

export const DRIZZLE_ORM = Symbol('DRIZZLE_ORM');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_ORM,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await createDrizzleInstance(configService);
      },
    },
  ],
  exports: [DRIZZLE_ORM],
})
export class DrizzleModule {}
