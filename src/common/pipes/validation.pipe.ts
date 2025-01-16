import {
  BadRequestException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';

export const DtoValidationPipe = new ValidationPipe({
  whitelist: true, // Strips properties not defined in the DTO
  forbidNonWhitelisted: true, // Throws an error if extra properties are provided
  transform: true, // Transforms input to the expected type
  exceptionFactory: (errors: ValidationError[]) => {
    // Format validation errors to include constraints as an array of strings
    return new BadRequestException({
      fieldMessage: errors.map((error) => ({
        [error.property]: Object.values(error.constraints)[0],
      })),
      error: 'Bad Request',
      statusCode: 400,
    });
  },
});
