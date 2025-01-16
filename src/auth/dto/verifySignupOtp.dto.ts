import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifySignupOtpDto {
  @ApiProperty({
    example: 'example@example.com',
    required: true,
    description: 'Must be a valid email address.',
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 11111,
    required: true,
    description: 'Must be a valid OTP code.',
  })
  @IsNumber({}, { message: 'otp must be a valid number' })
  @IsNotEmpty()
  otp: number;
}
