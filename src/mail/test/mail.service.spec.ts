import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail.service';
import * as nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

jest.mock('nodemailer'); // Mock the entire nodemailer module

describe('MailService', () => {
  let mailService: MailService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        MAIL_FROM: 'Rawabi City Mobile <RawabiCityMobile@asaltech.com>',
        MAIL_HOST: 'mail.asaltech.com',
        MAIL_PORT: 587,
        MAIL_USER: 'RawabiCityMobile@asaltech.com',
        MAIL_PASS: 'Val!2@3451',
      };
      return config[key];
    }),
  };

  const mockSendMail = jest.fn();

  beforeEach(async () => {
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService, { provide: ConfigService, useValue: mockConfigService }],
    }).compile();

    mailService = module.get<MailService>(MailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });

  it('should initialize transporter with correct configuration', () => {
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: 'mail.asaltech.com',
      port: 587,
      secure: false,
      auth: {
        user: 'RawabiCityMobile@asaltech.com',
        pass: 'Val!2@3451',
      },
    });
  });

  it('should send email successfully', async () => {
    mockSendMail.mockResolvedValueOnce(true);

    const mailOptions: Mail.Options = {
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
    };

    const result = await mailService.sendMail(mailOptions);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'Rawabi City Mobile <RawabiCityMobile@asaltech.com>',
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
    });
    expect(result).toBe(true);
  });

  it('should handle errors when sending email', async () => {
    mockSendMail.mockRejectedValueOnce(new Error('SMTP Error'));

    const mailOptions: Mail.Options = {
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
    };

    const result = await mailService.sendMail(mailOptions);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: 'Rawabi City Mobile <RawabiCityMobile@asaltech.com>',
      to: 'test@example.com',
      subject: 'Test Email',
      text: 'This is a test email',
    });
    expect(result).toBe(false);
  });
});
