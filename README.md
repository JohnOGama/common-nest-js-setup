## Description

A NestJS-based backend application with **Drizzle ORM** and **Better Auth** authentication.

### Tech Stack

- **Framework**: NestJS
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Authentication**: Better Auth
- **Email Service**: SendGrid
- **File Storage**: AWS S3
- **API Documentation**: Swagger/OpenAPI
- **Language**: TypeScript
- **Code Quality**: ESLint
- **Git Hooks**: Husky

## Project setup

### 1. Install dependencies

```bash
$ npm install
```

### 2. Configure environment variables

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

# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=Your App Name

# AWS S3 Configuration
S3_ACCESS_KEY_ID=your-aws-access-key-id
S3_SECRET_ACCESS_KEY=your-aws-secret-access-key
S3_AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name
```

### 3. Setup database

Ensure PostgreSQL is running and the database exists. Then run migrations:

```bash
# Generate migrations from schema
$ npm run db:generate

# Run migrations
$ npm run db:migrate

# Or push schema directly (development only)
$ npm run db:push
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database Commands

```bash
# Generate migration from schema changes
$ npm run db:generate

# Run pending migrations
$ npm run db:migrate

# Push schema directly to database (dev only)
$ npm run db:push

# Open Drizzle Studio (visual database manager)
$ npm run db:studio
```

## API Documentation

This project includes interactive API documentation powered by **Swagger/OpenAPI**.

### Accessing Swagger UI

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

The Swagger UI provides:

- **Interactive API testing** - Try out endpoints directly in the browser
- **Request/Response schemas** - View detailed data structures with examples
- **Authentication flows** - Test protected endpoints
- **Automatic schema validation** - See required fields and data types

### Features

- Full API endpoint documentation with examples
- Request and response body schemas with sample values
- Parameter descriptions and validation rules
- HTTP status code documentation
- Try-it-out functionality for testing endpoints

## API Endpoints

> **Note**: For complete, interactive API documentation with request/response examples, visit the [Swagger UI](#accessing-swagger-ui) at `http://localhost:3000/api`

### Authentication (Better Auth)

All auth endpoints are available at `/api/auth/*`:

- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-out` - Logout
- And more...

### Products

- `POST /product` - Create a product
- `GET /product` - Get all products
- `GET /product/:id` - Get product by ID
- `PATCH /product/:id` - Update product
- `DELETE /product/:id` - Delete product (hard delete)
- `DELETE /product/:id/soft` - Soft delete product

All product endpoints include full Swagger documentation with:

- Request body examples with sample data
- Response schemas with all fields
- Parameter validation rules
- HTTP status codes and error responses

### Email Service

The application includes email functionality powered by SendGrid:

- Transactional emails
- Template-based emails
- Email notifications

To use the email service:

1. Sign up for a [SendGrid account](https://sendgrid.com)
2. Create an API key in your SendGrid dashboard
3. Add the API key and sender email to your `.env` file
4. Use the `EmailService` in your controllers and services

### AWS S3 File Storage

The application includes AWS S3 integration for file storage and management, powered by AWS SDK v3.

#### Features

- **File Upload**: Upload single or multiple files to S3
- **Public & Private Files**: Support for both public and private file access
- **Pre-signed URLs**: Generate temporary signed URLs for private files (24-hour expiration)
- **Metadata Storage**: Store original filename, file size, and custom metadata
- **UUID Naming**: Automatic unique file naming using UUID v4
- **Content Type Detection**: Automatic MIME type handling

#### Setup AWS S3

1. **Create an AWS Account**
   - Sign up at [AWS Console](https://aws.amazon.com)

2. **Create an S3 Bucket**
   - Go to S3 service in AWS Console
   - Click "Create bucket"
   - Choose a unique bucket name
   - Select your preferred region
   - Configure bucket settings (public access, versioning, etc.)

3. **Create IAM User with S3 Permissions**
   - Go to IAM service in AWS Console
   - Create a new user with programmatic access
   - Attach the `AmazonS3FullAccess` policy (or create a custom policy with specific permissions)
   - Save the Access Key ID and Secret Access Key

4. **Configure Environment Variables**
   - Add your AWS credentials to the `.env` file:
   ```env
   S3_ACCESS_KEY_ID=your-access-key-id
   S3_SECRET_ACCESS_KEY=your-secret-access-key
   S3_AWS_REGION=us-east-1
   S3_BUCKET_NAME=your-bucket-name
   ```

#### Using the S3 Service

The `S3Service` provides methods for file operations:

```typescript
import { S3Service } from '@/services/s3/s3.service';

// Upload a public file
const result = await s3Service.uploadSingle({
  file: uploadedFile,
  isPublic: true,
});
// Returns: { url, key, isPublic }

// Upload a private file
const result = await s3Service.uploadSingle({
  file: uploadedFile,
  isPublic: false,
});
// Returns: { url: presignedUrl, key, isPublic }

// Get public file URL
const url = s3Service.getFileUrl(fileKey);

// Get pre-signed URL for private file (valid for 24 hours)
const presignedUrl = await s3Service.getPresignedSignedUrl(fileKey);
```

#### File Upload Response

```json
{
  "url": "https://your-bucket.s3.amazonaws.com/uuid-key or presigned-url",
  "key": "unique-uuid-v4-key",
  "isPublic": true
}
```

#### Security Best Practices

- **Never commit AWS credentials** to version control
- Use **IAM roles** with minimal required permissions
- Enable **S3 bucket versioning** for file recovery
- Configure **CORS** settings if accessing from frontend
- Use **private buckets** by default and generate pre-signed URLs when needed
- Regularly **rotate access keys**
- Enable **S3 bucket logging** for audit trails

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Code Quality

This project uses **ESLint** for code linting and **Husky** for Git hooks to maintain code quality.

### ESLint

ESLint is configured to enforce code standards and catch potential issues:

```bash
# Run ESLint to check code
$ npm run lint

# Auto-fix ESLint issues
$ npm run lint:fix
```

### Husky

Husky is configured to run pre-commit and pre-push hooks automatically, ensuring:

- Code is linted before commits
- Tests pass before pushing
- Code quality standards are maintained across the team

The Git hooks are automatically installed when you run `npm install`.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
