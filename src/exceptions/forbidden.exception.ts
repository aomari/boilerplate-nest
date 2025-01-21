import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling forbidden access errors.
 *
 * This exception should be thrown when a user attempts to access a resource
 * they are forbidden from accessing.
 *
 * @example
 * throw new ForbiddenException('You do not have permission to access this resource');
 */
export class ForbiddenException extends HttpException {
  /**
   * Creates a new ForbiddenException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
