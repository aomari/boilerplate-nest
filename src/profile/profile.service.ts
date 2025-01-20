import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves the profile of the user by their ID.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<User>} The user entity.
   * @throws {NotFoundException} If the user is not found.
   */
  async getProfile(userId: string): Promise<User> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete the password field from the response object
    delete user.password;

    return user;
  }

  /**
   * Updates the profile of the user.
   * @param {string} userId - The ID of the user.
   * @param {UpdateProfileDto} updateProfileDto - The DTO containing the profile update data.
   * @returns {Promise<User>} The updated user entity.
   * @throws {NotFoundException} If the user is not found.
   */
  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userService.updateUser(
      userId,
      updateProfileDto,
    );
    delete updatedUser.password;
    return updatedUser;
  }
}
