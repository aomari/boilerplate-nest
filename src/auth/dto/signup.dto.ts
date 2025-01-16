import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'john Doe',
    required: true,
    description:
      'Username must be at least two letters, and not contain numbers or special characters.',
  })
  @Matches(/^(?! )[A-Za-z ]+(?<! )$/, {
    message:
      'Username must contain at least two letters and cannot include numbers or special characters.',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'example@example.com',
    required: true,
    description: 'Must be a valid email address.',
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    required: true,
    description: 'Password must be at least 6 characters long.',
  })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
