import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
} from '../dto';
import { OtpService, OtpType } from 'src/otp';

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
   * @throws {HttpException} If the email or username already exists.
   */
  async signupService(signupDto: SignupDto): Promise<User> {
    const { username, email, password } = signupDto;

    let user = await this.userService.getUser({ email });
    if (user) {
      throw new HttpException('email already exist', HttpStatus.CONFLICT);
    }
    user = await this.userService.getUser({ username });
    if (user) {
      throw new HttpException('username already exist', HttpStatus.CONFLICT);
    }

    const encryptedPassword =
      await this.passwordService.encryptPassword(password);

    const createUser = await this.userService.createUser({
      username,
      email,
      password: encryptedPassword,
      status: UserStatus.INACTIVE,
    });

    this.otpService.generateAndSendOtp({
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
   * @throws {HttpException} If the user is not found.
   */
  async resendSignupService(
    resendSignupDto: ResendSignupDto,
  ): Promise<ResendSignupResponseDTO> {
    const { email } = resendSignupDto;

    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
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
   * @throws {HttpException} If the user is not found or OTP verification fails.
   */
  async verifySignupOtpService(
    verifySignupOtpDto: VerifySignupOtpDto,
  ): Promise<VerifySignupOtpResponseDto> {
    const { email, otp } = verifySignupOtpDto;
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    const isValidOTP = await this.otpService.isValidOtp(
      user.id,
      OtpType.SIGNUP_USER,
      otp,
    );
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
      throw new HttpException(
        'OTP verification failed.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Logs in a user by validating credentials and generating access and refresh tokens.
   *
   * @async
   * @param {LoginDto} loginDto - Data transfer object containing user login details.
   * @returns {Promise<{ user: User; access_token: string; refreshToken: string; }>} Tokens and user information.
   * @throws {HttpException} If credentials are invalid or the user account is inactive.
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isCorrectPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new HttpException(
        'invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user.status === UserStatus.ACTIVE) {
      const payload: TokenPayload = { email, id: user.id };
      const access_token = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      });

      // Exclude the password field from the returned user object
      const { id, username, status } = user;

      return {
        user: { id, username, email, status },
        access_token,
        refreshToken,
      };
    } else {
      throw new HttpException(
        'Your account is inactive. Please activate it to proceed.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  /**
   * Refreshes access and refresh tokens.
   *
   * @async
   * @param {string} refreshToken - The user's refresh token.
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} New tokens.
   * @throws {HttpException} If the refresh token is invalid.
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign({
        username: payload.username,
        id: payload.id,
      });
      const newRefreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }
}
