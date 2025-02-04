import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DtoValidationPipe } from './common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global prefix for all routes
  app.setGlobalPrefix('api');
  app.useGlobalPipes(DtoValidationPipe);

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Asal API Documentation')
    .setDescription('Backend template for Asal technology')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Apply the global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

// Handle any errors that occur during the bootstrap process
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
