import type { TemplateType } from 'src/common';
import type { OtpType } from './otp.enum';

/**
 * Parameters required to send an OTP email to a user.
 *
 * @export
 * @interface SendOtpMailParams
 */
export interface SendOtpMailParams {
  /**
   * The type of email template to use for the OTP email.
   *
   * @type {TemplateType}
   */
  templateType: TemplateType;

  /**
   * The subject line of the OTP email.
   *
   * @type {string}
   */
  subject: string;

  /**
   * The recipient's email address where the OTP will be sent.
   *
   * @type {string}
   */
  targetEmail: string;

  /**
   * The name of the recipient to personalize the OTP email.
   *
   * @type {string}
   */
  recipientName: string;

  /**
   * The OTP code to be included in the email.
   *
   * @type {number}
   */
  otp: number;
}

/**
 * Parameters required to generate and send an OTP for a specific user action.
 *
 * @export
 * @interface GenerateAndSendOtpParams
 */
export interface GenerateAndSendOtpParams {
  /**
   * The type of OTP to generate (e.g., for sign-up or password recovery).
   *
   * @type {OtpType}
   */
  otpType: OtpType;

  /**
   * The recipient's email address where the OTP will be sent.
   *
   * @type {string}
   */
  targetEmail: string;

  /**
   * The name of the recipient to personalize the OTP email.
   *
   * @type {string}
   */
  recipientName: string;

  /**
   * The unique identifier of the user requesting the OTP.
   *
   * @type {string}
   */
  userId: string;
}

/**
 * Response object returned after attempting to generate and send an OTP.
 *
 * @export
 * @interface GenerateAndSendOtpResponse
 */
export interface GenerateAndSendOtpResponse {
  /**
   * Indicates whether the OTP was successfully generated and sent.
   *
   * @type {boolean}
   */
  success: boolean;

  /**
   * A descriptive message providing details about the result of the operation.
   *
   * @type {string}
   */
  message: string;
}
