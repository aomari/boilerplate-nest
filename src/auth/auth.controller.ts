import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './service';
import { LoginDto, RefreshTokenDto, SignupDto } from './dto';
import { ResendSignupDto } from './dto/resendSignup.dto';
import { ResendSignupResponseDTO } from './dto/resendSignupResponse.dto';
import { VerifySignupOtpDto } from './dto/verifySignupOtp.dto';
import { VerifySignupOtpResponseDto } from './dto/verifySignupOtpResponse.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/user';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new account by Sign Up with your credentials',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has been created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Username or email already exist.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request payload.',
  })
  @ApiBody({ type: SignupDto })
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signupService(signupDto);
  }

  @Post('resend-signup-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'resend the otp for new user account',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP resent successfully.',
    type: ResendSignupResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email address.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found user',
  })
  @ApiBody({ type: ResendSignupDto })
  resendSignupOtp(@Body() resendSignupDto: ResendSignupDto): Promise<ResendSignupResponseDTO> {
    return this.authService.resendSignupService(resendSignupDto);
  }

  @Post('verify-signup-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'verify the otp for new user account (12345 for testing)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP verified successfully.',
    type: VerifySignupOtpResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email or otp.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found user',
  })
  @ApiBody({ type: VerifySignupOtpDto })
  verifySignupOtp(
    @Body() verifySignupOtpDto: VerifySignupOtpDto,
  ): Promise<VerifySignupOtpResponseDto> {
    return this.authService.verifySignupOtpService(verifySignupOtpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.authService.refreshToken(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('change-password')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Old password is incorrect.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async changePassword(@Req() req, @Body() changePasswordDto: ChangePasswordDto) {
    const userId = req.user.id; // Extracted from JWT payload
    return this.authService.changePassword(userId, changePasswordDto);
  }

  @Post('forget-password')
  @ApiResponse({ status: HttpStatus.OK, description: 'OTP sent to email.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto;
    const user = await this.authService.getUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.authService.generateAndSendOtp(email);
    return { message: 'OTP sent to email.' };
  }

  @Post('reset-password')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid OTP or email.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { email, otp, newPassword } = resetPasswordDto;
    const isValidOtp = await this.authService.validateOtp(email, otp);
    if (!isValidOtp) {
      throw new HttpException('Invalid OTP or email', HttpStatus.BAD_REQUEST);
    }
    await this.authService.resetPassword(email, newPassword);
    return { message: 'Password reset successfully.' };
  }
}
