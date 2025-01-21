import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/user/user-role.enum';

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
  password: string;

  @ApiPropertyOptional({
    enum: UserRole,
    description: 'Role of the user. Can be either "user" or "admin".',
    example: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be either "user" or "admin"' })
  role?: UserRole;
}
