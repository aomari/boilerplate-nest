import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthService } from '../service/auth.service';
import { UserService } from 'src/user';
import { PasswordService } from '../service/password.service';
import { OtpService } from 'src/otp';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import type { SignupDto, LoginDto, VerifySignupOtpDto } from '../dto';
import { UserStatus } from 'src/user/user.enum';
import { UserRole } from 'src/user/user-role.enum';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, I18nService } from 'nestjs-i18n';
import * as path from 'path';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
  };

  const mockPasswordService = {
    encryptPassword: jest.fn(),
    comparePassword: jest.fn(),
  };

  const mockOtpService = {
    generateAndSendOtp: jest.fn(),
    isValidOtp: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockI18nService = {
    translate: jest.fn().mockImplementation((key) => {
      const translations = {
        'auth.emailAlreadyExist': 'Email already exists',
        'auth.invalidEmailOrPassword': 'Invalid email or password',
        'auth.otpVerifiedSuccessfully': 'OTP verified successfully',
        // Add other necessary translations here
      };
      return translations[key] || key; // Default to returning the key if not found
    }),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mocked-config-value'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        I18nModule.forRoot({
          fallbackLanguage: 'en',
          loaderOptions: {
            path: path.join(__dirname, 'src', '../../../i18n/'),
            watch: true,
          },
          resolvers: [AcceptLanguageResolver],
        }),
      ],
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: PasswordService, useValue: mockPasswordService },
        { provide: OtpService, useValue: mockOtpService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: I18nService, useValue: mockI18nService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signupService', () => {
    it('should create a new user and send OTP', async () => {
      const signupDto: SignupDto = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: 'Test@123',
        role: UserRole.USER,
      };

      mockUserService.getUser.mockResolvedValueOnce(null); // No existing user
      mockPasswordService.encryptPassword.mockResolvedValueOnce('encryptedPassword');
      mockUserService.createUser.mockResolvedValueOnce({
        id: '1',
        ...signupDto,
        status: UserStatus.INACTIVE,
      });
      mockOtpService.generateAndSendOtp.mockResolvedValueOnce({ success: true });

      const result = await service.signupService(signupDto);
      expect(result).toHaveProperty('id');
      expect(mockOtpService.generateAndSendOtp).toHaveBeenCalledWith({
        otpType: 'SignUp',
        recipientName: signupDto.username,
        targetEmail: signupDto.email,
        userId: result.id,
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      mockUserService.getUser.mockResolvedValueOnce({ email: 'amjad2@test.com' });

      const signupDto: SignupDto = {
        username: faker.internet.username(),
        email: 'amjad2@test.com',
        password: 'Test@123',
        role: UserRole.USER,
      };

      await expect(service.signupService(signupDto)).rejects.toThrow(
        new ConflictException('Email already exists'),
      );
    });
  });

  describe('verifySignupOtpService', () => {
    it('should verify OTP and activate user', async () => {
      const verifyDto: VerifySignupOtpDto = { email: 'amjad2@test.com', otp: 12345 };
      mockUserService.getUser.mockResolvedValueOnce({
        email: 'amjad2@test.com',
        status: UserStatus.INACTIVE,
        id: '1',
      });
      mockOtpService.isValidOtp.mockResolvedValueOnce(true);
      mockUserService.updateUser.mockResolvedValueOnce({
        id: '1',
        email: 'amjad2@test.com',
        status: UserStatus.ACTIVE,
      });

      const result = await service.verifySignupOtpService(verifyDto);
      expect(result.message).toBe('OTP verified successfully');
    });

    it('should throw BadRequestException if OTP is invalid', async () => {
      const verifyDto: VerifySignupOtpDto = { email: 'amjad2@test.com', otp: 12345 };
      mockUserService.getUser.mockResolvedValueOnce({
        email: 'amjad2@test.com',
        status: UserStatus.INACTIVE,
        id: '1',
      });
      mockOtpService.isValidOtp.mockResolvedValueOnce(false);

      await expect(service.verifySignupOtpService(verifyDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return access and refresh tokens', async () => {
      const loginDto: LoginDto = { email: 'amjad2@test.com', password: 'Test@123' };
      mockUserService.getUser.mockResolvedValueOnce({
        email: 'amjad2@test.com',
        password: 'encryptedPassword',
        status: UserStatus.ACTIVE,
        role: UserRole.ADMIN,
      });
      mockPasswordService.comparePassword.mockResolvedValueOnce(true);
      mockJwtService.sign.mockReturnValueOnce('accessToken').mockReturnValueOnce('refreshToken');

      const result = await service.login(loginDto);
      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginDto: LoginDto = { email: 'invalid@test.com', password: 'wrongPassword' };
      mockUserService.getUser.mockResolvedValueOnce(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        new UnauthorizedException('Invalid email or password'),
      );
    });
  });
});
