import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService, PasswordService } from './service';
import { AuthController } from './auth.controller';
import { LoggerModule } from 'src/logger';
import { User, UserModule } from 'src/user';
import { OtpModule } from 'src/otp';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    LoggerModule,
    forwardRef(() => UserModule),
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PasswordService, RolesGuard],
  exports: [AuthService, JwtStrategy, PassportModule, JwtModule, RolesGuard],
})
export class AuthModule {}
