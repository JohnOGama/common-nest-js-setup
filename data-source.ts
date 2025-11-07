import { typeOrmConfig } from './src/app/config/typeorm.config';
import { DataSource } from 'typeorm';

export default new DataSource({
  ...typeOrmConfig,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/app/migrations/*.ts'],
});
