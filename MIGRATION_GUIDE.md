# Migration Guide: TypeORM to Drizzle ORM + Better Auth

This guide documents the migration from TypeORM to Drizzle ORM and the integration of Better Auth.

## What Changed

### 1. Dependencies

- **Removed**: `typeorm`, `@nestjs/typeorm`
- **Added**: `drizzle-orm`, `drizzle-kit`, `postgres`

### 2. Database Configuration

- Old: `src/app/config/typeorm.config.ts`
- New: `src/app/db/drizzle.config.ts`

### 3. Schema Definition

- Old: TypeORM entities with decorators (e.g., `@Entity()`, `@Column()`)
- New: Drizzle schema using the table builder pattern

### 4. Querying

- Old: TypeORM repositories with methods like `repository.find()`
- New: Drizzle queries using SQL-like syntax with `db.select().from()`

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=admin
DB_NAME=paymentDb

# Application Configuration
PORT=3000

# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-here-change-in-production
BETTER_AUTH_URL=http://localhost:3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Better Auth Tables

Better Auth uses Drizzle adapter and will automatically create necessary tables. To generate the initial migration:

```bash
npm run db:generate
```

### 4. Run Migrations

```bash
npm run db:migrate
```

Or push schema directly to database (development only):

```bash
npm run db:push
```

### 5. Start the Application

```bash
npm run start:dev
```

## New Database Scripts

| Script                | Description                             |
| --------------------- | --------------------------------------- |
| `npm run db:generate` | Generate migration files from schema    |
| `npm run db:migrate`  | Run pending migrations                  |
| `npm run db:push`     | Push schema directly to DB (dev only)   |
| `npm run db:studio`   | Open Drizzle Studio (visual DB manager) |

## Architecture Changes

### Schema Files

All database schemas are now in `src/app/db/schema/`:

- `products.schema.ts` - Product table definition
- Better Auth tables are auto-managed by the Better Auth Drizzle adapter

### Drizzle Module

A global `DrizzleModule` provides the database client to all modules via dependency injection:

```typescript
constructor(@Inject(DRIZZLE_ORM) private readonly db: DrizzleDB) {}
```

### Example: Product Service

```typescript
// Create
await this.db.insert(products).values(data).returning();

// Read
await this.db.select().from(products).where(eq(products.id, id));

// Update
await this.db.update(products).set(data).where(eq(products.id, id)).returning();

// Delete
await this.db.delete(products).where(eq(products.id, id)).returning();
```

## Better Auth Integration

### Features Enabled

- Email & Password authentication
- Drizzle ORM adapter for database operations
- Auth guard for protecting routes

### Auth Endpoints

All auth endpoints are available at `/api/auth/*`:

- `/api/auth/sign-up` - Register new user
- `/api/auth/sign-in` - Login
- `/api/auth/sign-out` - Logout
- And more...

### Protecting Routes

Routes are automatically protected by the global `AuthGuard`. To make a route public:

```typescript
import { Public } from '@thallesp/nestjs-better-auth';

@Public()
@Get('public-route')
publicRoute() {
  // This route is accessible without authentication
}
```

## Migration from TypeORM Entities to Drizzle Schema

### Before (TypeORM)

```typescript
@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column()
  name: string;
}
```

### After (Drizzle)

```typescript
export const products = pgTable('product', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  // ... other fields
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
```

## Benefits of Drizzle

1. **Type-safe**: Full TypeScript support with inference
2. **SQL-like**: Write queries that look like SQL
3. **Lightweight**: Smaller bundle size than TypeORM
4. **Better Performance**: More efficient queries
5. **Drizzle Studio**: Visual database manager included

## Troubleshooting

### Connection Issues

- Verify database credentials in `.env`
- Ensure PostgreSQL is running
- Check database name exists

### Migration Issues

```bash
# If migrations fail, you can drop and recreate
npm run db:push
```

### Better Auth Issues

- Ensure `BETTER_AUTH_SECRET` is set
- Check that Better Auth tables exist in database
- Verify `trustedOrigins` includes your frontend URL

## Additional Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Better Auth Documentation](https://www.better-auth.com)
- [NestJS Better Auth Integration](https://github.com/thallesp/nestjs-better-auth)
