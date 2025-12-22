import { AppConfig, appKey } from '@/config/app.config';
import { loadSchemas } from '@/utils';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import path from 'path';
import postgres from 'postgres';

// Create connection string
export const getConnectionString = (configService: ConfigService) => {
  const appConfig = configService.getOrThrow<AppConfig>(appKey);
  return appConfig.BASE_URL;
};

// Factory function for creating drizzle instance with schema
export async function createDrizzleInstance(configService: ConfigService) {
  const schemaDir = path.resolve(__dirname, '../app/api');
  const schema = await loadSchemas(schemaDir);

  const client = postgres(getConnectionString(configService), {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    ssl: false,
  });

  return drizzle(client, { schema });
}

// Export type for dependency injection
export type DrizzleDB = Awaited<ReturnType<typeof createDrizzleInstance>>;
