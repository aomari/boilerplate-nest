import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { User } from '../user/user.entity';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getProfile(@Req() req): Promise<User> {
    const userId = req.user.id;
    return this.profileService.getProfile(userId);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateProfile(
    @Req() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.profileService.updateProfile(userId, updateProfileDto);
  }
}
