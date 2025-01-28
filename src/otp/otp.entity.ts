import { Entity, Column, ManyToOne, JoinColumn, Unique, PrimaryColumn } from 'typeorm';

import { User } from 'src/user/user.entity';
import { OtpType } from './otp.enum';

/**
 * Represents an OTP (One-Time Password) entity for authentication purposes.
 * This entity is used to store OTP details for specific users, including
 * the OTP value, type, and timestamp when the OTP was sent.
 *
 * @export
 * @class Otp
 * @typedef {Otp}
 */
@Entity('otps')
@Unique(['userId', 'type'])
export class Otp {
  /**
   * The unique identifier for the user associated with the OTP.
   *
   * @type {string}
   */
  @PrimaryColumn()
  userId: string;

  /**
   * The user entity linked to the OTP.
   * This establishes a foreign key relationship with the `User` entity.
   *
   * @type {User}
   */
  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * The numeric OTP value sent to the user.
   *
   * @type {number}
   */
  @Column()
  otp: number;

  /**
   * The timestamp indicating when the OTP was sent.
   *
   * @type {Date}
   */
  @Column()
  sentAt: Date;

  /**
   * The type of OTP, indicating whether it is used for sign-up or password recovery.
   *
   * @type {OtpType}
   */
  @PrimaryColumn()
  type: OtpType;
}
