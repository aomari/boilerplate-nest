import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling validation errors.
 *
 * This exception should be thrown when a request contains invalid data that cannot be processed.
 *
 * @example
 * throw new ValidationException('Invalid input data');
 */
export class ValidationException extends HttpException {
  /**
   * Creates a new ValidationException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
