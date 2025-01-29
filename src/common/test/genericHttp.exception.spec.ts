import { GenericHttpException } from '../exception/genericHttp.exception';
import { HttpStatus } from '@nestjs/common';

describe('GenericHttpException', () => {
  it('should create an exception with the correct structure', () => {
    const errors = [
      { property: 'username', constraints: ['Username is required'] },
      { property: 'password', constraints: ['Password must be at least 8 characters'] },
    ];
    const status = HttpStatus.BAD_REQUEST;
    const exception = new GenericHttpException(errors, status);

    expect(exception.getResponse()).toEqual({
      message: errors,
      error: 'BAD_REQUEST', // Adjusted to match uppercase error type
      statusCode: status,
    });
    expect(exception.getStatus()).toBe(status);
  });

  it('should correctly format the HTTP error type', () => {
    const errors = [{ property: 'email', constraints: ['Email is invalid'] }];
    const status = HttpStatus.UNAUTHORIZED;
    const exception = new GenericHttpException(errors, status);

    expect(exception.getResponse()).toEqual({
      message: errors,
      error: 'UNAUTHORIZED', // Adjusted to match uppercase error type
      statusCode: status,
    });
  });
});
