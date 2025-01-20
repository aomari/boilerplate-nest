import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'Test@123',
    required: true,
    description: 'Current user password.',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty()
  oldPassword: string;

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
