import { Global, Module } from '@nestjs/common';
import { createDrizzleInstance } from './drizzle.config';

export const DRIZZLE_ORM = Symbol('DRIZZLE_ORM');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_ORM,
      useFactory: async () => {
        return await createDrizzleInstance();
      },
    },
  ],
  exports: [DRIZZLE_ORM],
})
export class DrizzleModule {}
