import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { OtpService } from '../otp.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Otp } from '../otp.entity';
import { MailService } from 'src/mail';
import { OtpType } from '../otp.enum';
import type { Repository } from 'typeorm';
import { LoggerService } from 'src/logger';

describe('OtpService', () => {
  let otpService: OtpService;
  let otpRepository: Repository<Otp>;
  let mailService: MailService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let loggerService: LoggerService;

  const mockOtpRepository = {
    findOne: jest.fn(),
    upsert: jest.fn(),
  };

  const mockMailService = {
    sendMail: jest.fn(),
  };

  const mockLoggerService = {
    log: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OtpService,
        { provide: getRepositoryToken(Otp), useValue: mockOtpRepository },
        { provide: MailService, useValue: mockMailService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    otpService = module.get<OtpService>(OtpService);
    otpRepository = module.get<Repository<Otp>>(getRepositoryToken(Otp));
    mailService = module.get<MailService>(MailService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(otpService).toBeDefined();
  });

  describe('generateOTP', () => {
    it('should generate a valid OTP', () => {
      const otp = otpService['generateOTP']();
      expect(otp).toBeGreaterThanOrEqual(10000);
      expect(otp).toBeLessThan(100000);
    });
  });

  describe('isWithinTimeLimit', () => {
    it('should return true if the time is within the limit', () => {
      const sentAt = new Date();
      expect(otpService['isWithinTimeLimit'](sentAt, 30)).toBe(true);
    });

    it('should return false if the time exceeds the limit', () => {
      const sentAt = new Date(new Date().getTime() - 60 * 60 * 1000); // 1 hour ago
      expect(otpService['isWithinTimeLimit'](sentAt, 30)).toBe(false);
    });
  });

  describe('generateAndSendOtp', () => {
    const generateOtpParams = {
      otpType: OtpType.SIGNUP_USER,
      targetEmail: 'user@example.com',
      recipientName: 'John Doe',
      userId: '123',
    };

    it('should return success message when OTP is sent', async () => {
      jest.spyOn(otpRepository, 'findOne').mockResolvedValueOnce(null); // Simulate no previous OTP found
      jest.spyOn(otpRepository, 'upsert').mockResolvedValueOnce(undefined);
      jest.spyOn(mailService, 'sendMail').mockResolvedValueOnce(true);

      const result = await otpService.generateAndSendOtp(generateOtpParams);

      expect(result.success).toBe(true);
      expect(result.message).toBe('OTP has been sent successfully.');
    });

    it('should return error if OTP type is invalid', async () => {
      const invalidParams = { ...generateOtpParams, otpType: 'InvalidType' as OtpType };
      const result = await otpService.generateAndSendOtp(invalidParams);

      expect(result.success).toBe(false);
      expect(result.message).toBe('invalid otp type');
    });

    it('should return error if too many OTP requests are made within a short time', async () => {
      jest.spyOn(otpRepository, 'findOne').mockResolvedValueOnce({
        sentAt: new Date(),
        otp: 12345,
      } as Otp);
      jest.spyOn(otpRepository, 'upsert').mockResolvedValueOnce(undefined);
      const result = await otpService.generateAndSendOtp(generateOtpParams);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Too many requests. Please try again later.');
    });

    it('should handle error during OTP email sending', async () => {
      jest.spyOn(otpRepository, 'findOne').mockResolvedValueOnce(null); // Simulate no previous OTP found
      jest.spyOn(otpRepository, 'upsert').mockResolvedValueOnce(undefined);
      jest.spyOn(mailService, 'sendMail').mockResolvedValueOnce(false);

      const result = await otpService.generateAndSendOtp(generateOtpParams);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to send OTP mail.');
    });
  });

  describe('isValidOtp', () => {
    it('should return true for valid OTP', async () => {
      jest.spyOn(otpRepository, 'findOne').mockResolvedValueOnce({
        otp: 12345,
        sentAt: new Date(),
      } as Otp);

      const result = await otpService.isValidOtp('123', OtpType.SIGNUP_USER, 12345);
      expect(result).toBe(true);
    });

    it('should return false for expired OTP', async () => {
      jest.spyOn(otpRepository, 'findOne').mockResolvedValueOnce({
        otp: 12345,
        sentAt: new Date(new Date().getTime() - 60 * 60 * 1000), // 1 hour ago
      } as Otp);

      const result = await otpService.isValidOtp('123', OtpType.SIGNUP_USER, 12345);
      expect(result).toBe(false);
    });

    it('should return false for invalid OTP', async () => {
      jest.spyOn(otpRepository, 'findOne').mockResolvedValueOnce({
        otp: 12345,
        sentAt: new Date(),
      } as Otp);

      const result = await otpService.isValidOtp('123', OtpType.SIGNUP_USER, 99999);
      expect(result).toBe(false);
    });
  });
});
