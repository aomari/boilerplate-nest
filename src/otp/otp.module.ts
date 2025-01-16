import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Otp } from './otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger';
import { MailModule } from 'src/mail';

/**
 * The `OtpModule` is a feature module in the NestJS application that encapsulates
 * the logic for managing OTPs (One-Time Passwords). It integrates database support,
 * logging, and email services required for OTP-related operations.
 * @export
 * @class OtpModule
 * @typedef {OtpModule}
 */
@Module({
  imports: [TypeOrmModule.forFeature([Otp]), LoggerModule, MailModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
