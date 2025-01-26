import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @ApiProperty({ example: 1, required: false, description: 'Page number' })
  @IsOptional()
  @IsInt({ message: 'page must be a positive number' })
  @Min(1, { message: 'page must be a positive number' })
  page?: number;

  @Type(() => Number)
  @ApiProperty({ example: 30, required: false, description: 'Number of users per page' })
  @IsOptional()
  @IsInt({ message: 'limit must be a positive number' })
  @Min(1, { message: 'limit must be a positive number' })
  limit?: number;
}
