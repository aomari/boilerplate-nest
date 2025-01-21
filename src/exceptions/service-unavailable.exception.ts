import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for handling service unavailable errors.
 *
 * This exception should be thrown when the server is currently unable to handle the request
 * due to a temporary overload or scheduled maintenance.
 *
 * @example
 * throw new ServiceUnavailableException('The service is temporarily unavailable');
 */
export class ServiceUnavailableException extends HttpException {
  /**
   * Creates a new ServiceUnavailableException.
   *
   * @param message - A descriptive message explaining the reason for the exception.
   */
  constructor(message: string) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
