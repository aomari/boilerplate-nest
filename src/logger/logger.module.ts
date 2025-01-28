import { forwardRef, Module } from '@nestjs/common';

import { LoggerService } from './logger.service';
import { OtpModule } from 'src/otp';

@Module({
  imports: [forwardRef(() => OtpModule)],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
