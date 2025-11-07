import { registerAs } from '@nestjs/config';

export const typeOrmConfig = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'paymentDb',
  migrations: [],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeOrmConfig', () => typeOrmConfig);
