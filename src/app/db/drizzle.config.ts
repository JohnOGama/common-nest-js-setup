import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as authSchema from '../api/auth/entities/auth.schema';
import * as productSchema from '../api/product/entities/products.schema';

// Combine all schemas
const schema = {
  ...authSchema,
  ...productSchema,
};

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

// Create postgres client
const client = postgres(getConnectionString(), {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  ssl: false,
});

// Create drizzle instance
export const db = drizzle(client, { schema });

// Export type for dependency injection
export type DrizzleDB = PostgresJsDatabase<typeof schema>;
