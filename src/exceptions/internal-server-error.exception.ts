import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling internal server errors.
 *
 * This exception should be thrown when an unexpected error occurs on the server.
 *
 * @example
 * throw new InternalServerErrorException('An unexpected error occurred');
 */
export class InternalServerErrorException extends HttpException {
  /**
   * Creates a new InternalServerErrorException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
