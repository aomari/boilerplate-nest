import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling bad requests.
 *
 * This exception should be thrown when the client sends a request that
 * cannot be processed due to client error (e.g., invalid input).
 *
 * @example
 * throw new BadRequestException('Invalid input data');
 */
export class BadRequestException extends HttpException {
  /**
   * Creates a new BadRequestException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
