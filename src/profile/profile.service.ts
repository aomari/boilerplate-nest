import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { User } from '../user/user.entity';
import { join } from 'path';
import { existsSync, mkdirSync, promises as fsPromises } from 'fs';

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
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userService.updateUser(userId, updateProfileDto);
    delete updatedUser.password;
    return updatedUser;
  }

  /**
   * Updates the profile picture of the user.
   * @param {string} userId - The ID of the user.
   * @param {Express.Multer.File} file - The uploaded file.
   * @returns {Promise<User>} The updated user entity.
   * @throws {NotFoundException} If the user is not found.
   * @throws {BadRequestException} If the file is invalid.
   */
  async updateProfilePicture(userId: string, file: Express.Multer.File): Promise<User> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate file size
    if (file.size > 15 * 1024 * 1024) {
      // 15 MB
      throw new BadRequestException('File size should not exceed 15 MB');
    }

    // Validate file extension
    const validExtensions = ['png', 'jpeg', 'jpg'];
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      throw new BadRequestException('Invalid file type. Only PNG, JPEG, and JPG are allowed');
    }

    // Ensure the storage directory exists
    const storageDir = join(__dirname, '..', '..', 'storage', 'profile-pictures');
    if (!existsSync(storageDir)) {
      mkdirSync(storageDir, { recursive: true });
    }

    // Delete the old profile picture if it exists
    if (user.profilePicture) {
      const oldFilePath = join(__dirname, '..', '..', user.profilePicture);
      if (existsSync(oldFilePath)) {
        await fsPromises.unlink(oldFilePath);
      }
    }

    // Generate a unique filename and save the file
    const filename = `${userId}-${Date.now()}.${fileExtension}`;
    const filePath = join(storageDir, filename);
    await fsPromises.writeFile(filePath, file.buffer);

    // Generate the file URL
    const fileUrl = `/storage/profile-pictures/${filename}`;

    // Update the user's profile picture in the database
    const updatedUser = await this.userService.updateUser(userId, {
      profilePicture: fileUrl,
    });
    delete updatedUser.password;
    return updatedUser;
  }
}
