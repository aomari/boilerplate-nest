import { HttpException, HttpStatus } from '@nestjs/common';

export class GenericHttpException extends HttpException {
  constructor(
    errors: { property: string; constraints: string[] }[], // Error details
    status: HttpStatus, // HTTP Status Code
  ) {
    // The error response structure with the desired format
    super(
      {
        message: errors, // This should be the array of property/constraints
        error: HttpStatus[status], // This should be the human-readable error type, e.g., "Bad Request"
        statusCode: status, // The actual HTTP status code
      },
      status,
    );
  }
}
