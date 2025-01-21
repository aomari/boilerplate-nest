import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling method not allowed errors.
 *
 * This exception should be thrown when a request is made using an HTTP method
 * that is not allowed for the requested resource.
 *
 * @example
 * throw new MethodNotAllowedException('This method is not allowed for the requested resource');
 */
export class MethodNotAllowedException extends HttpException {
  /**
   * Creates a new MethodNotAllowedException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.METHOD_NOT_ALLOWED);
  }
}
