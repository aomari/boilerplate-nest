/**
 * Enum representing the type of OTP (One-Time Password) used for user authentication processes.
 * It distinguishes between OTPs sent for user sign-up and password recovery.
 *
 * @export
 * @enum {string}
 */
export enum OtpType {
  SIGNUP_USER = 'SignUp', // OTP for user sign-up
  RESET_PASSWORD = 'ResetPassword', // OTP for password recovery
}
