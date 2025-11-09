import { loadSchemas } from '@/utils';
import { drizzle } from 'drizzle-orm/postgres-js';
import path from 'path';
import postgres from 'postgres';

// Database connection configuration
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'paymentDb',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
};

// Create connection string
export const getConnectionString = () => {
  return `postgresql://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
};

// Factory function for creating drizzle instance with schema
export async function createDrizzleInstance() {
  const schemaDir = path.resolve(__dirname, '../app/api');
  const schema = await loadSchemas(schemaDir);

  const client = postgres(getConnectionString(), {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
    ssl: false,
  });

  return drizzle(client, { schema });
}

// Export type for dependency injection
export type DrizzleDB = Awaited<ReturnType<typeof createDrizzleInstance>>;
