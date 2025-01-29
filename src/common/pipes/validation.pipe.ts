import type { ValidationError } from '@nestjs/common';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const DtoValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true, // ✅ Ensures unknown properties throw an error
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    return new BadRequestException({
      fieldMessage: errors.map((error) => ({
        [error.property]: Object.values(error.constraints)[0],
      })),
      error: 'Bad Request',
      statusCode: 400,
    });
  },
});
