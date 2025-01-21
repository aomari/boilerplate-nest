import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordDto {
  @ApiProperty({
    example: 'example@example.com',
    required: true,
    description: 'Must be a valid email address.',
  })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty()
  email: string;
}
