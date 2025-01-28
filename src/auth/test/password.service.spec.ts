import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { PasswordService } from '../service';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt');

jest.mock('bcrypt');

describe('PasswordService', () => {
  let service: PasswordService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  afterEach(() => {
    jest.resetAllMocks(); // Reset all mocks after each test
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('10') }, // Mock config service
        },
      ],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return encrypted password', async () => {
    const password = 'password123';
    const salt = 'mockedSalt'; // The mocked salt value
    const encryptedPassword = 'encryptedPassword'; // The mocked encrypted password

    // Mock bcrypt.genSalt to return the mocked salt
    bcrypt.genSalt.mockResolvedValue(salt);

    // Mock bcrypt.hash to return the mocked encrypted password
    bcrypt.hash.mockResolvedValue(encryptedPassword);

    // Call the method
    const result = await service.encryptPassword(password);

    // Check if bcrypt.genSalt was called with the correct number of rounds
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);

    // Check if bcrypt.hash was called with the password and the generated salt
    expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);

    // Check if the result is the expected encrypted password
    expect(result).toBe(encryptedPassword);
  });

  describe('comparePassword', () => {
    it('should return true if passwords match', async () => {
      const rawPassword = 'password123';
      const hashedPassword = 'hashedPassword';
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const result = await service.comparePassword(rawPassword, hashedPassword);
      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(rawPassword, hashedPassword);
    });

    it('should return false if passwords do not match', async () => {
      const rawPassword = 'password123';
      const hashedPassword = 'wrongPassword';
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const result = await service.comparePassword(rawPassword, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
