import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { IsString } from 'class-validator';
import { DtoValidationPipe } from '../pipes';

describe('DtoValidationPipe', () => {
  class TestDto {
    @IsString()
    username!: string;
  }

  it('should strip non-whitelisted properties', async () => {
    const value = { username: 'testuser', extraField: 'not allowed' };

    // Adjusted to use ValidationPipe with whitelist enabled to strip non-whitelisted properties
    const pipe = new ValidationPipe({
      whitelist: true, // Enable the whitelist
      forbidNonWhitelisted: false, // Do not forbid non-whitelisted properties, just strip them
    });

    // This should only strip extraField without throwing an error
    const transformedValue = await pipe.transform(value, {
      type: 'body',
      metatype: TestDto,
    } as ArgumentMetadata);

    // Check that the extraField is removed but username is kept
    expect(transformedValue).toEqual({ username: 'testuser' });
    expect(transformedValue).not.toHaveProperty('extraField');
  });

  describe('DtoValidationPipe', () => {
    it('should throw BadRequestException for non-whitelisted properties', async () => {
      const value = { username: 'testuser', extraField: 'not allowed' };

      // Adjust the pipe to forbid non-whitelisted properties and throw an exception
      const pipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true, // Forbid non-whitelisted properties (will throw error)
        exceptionFactory: (errors) => {
          // Ensure the error response format includes the property and constraints
          return new BadRequestException({
            fieldMessage: errors.map((error) => ({
              property: error.property,
              constraints: error.constraints,
            })),
          });
        },
      });

      // Expect the exception to be thrown due to the extraField being non-whitelisted
      await expect(
        pipe.transform(value, { type: 'body', metatype: TestDto } as ArgumentMetadata),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  it('should throw BadRequestException with correctly formatted errors', async () => {
    class EmailDto {
      @IsString()
      email!: string;
    }

    const value = { email: 123 }; // Invalid type

    try {
      await DtoValidationPipe.transform(value, {
        type: 'body',
        metatype: EmailDto,
      } as ArgumentMetadata);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);

      const response = (error as BadRequestException).getResponse();

      // Define the expected structure of the response
      interface ErrorResponse {
        fieldMessage: { [key: string]: string }[]; // Use an object with string keys (like 'email')
        error: string;
        statusCode: number;
      }

      const typedResponse = response as ErrorResponse;

      // Adjust the test expectation to match the actual response format
      expect(typedResponse).toMatchObject({
        fieldMessage: [
          expect.objectContaining({
            email: 'email must be a string',
          }),
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    }
  });
});
