import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig, SwaggerKey } from './config/swagger.config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppConfig, appKey } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parser for better-auth
  app.use(cookieParser());

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Get ConfigService from the DI container
  const configService = app.get(ConfigService);

  const swaggerConfig = configService.getOrThrow<SwaggerConfig>(SwaggerKey);
  const appConfig = configService.getOrThrow<AppConfig>(appKey);

  // Global prefix (e.g. /api/v1/{controller})
  app.setGlobalPrefix('api/v1');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: appConfig.CORS_ORIGIN,
    credentials: true,
  });

  await app.listen(appConfig.PORT ?? 3001);

  console.log(`SERVER PORT: ${appConfig.PORT}`);
  console.log(`SWAGGER PORT: ${appConfig.PORT}/api/docs`);
  console.log(`CORS ORIGIN: ${appConfig.CORS_ORIGIN.join(', ')}`);
  console.log(`NODE ENVIRONMENT: ${appConfig.NODE_ENV}`);
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
