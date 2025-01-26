import type { UserRole } from 'src/user/user-role.enum';

/**
 * Represents the payload data contained in a token, typically used for authentication
 * and authorization purposes.
 *
 * @export
 * @interface TokenPayload
 */
export interface TokenPayload {
  /**
   * The email address associated with the user.
   *
   * @type {string}
   */
  email: string;

  /**
   * The unique identifier of the user.
   *
   * @type {string}
   */
  id: string;

  /**
   * The role of the user.
   *
   * @type {UserRole}
   */
  role: UserRole;
}
