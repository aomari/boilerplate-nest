import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { LoggerService } from 'src/logger';

@Injectable()
export class CleanupService {
  constructor(private readonly logger: LoggerService) {}

  @Cron('0 1 * * *') // Run daily at 1 AM to clean old log files
  async cleanOldLogs(): Promise<void> {
    try {
      const logDir = 'logs'; // Folder where logs are stored
      const now = new Date();

      fs.readdir(
        logDir,
        (err: NodeJS.ErrnoException | null, files: string[]) => {
          if (err) {
            this.logger.error('Error reading log directory', err.stack);
            return;
          }

          files.forEach((file: string) => {
            const filePath = path.join(logDir, file);

            fs.stat(
              filePath,
              (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
                if (err) {
                  this.logger.error(
                    `Error reading log file stats: ${filePath}`,
                    err.stack,
                  );
                  return;
                }

                const fileAge =
                  (now.getTime() - stats.mtime.getTime()) /
                  (1000 * 60 * 60 * 24); // File age in days

                if (fileAge > 14) {
                  fs.unlink(filePath, (err: NodeJS.ErrnoException | null) => {
                    if (err) {
                      this.logger.error(
                        `Failed to delete log file: ${filePath}`,
                        err.stack,
                      );
                    } else {
                      this.logger.info(`Deleted old log file: ${filePath}`);
                    }
                  });
                }
              },
            );
          });
        },
      );
    } catch (error) {
      this.logger.error('Error during log cleanup', (error as Error).stack);
    }
  }
}
