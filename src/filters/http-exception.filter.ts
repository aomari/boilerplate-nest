// src/filters/http-exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const isDevelopment = process.env.NODE_ENV === 'development';

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Internal server error',
      error: exception.getResponse(),
      timestamp: new Date().toISOString(),
      path: request.url,
      stack: isDevelopment ? exception.stack : undefined, // Show stack trace in development only
    };

    this.logger.error(`${request.method} ${request.url}`, exception.stack);

    response.status(status).json(errorResponse);
  }
}
