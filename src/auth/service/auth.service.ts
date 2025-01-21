import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService, UserStatus } from 'src/user';
import { ConfigService } from '@nestjs/config';

import { PasswordService } from './password.service';
import { TokenPayload } from '../auth.interface';
import { ResendSignupDto } from '../dto/resendSignup.dto';
import {
  LoginDto,
  SignupDto,
  VerifySignupOtpResponseDto,
  VerifySignupOtpDto,
  ResendSignupResponseDTO,
} from '../../auth/dto';
import { OtpService, OtpType } from 'src/otp';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserRole } from 'src/user/user-role.enum';
import { ConflictException } from 'src/exceptions/conflict.exception';
import { ResourceNotFoundException } from 'src/exceptions/resource-not-found.exception';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exception';

/**
 * Service for managing user authentication processes, including sign-up, login, OTP verification, and token management.
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   *
   * @constructor
   * @param {JwtService} jwtService
   * @param {ConfigService} configService
   * @param {UserService} userService
   * @param {PasswordService} passwordService
   * @param {OtpService} otpService
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly otpService: OtpService,
  ) {}

  /**
   * Handles user signup by creating a new inactive user, encrypting their password, and sending a signup OTP.
   *
   * @async
   * @param {SignupDto} signupDto - Data transfer object containing user sign-up details.
   * @returns {Promise<User>} The created user entity.
   * @throws {ConflictException} If the email or username already exists.
   */
  async signupService(signupDto: SignupDto): Promise<User> {
    const { username, email, password, role } = signupDto;

    let user = await this.userService.getUser({ email });
    if (user) {
      throw new ConflictException('email already exist');
    }
    user = await this.userService.getUser({ username });
    if (user) {
      throw new ConflictException('username already exist');
    }

    const encryptedPassword = await this.passwordService.encryptPassword(password);

    const createUser = await this.userService.createUser({
      username,
      email,
      password: encryptedPassword,
      status: UserStatus.INACTIVE,
      role: role || UserRole.USER, // Set default role to USER if not provided
    });

    await this.otpService.generateAndSendOtp({
      otpType: OtpType.SIGNUP_USER,
      recipientName: username,
      targetEmail: email,
      userId: createUser.id,
    });

    return createUser;
  }

  /**
   * Resend the signup OTP to a user.
   *
   * @async
   * @param {ResendSignupDto} resendSignupDto - Data transfer object containing user email for OTP resend.
   * @returns {Promise<ResendSignupResponseDTO>} Response object indicating OTP resend status.
   * @throws {NotFoundException} If the user is not found.
   */
  async resendSignupService(resendSignupDto: ResendSignupDto): Promise<ResendSignupResponseDTO> {
    const { email } = resendSignupDto;

    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new ResourceNotFoundException('Not found user');
    }

    const res = await this.otpService.generateAndSendOtp({
      otpType: OtpType.SIGNUP_USER,
      recipientName: user.username,
      targetEmail: email,
      userId: user.id,
    });

    return {
      success: res.success,
      message: res.message,
      retryAfter: this.otpService.retryInMin,
      expiresIn: this.otpService.expiresInMin,
    };
  }

  /**
   * Verifies the signup OTP for a user.
   *
   * @async
   * @param {VerifySignupOtpDto} verifySignupOtpDto - Data transfer object containing user email and OTP for verification.
   * @returns {Promise<VerifySignupOtpResponseDto>} Response object indicating OTP verification status.
   * @throws {ResourceNotFoundException} If the user is not found or OTP verification fails.
   */
  async verifySignupOtpService(
    verifySignupOtpDto: VerifySignupOtpDto,
  ): Promise<VerifySignupOtpResponseDto> {
    const { email, otp } = verifySignupOtpDto;
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new ResourceNotFoundException('Not found user');
    }
    const isValidOTP = await this.otpService.isValidOtp(user.id, OtpType.SIGNUP_USER, otp);
    if (isValidOTP) {
      const updatedUser = await this.userService.updateUser(user.id, {
        status: UserStatus.ACTIVE,
      });

      // Validate the return value
      if (updatedUser.status !== UserStatus.ACTIVE) {
        throw new Error('Failed to update user status to ACTIVE');
      }
      return {
        message: 'OTP verified successfully.',
      };
    } else {
      throw new BadRequestException('OTP verification failed.');
    }
  }

  /**
   * Logs in a user by validating credentials and generating access and refresh tokens.
   *
   * @async
   * @param {LoginDto} loginDto - Data transfer object containing user login details.
   * @returns {Promise<{ user: User; access_token: string; refreshToken: string; }>} Tokens and user information.
   * @throws {UnauthorizedException} If credentials are invalid or the user account is inactive.
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }
    const isCorrectPassword = await this.passwordService.comparePassword(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('invalid email or password');
    }

    if (user.status === UserStatus.ACTIVE) {
      const payload: TokenPayload = { email, id: user.id };
      const access_token = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      });

      // Exclude the password field from the returned user object
      delete user.password;

      return {
        user,
        access_token,
        refreshToken,
      };
    } else {
      throw new UnauthorizedException('Your account is inactive. Please activate it to proceed.');
    }
  }
  /**
   * Refreshes access and refresh tokens.
   *
   * @async
   * @param {string} refreshToken - The user's refresh token.
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} New tokens.
   * @throws {UnauthorizedException} If the refresh token is invalid.
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign(
        {
          username: payload.username,
          id: payload.id,
        },
        {
          expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
        },
      );

      const newRefreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Changes the password for a user.
   *
   * @async
   * @param {string} userId - The ID of the user.
   * @param {ChangePasswordDto} changePasswordDTO - Data transfer object containing old and new passwords.
   * @returns {Promise<User>} The updated user entity without the password field.
   * @throws {ResourceNotFoundException} If the user is not found.
   * @throws {BadRequestException} If the old password is incorrect.
   */
  async changePassword(userId: string, changePasswordDTO: ChangePasswordDto): Promise<User> {
    const { oldPassword, newPassword } = changePasswordDTO;

    // Fetch the user from the DB
    const user = await this.userService.getUser({ id: userId });

    // Check if the user exists
    if (!user) {
      throw new ResourceNotFoundException('User not found');
    }

    // Check if the encrypted old password matches the stored password
    const isCorrectOldPassword = await this.passwordService.comparePassword(
      oldPassword,
      user.password,
    );

    if (!isCorrectOldPassword) {
      throw new BadRequestException('Old password is incorrect');
    }

    // Encrypt the new password
    const newEncryptedPassword: string = await this.passwordService.encryptPassword(newPassword);

    // Update the user's password in the database
    const updatedUser: User = await this.userService.updateUser(user.id, {
      password: newEncryptedPassword,
    });

    // Delete the password field from the response object
    delete updatedUser.password;

    // Return the updated user object without the password
    return updatedUser;
  }

  /**
   * Retrieves a user by their email address.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @returns {Promise<User>} The user entity.
   * @throws {HttpException} If the user is not found.
   */
  async getUserByEmail(email: string): Promise<User> {
    return this.userService.getUser({ email });
  }

  /**
   * Generates and sends an OTP to the user's email address.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @returns {Promise<void>}
   * @throws {ResourceNotFoundException} If the user is not found.
   */
  async generateAndSendOtp(email: string): Promise<void> {
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new ResourceNotFoundException('User not found');
    }
    await this.otpService.generateAndSendOtp({
      otpType: OtpType.RESET_PASSWORD,
      recipientName: user.username,
      targetEmail: email,
      userId: user.id,
    });
  }

  /**
   * Validates the OTP for the given email address.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @param {number} otp - The OTP to validate.
   * @returns {Promise<boolean>} True if the OTP is valid, false otherwise.
   * @throws {ResourceNotFoundException} If the user is not found.
   */
  async validateOtp(email: string, otp: number): Promise<boolean> {
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new ResourceNotFoundException('User not found');
    }
    return this.otpService.isValidOtp(user.id, OtpType.RESET_PASSWORD, otp);
  }

  /**
   * Resets the user's password.
   *
   * @async
   * @param {string} email - The email address of the user.
   * @param {string} newPassword - The new password to set.
   * @returns {Promise<void>}
   * @throws {ResourceNotFoundException} If the user is not found.
   */
  async resetPassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new ResourceNotFoundException('User not found');
    }
    const encryptedPassword = await this.passwordService.encryptPassword(newPassword);
    await this.userService.updateUser(user.id, { password: encryptedPassword });
  }
}
