import { LoggerService } from '../logger.service';
import * as winston from 'winston';
import * as fs from 'fs';
import * as Sentry from '@sentry/node';
import 'winston-daily-rotate-file';

jest.mock('winston', () => ({
  createLogger: jest.fn().mockReturnValue({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
  },
  transports: {
    DailyRotateFile: jest.fn(),
    Console: jest.fn(),
  },
}));

jest.mock('@sentry/node', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  createWriteStream: jest.fn().mockReturnValue({
    write: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  }),
}));

jest.mock('path', () => ({
  join: jest.fn().mockReturnValue('mocked/logs'), // Ensure the directory is mocked correctly
  basename: jest.fn().mockReturnValue('mockedFilename'),
  dirname: jest.fn().mockReturnValue('mocked/dirname'),
}));

// Mock process.cwd()
jest.mock('process', () => ({
  cwd: jest.fn().mockReturnValue('mocked/current/directory'),
}));

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    // Clear any previous mock calls
    jest.clearAllMocks();
    loggerService = new LoggerService();
  });

  it('should create the logger with correct transports and level', () => {
    const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

    expect(winston.createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        level: logLevel,
        transports: expect.arrayContaining([
          expect.any(winston.transports.DailyRotateFile),
          expect.any(winston.transports.Console),
        ]),
      }),
    );
  });

  it('should call debug method of winston logger', () => {
    loggerService.debug('Test debug message');
    expect(winston.createLogger().debug).toHaveBeenCalledWith('Test debug message');
  });

  it('should call info method of winston logger', () => {
    loggerService.info('Test info message');
    expect(winston.createLogger().info).toHaveBeenCalledWith('Test info message');
  });

  it('should call warn method of winston logger', () => {
    loggerService.warn('Test warn message');
    expect(winston.createLogger().warn).toHaveBeenCalledWith('Test warn message');
  });

  it('should call error method of winston logger and Sentry captureException', () => {
    loggerService.error('Test error message');
    expect(winston.createLogger().error).toHaveBeenCalledWith('Test error message');
    expect(Sentry.captureException).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should format message with requestId correctly', () => {
    const message = 'Test message';
    const requestId = '1234';
    const formattedMessage = loggerService['formatMessage'](message, requestId);
    expect(formattedMessage).toBe('[RequestID: 1234] Test message');
  });

  it('should not create logs directory if it already exists', () => {
    // Mock fs.existsSync to return true (indicating the directory exists)
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    // Mock mkdirSync to track if it gets called
    const mkdirSpy = jest.fn(); // Use jest.fn() to spy on mkdirSync
    jest.spyOn(fs, 'mkdirSync').mockImplementation(mkdirSpy);

    // Call the createLogDirectory method
    loggerService['createLogDirectory']();

    // Ensure mkdirSync was NOT called
    expect(mkdirSpy).not.toHaveBeenCalled();
  });

  it('should create logs directory if it does not exist', () => {
    // Mock fs.existsSync to return false (indicating the directory does not exist)
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    // Mock mkdirSync to track if it gets called
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync');

    // Call the createLogDirectory method
    loggerService['createLogDirectory']();

    // Check that mkdirSync was called exactly once
    expect(mkdirSpy).toHaveBeenCalledTimes(1);
  });
});
