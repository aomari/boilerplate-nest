import 'winston-daily-rotate-file';
import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;
  private logDir: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');

    // Ensure logs directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
    const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

    // Initialize Sentry
    Sentry.init({
      // dsn: process.env.SENTRY_DSN, // Set your Sentry DSN here
      tracesSampleRate: 1.0,
    });

    // Create winston logger instance
    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: path.join(this.logDir, 'Backend-logs-%DATE%.log'),
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
        }),
        new winston.transports.Console(),
      ],
    });
  }

  // Private method
  private createLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private formatMessage(message: string, requestId?: string): string {
    return requestId ? `[RequestID: ${requestId}] ${message}` : message;
  }

  debug(message: string, requestId?: string) {
    this.logger.debug(this.formatMessage(message, requestId));
  }

  info(message: string, requestId?: string) {
    this.logger.info(this.formatMessage(message, requestId));
  }

  warn(message: string, requestId?: string) {
    this.logger.warn(this.formatMessage(message, requestId));
  }

  error(message: string, trace?: string, requestId?: string) {
    const formattedMessage = this.formatMessage(message, requestId);
    this.logger.error(formattedMessage);
    if (trace) {
      this.logger.error(trace);
    }

    // Send error to Sentry
    Sentry.captureException(new Error(formattedMessage));
  }
}
