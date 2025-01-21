import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling unauthorized access errors.
 *
 * This exception should be thrown when a user attempts to access a resource
 * they are not authorized to access.
 *
 * @example
 * throw new UnauthorizedException('You are not authorized to access this resource');
 */
export class UnauthorizedException extends HttpException {
  /**
   * Creates a new UnauthorizedException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
