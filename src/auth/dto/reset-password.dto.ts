import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
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

  @ApiProperty({
    example: 'Test@123',
    required: true,
    description: 'Password must be at least 6 characters long.',
  })
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/, {
    message:
      'New password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  @IsNotEmpty()
  newPassword: string;
}
