import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling conflict errors.
 *
 * This exception should be thrown when a request conflicts with the current state of the server.
 *
 * @example
 * throw new ConflictException('Resource already exists');
 */
export class ConflictException extends HttpException {
  /**
   * Creates a new ConflictException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
