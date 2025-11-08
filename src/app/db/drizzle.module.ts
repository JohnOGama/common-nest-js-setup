import { Global, Module } from '@nestjs/common';
import { db } from './drizzle.config';

export const DRIZZLE_ORM = Symbol('DRIZZLE_ORM');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_ORM,
      useValue: db,
    },
  ],
  exports: [DRIZZLE_ORM],
})
export class DrizzleModule {}
