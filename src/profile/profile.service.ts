import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { User } from '../user/user.entity';
import { join } from 'path';
import { existsSync, mkdirSync, promises as fsPromises } from 'fs';
import { ResourceNotFoundException } from 'src/exceptions/resource-not-found.exception';
import { BadRequestException } from 'src/exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ProfileService {
  constructor(
    private readonly i18n: I18nService,
    private readonly userService: UserService,
  ) {}

  /**
   * Retrieves the profile of the user by their ID.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<User>} The user entity.
   * @throws {ResourceNotFoundException} If the user is not found.
   */
  async getProfile(userId: string): Promise<User> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) {
      throw new ResourceNotFoundException(await this.i18n.translate('common.notFoundUser'));
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
   * @throws {ResourceNotFoundException} If the user is not found.
   */
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) {
      throw new ResourceNotFoundException(await this.i18n.translate('common.notFoundUser'));
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
   * @throws {ResourceNotFoundException} If the user is not found.
   * @throws {BadRequestException} If the file is invalid.
   */
  async updateProfilePicture(userId: string, file: Express.Multer.File): Promise<User> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) {
      throw new ResourceNotFoundException(await this.i18n.translate('common.notFoundUser'));
    }

    // Validate file size
    if (file.size > 15 * 1024 * 1024) {
      // 15 MB
      throw new BadRequestException(
        await this.i18n.translate('common.fileSizeExceeded', { args: { size: 15 } }),
      );
    }

    // Validate file extension
    const validExtensions = ['png', 'jpeg', 'jpg'];
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    if (!validExtensions.includes(fileExtension)) {
      throw new BadRequestException(await this.i18n.translate('common.invalidFileType'));
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
