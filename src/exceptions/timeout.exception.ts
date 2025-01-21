import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling request timeout errors.
 *
 * This exception should be thrown when a request times out.
 *
 * @example
 * throw new TimeoutException('The request has timed out');
 */
export class TimeoutException extends HttpException {
  /**
   * Creates a new TimeoutException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.REQUEST_TIMEOUT);
  }
}
