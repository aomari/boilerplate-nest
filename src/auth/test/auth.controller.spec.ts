import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { UserRole } from 'src/user/user-role.enum';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../service';
import { AuthController } from '../auth.controller';
import type { ResendSignupDto, SignupDto, VerifySignupOtpDto } from '../dto';

describe('AuthController', () => {
  let authController: AuthController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let authService: AuthService;

  const mockAuthService = {
    signupService: jest.fn(),
    resendSignupService: jest.fn(),
    verifySignupOtpService: jest.fn(),
    login: jest.fn(),
    refreshToken: jest.fn(),
    getUserByEmail: jest.fn(),
    generateAndSendOtp: jest.fn(),
    validateOtp: jest.fn(),
    resetPassword: jest.fn(),
    changePassword: jest.fn(),
  };

  const mockUserService = {
    getUser: jest.fn(),
    createUser: jest.fn(),
  };

  const testUsers = [
    {
      username: 'Amjad AlOmari',
      email: 'amjad1@test.com',
      password: 'Test@123',
      role: UserRole.USER,
    },
    {
      username: 'aomari',
      email: 'amjad2@test.com',
      password: 'Test@123',
      role: UserRole.ADMIN,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user account', async () => {
      const signupDto: SignupDto = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 8 }),
      };

      const expectedResponse = {
        id: faker.number.int(),
        username: signupDto.username,
        email: signupDto.email,
        role: UserRole.USER,
      };

      mockAuthService.signupService.mockResolvedValue(expectedResponse);

      const result = await authController.signup(signupDto);

      expect(mockAuthService.signupService).toHaveBeenCalledWith(signupDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw a conflict exception if email or username exists', async () => {
      const signupDto: SignupDto = testUsers[0];
      mockAuthService.signupService.mockRejectedValue(
        new BadRequestException('Username or email already exists'),
      );

      await expect(authController.signup(signupDto)).rejects.toThrow(BadRequestException);
      expect(mockAuthService.signupService).toHaveBeenCalledWith(signupDto);
    });
  });

  describe('resendSignupOtp', () => {
    it('should resend OTP for a user', async () => {
      const resendSignupDto: ResendSignupDto = { email: testUsers[0].email };
      const expectedResponse = { message: 'OTP resent successfully.' };

      mockAuthService.resendSignupService.mockResolvedValue(expectedResponse);

      const result = await authController.resendSignupOtp(resendSignupDto);
      expect(mockAuthService.resendSignupService).toHaveBeenCalledWith(resendSignupDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const resendSignupDto: ResendSignupDto = { email: 'unknown@test.com' };
      mockAuthService.resendSignupService.mockRejectedValue(
        new NotFoundException('User not found'),
      );

      await expect(authController.resendSignupOtp(resendSignupDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockAuthService.resendSignupService).toHaveBeenCalledWith(resendSignupDto);
    });
  });

  describe('verifySignupOtp', () => {
    it('should verify OTP successfully', async () => {
      const verifySignupOtpDto: VerifySignupOtpDto = {
        email: testUsers[0].email,
        otp: 12345,
      };
      const expectedResponse = { message: 'OTP verified successfully' };

      mockAuthService.verifySignupOtpService.mockResolvedValue(expectedResponse);

      const result = await authController.verifySignupOtp(verifySignupOtpDto);
      expect(mockAuthService.verifySignupOtpService).toHaveBeenCalledWith(verifySignupOtpDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw BadRequestException for invalid OTP', async () => {
      const verifySignupOtpDto: VerifySignupOtpDto = {
        email: testUsers[0].email,
        otp: 12345,
      };

      mockAuthService.verifySignupOtpService.mockRejectedValue(
        new BadRequestException('Invalid OTP'),
      );

      await expect(authController.verifySignupOtp(verifySignupOtpDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockAuthService.verifySignupOtpService).toHaveBeenCalledWith(verifySignupOtpDto);
    });
  });
});
