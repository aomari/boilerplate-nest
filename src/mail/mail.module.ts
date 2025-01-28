import { forwardRef, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { OtpModule } from 'src/otp';

@Module({
  imports: [forwardRef(() => OtpModule)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
