import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling not found errors.
 *
 * This exception should be thrown when a requested resource cannot be found.
 *
 * @example
 * throw new NotFoundException('Resource not found');
 */
export class NotFoundException extends HttpException {
  /**
   * Creates a new NotFoundException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
