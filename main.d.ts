declare module 'app.service' {
  export class AppService {
    getHello(): string;
  }
}
declare module 'app.controller' {
  import { AppService } from 'app.service';
  export class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
  }
}
declare module 'user/user.controller' {
  export class UserController {}
}
declare module 'mail/mail.service' {
  import { ConfigService } from '@nestjs/config';
  import Mail from 'nodemailer/lib/mailer';
  export class MailService {
    private configService;
    private transporter;
    private fromEmail;
    constructor(configService: ConfigService);
    sendMail(mailOptions: Mail.Options): Promise<boolean>;
  }
}
declare module 'mail/mail.module' {
  export class MailModule {}
}
declare module 'mail/index' {
  export * from 'mail/mail.module';
  export * from 'mail/mail.service';
}
declare module 'common/pipes/validation.pipe' {
  import { ValidationPipe } from '@nestjs/common';
  export const DtoValidationPipe: ValidationPipe;
}
declare module 'common/pipes/index' {
  export * from 'common/pipes/validation.pipe';
}
declare module 'common/exception/genericHttp.exception' {
  import { HttpException, HttpStatus } from '@nestjs/common';
  export class GenericHttpException extends HttpException {
    constructor(
      errors: {
        property: string;
        constraints: string[];
      }[],
      status: HttpStatus,
    );
  }
}
declare module 'common/exception/index' {
  export * from 'common/exception/genericHttp.exception';
}
declare module 'common/template/templateType.enum' {
  export enum TemplateType {
    VerifyEmail = 'verify-otp.template.ejs',
    ForgetPassword = 'forget-password-otp.template.ejs',
  }
}
declare module 'common/template/index' {
  export * from 'common/template/templateType.enum';
}
declare module 'common/index' {
  export * from 'common/pipes/index';
  export * from 'common/exception/index';
  export * from 'common/template/index';
}
declare module 'otp/otp.enum' {
  export enum OtpType {
    SIGNUP_USER = 'SignUp',
    RESET_PASSWORD = 'ResetPassword',
  }
}
declare module 'otp/otp.interface' {
  import type { TemplateType } from 'common/index';
  import type { OtpType } from 'otp/otp.enum';
  export interface SendOtpMailParams {
    templateType: TemplateType;
    subject: string;
    targetEmail: string;
    recipientName: string;
    otp: number;
  }
  export interface GenerateAndSendOtpParams {
    otpType: OtpType;
    targetEmail: string;
    recipientName: string;
    userId: string;
  }
  export interface GenerateAndSendOtpResponse {
    success: boolean;
    message: string;
  }
}
declare module 'otp/otp.entity' {
  import { User } from 'user/index';
  import { OtpType } from 'otp/otp.enum';
  export class Otp {
    userId: string;
    user: User;
    otp: number;
    sentAt: Date;
    type: OtpType;
  }
}
declare module 'otp/otp.service' {
  import { MailService } from 'mail/index';
  import { Repository } from 'typeorm';
  import { GenerateAndSendOtpParams, GenerateAndSendOtpResponse } from 'otp/otp.interface';
  import { OtpType } from 'otp/otp.enum';
  import { Otp } from 'otp/otp.entity';
  export class OtpService {
    private readonly otpRepository;
    private readonly mailService;
    expiresInMin: number;
    retryInMin: number;
    constructor(otpRepository: Repository<Otp>, mailService: MailService);
    private generateOTP;
    private isWithinTimeLimit;
    private sendOtpMail;
    generateAndSendOtp(params: GenerateAndSendOtpParams): Promise<GenerateAndSendOtpResponse>;
    isValidOtp(userId: string, otpType: OtpType, otp: number): Promise<boolean>;
  }
}
declare module 'logger/logger.service' {
  import 'winston-daily-rotate-file';
  export class LoggerService {
    private logger;
    constructor();
    private formatMessage;
    debug(message: string, requestId?: string): void;
    info(message: string, requestId?: string): void;
    warn(message: string, requestId?: string): void;
    error(message: string, trace?: string, requestId?: string): void;
  }
}
declare module 'logger/logger.module' {
  export class LoggerModule {}
}
declare module 'logger/index' {
  export * from 'logger/logger.module';
  export * from 'logger/logger.service';
}
declare module 'otp/otp.module' {
  export class OtpModule {}
}
declare module 'otp/index' {
  export * from 'otp/otp.module';
  export * from 'otp/otp.service';
  export * from 'otp/otp.entity';
  export * from 'otp/otp.interface';
  export * from 'otp/otp.enum';
}
declare module 'user/user-role.enum' {
  export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
  }
}
declare module 'user/user.entity' {
  import { Otp } from 'otp/index';
  import { UserRole } from 'user/user-role.enum';
  export class User {
    id?: string;
    username: string;
    email: string;
    password: string;
    status: string;
    otps?: Otp[];
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    profilePicture?: string;
    role: UserRole;
  }
}
declare module 'user/user.service' {
  import { User } from 'user/user.entity';
  import { Repository } from 'typeorm';
  export class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(user: User): Promise<User>;
    getUser(getUser: { id?: string; email?: string; username?: string }): Promise<User>;
    updateUser(id: string, updateUser: Partial<User>): Promise<User>;
  }
}
declare module 'user/user.module' {
  export class UserModule {}
}
declare module 'user/user.enum' {
  export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted',
  }
}
declare module 'user/index' {
  export * from 'user/user.module';
  export * from 'user/user.controller';
  export * from 'user/user.service';
  export * from 'user/user.entity';
  export * from 'user/user.enum';
}
declare module 'auth/service/password.service' {
  import { ConfigService } from '@nestjs/config';
  export class PasswordService {
    private readonly configService;
    constructor(configService: ConfigService);
    encryptPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  }
}
declare module 'auth/auth.interface' {
  export interface TokenPayload {
    email: string;
    id: string;
  }
}
declare module 'auth/dto/resendSignup.dto' {
  export class ResendSignupDto {
    email: string;
  }
}
declare module 'auth/dto/signup.dto' {
  import { UserRole } from 'user/user-role.enum';
  export class SignupDto {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
  }
}
declare module 'auth/dto/login.dto' {
  export class LoginDto {
    email: string;
    password: string;
  }
}
declare module 'auth/dto/refreshToken.dto' {
  export class RefreshTokenDto {
    refreshToken: string;
  }
}
declare module 'auth/dto/verifySignupOtp.dto' {
  export class VerifySignupOtpDto {
    email: string;
    otp: number;
  }
}
declare module 'auth/dto/resendSignupResponse.dto' {
  export class ResendSignupResponseDTO {
    success: boolean;
    message: string;
    retryAfter: number;
    expiresIn?: number;
  }
}
declare module 'auth/dto/verifySignupOtpResponse.dto' {
  export class VerifySignupOtpResponseDto {
    message: string;
  }
}
declare module 'auth/dto/index' {
  export * from 'auth/dto/signup.dto';
  export * from 'auth/dto/login.dto';
  export * from 'auth/dto/refreshToken.dto';
  export * from 'auth/dto/resendSignup.dto';
  export * from 'auth/dto/verifySignupOtp.dto';
  export * from 'auth/dto/resendSignupResponse.dto';
  export * from 'auth/dto/verifySignupOtpResponse.dto';
}
declare module 'auth/dto/change-password.dto' {
  export class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
  }
}
declare module 'auth/service/auth.service' {
  import { JwtService } from '@nestjs/jwt';
  import { User, UserService } from 'user/index';
  import { ConfigService } from '@nestjs/config';
  import { PasswordService } from 'auth/service/password.service';
  import { ResendSignupDto } from 'auth/dto/resendSignup.dto';
  import {
    LoginDto,
    SignupDto,
    VerifySignupOtpResponseDto,
    VerifySignupOtpDto,
    ResendSignupResponseDTO,
  } from 'auth/dto/index';
  import { OtpService } from 'otp/index';
  import { ChangePasswordDto } from 'auth/dto/change-password.dto';
  export class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly userService;
    private readonly passwordService;
    private readonly otpService;
    constructor(
      jwtService: JwtService,
      configService: ConfigService,
      userService: UserService,
      passwordService: PasswordService,
      otpService: OtpService,
    );
    signupService(signupDto: SignupDto): Promise<User>;
    resendSignupService(resendSignupDto: ResendSignupDto): Promise<ResendSignupResponseDTO>;
    verifySignupOtpService(
      verifySignupOtpDto: VerifySignupOtpDto,
    ): Promise<VerifySignupOtpResponseDto>;
    login(loginDto: LoginDto): Promise<{
      user: User;
      access_token: string;
      refreshToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
      accessToken: string;
      refreshToken: string;
    }>;
    changePassword(userId: string, changePasswordDTO: ChangePasswordDto): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    generateAndSendOtp(email: string): Promise<void>;
    validateOtp(email: string, otp: number): Promise<boolean>;
    resetPassword(email: string, newPassword: string): Promise<void>;
  }
}
declare module 'auth/service/index' {
  export * from 'auth/service/auth.service';
  export * from 'auth/service/password.service';
}
declare module 'guards/jwt-auth.guard' {
  import { ExecutionContext } from '@nestjs/common';
  const JwtAuthGuard_base: import('@nestjs/passport').Type<import('@nestjs/passport').IAuthGuard>;
  export class JwtAuthGuard extends JwtAuthGuard_base {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | import('rxjs').Observable<boolean>;
    handleRequest(err: any, user: any): any;
  }
}
declare module 'auth/dto/reset-password.dto' {
  export class ResetPasswordDto {
    email: string;
    otp: number;
    newPassword: string;
  }
}
declare module 'auth/dto/forget-password.dto' {
  export class ForgetPasswordDto {
    email: string;
  }
}
declare module 'auth/auth.controller' {
  import { AuthService } from 'auth/service/index';
  import { LoginDto, RefreshTokenDto, SignupDto } from 'auth/dto/index';
  import { ResendSignupDto } from 'auth/dto/resendSignup.dto';
  import { ResendSignupResponseDTO } from 'auth/dto/resendSignupResponse.dto';
  import { VerifySignupOtpDto } from 'auth/dto/verifySignupOtp.dto';
  import { VerifySignupOtpResponseDto } from 'auth/dto/verifySignupOtpResponse.dto';
  import { User } from 'user/index';
  import { ChangePasswordDto } from 'auth/dto/change-password.dto';
  import { ResetPasswordDto } from 'auth/dto/reset-password.dto';
  import { ForgetPasswordDto } from 'auth/dto/forget-password.dto';
  export class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<User>;
    resendSignupOtp(resendSignupDto: ResendSignupDto): Promise<ResendSignupResponseDTO>;
    verifySignupOtp(verifySignupOtpDto: VerifySignupOtpDto): Promise<VerifySignupOtpResponseDto>;
    login(loginDto: LoginDto): Promise<{
      user: User;
      access_token: string;
      refreshToken: string;
    }>;
    refreshToken(body: RefreshTokenDto): Promise<{
      accessToken: string;
      refreshToken: string;
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<User>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<{
      message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
      message: string;
    }>;
  }
}
declare module 'auth/strategies/jwt.strategy' {
  import { Strategy } from 'passport-jwt';
  import { ConfigService } from '@nestjs/config';
  const JwtStrategy_base: new (
    ...args:
      | [opt: import('passport-jwt').StrategyOptionsWithRequest]
      | [opt: import('passport-jwt').StrategyOptionsWithoutRequest]
  ) => Strategy & {
    validate(...args: any[]): unknown;
  };
  export class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: { id: number; email: string }): Promise<{
      id: number;
      email: string;
    }>;
  }
}
declare module 'auth/auth.module' {
  export class AuthModule {}
}
declare module 'auth/index' {
  export * from 'auth/auth.module';
  export * from 'auth/auth.controller';
  export * from 'auth/service/index';
  export * from 'auth/dto/index';
  export * from 'auth/auth.interface';
}
declare module 'cleanup/cleanup.service' {
  import { LoggerService } from 'logger/index';
  export class CleanupService {
    private readonly logger;
    constructor(logger: LoggerService);
    cleanOldLogs(): Promise<void>;
  }
}
declare module 'cleanup/cleanup.module' {
  export class CleanupModule {}
}
declare module 'cleanup/index' {
  export * from 'cleanup/cleanup.module';
  export * from 'cleanup/cleanup.service';
}
declare module 'profile/dto/updateProfile.dto' {
  export class UpdateProfileDto {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
  }
}
declare module 'profile/profile.service' {
  import { UserService } from 'user/user.service';
  import { UpdateProfileDto } from 'profile/dto/updateProfile.dto';
  import { User } from 'user/user.entity';
  export class ProfileService {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(userId: string): Promise<User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    updateProfilePicture(userId: string, file: Express.Multer.File): Promise<User>;
  }
}
declare module 'profile/profile.controller' {
  import { ProfileService } from 'profile/profile.service';
  import { UpdateProfileDto } from 'profile/dto/updateProfile.dto';
  import { User } from 'user/user.entity';
  export class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<User>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<User>;
    updateProfilePicture(req: any, file: Express.Multer.File): Promise<User>;
  }
}
declare module 'profile/profile.module' {
  export class ProfileModule {}
}
declare module 'config/database.config' {
  const _default: (() => {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  }) &
    import('@nestjs/config').ConfigFactoryKeyHost<{
      type: string;
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
      synchronize: boolean;
      logging: boolean;
    }>;
  export default _default;
}
declare module 'config/app.config' {
  const _default_1: (() => {
    port: number;
    environment: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    apiPrefix: string;
  }) &
    import('@nestjs/config').ConfigFactoryKeyHost<{
      port: number;
      environment: string;
      jwtSecret: string;
      jwtExpiresIn: string;
      apiPrefix: string;
    }>;
  export default _default_1;
}
declare module 'app.module' {
  export class AppModule {}
}
declare module 'main' {}
