import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

/**
 * Service for managing password encryption and validation, utilizing bcrypt.
 *
 * @export
 * @class PasswordService
 */
@Injectable()
export class PasswordService {
  /**
   * Creates an instance of PasswordService.
   *
   * @constructor
   * @param {ConfigService} configService - Service for accessing application configuration settings.
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Encrypts a plain text password using bcrypt with a configurable number of salt rounds.
   *
   * @async
   * @param {string} password - The plain text password to encrypt.
   * @returns {Promise<string>} A promise that resolves to the hashed password.
   */
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_PASSWORD_HASH_SALTS_ROUNDS'),
    );
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compares a plain text password with a hashed password to verify a match.
   *
   * @async
   * @param {string} password - The plain text password provided by the user.
   * @param {string} hashedPassword - The hashed password stored in the database.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the passwords match, or `false` otherwise.
   */
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
