import { ApiProperty } from '@nestjs/swagger';

export class VerifySignupOtpResponseDto {
  @ApiProperty({
    example: 'OTP verification successful.',
    description: 'Message indicating the verification was successful.',
  })
  message: string;

  //   @ApiProperty({
  //     example: 'some-jwt-token',
  //     description: 'A JWT token for authenticated user (if applicable).',
  //     required: false,
  //   })
  //   token?: string;
}
