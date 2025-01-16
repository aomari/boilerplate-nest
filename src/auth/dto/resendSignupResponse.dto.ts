import { ApiProperty } from '@nestjs/swagger';

export class ResendSignupResponseDTO {
  @ApiProperty({
    example: true,
    description: 'Indicates if the operation was successful.',
  })
  success: boolean;

  @ApiProperty({
    example: 'OTP has been resent successfully.',
    description: 'Describes the operation result.',
  })
  message: string;

  @ApiProperty({
    example: 1,
    description: 'Time in minutes before the next OTP can be requested.',
  })
  retryAfter: number;

  @ApiProperty({
    example: 30,
    required: false,
    description: 'Time in minutes before the OTP expires (optional).',
  })
  expiresIn?: number;
}
