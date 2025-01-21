import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling resource not found errors.
 *
 * This exception should be thrown when a requested resource cannot be found.
 *
 * @example
 * throw new ResourceNotFoundException('User not found');
 */
export class ResourceNotFoundException extends HttpException {
  /**
   * Creates a new ResourceNotFoundException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
