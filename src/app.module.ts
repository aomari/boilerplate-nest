import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { AppService } from './app.service';
import { LoggerModule } from './logger';
import { CleanupModule } from './cleanup';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ProfileModule } from './profile/profile.module';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'storage', 'profile-pictures'),
      serveRoot: '/api/storage/profile-pictures',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 40,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 500,
      },
    ]),
    LoggerModule,
    CleanupModule,
    UserModule,
    AuthModule,
    MailModule,
    OtpModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
