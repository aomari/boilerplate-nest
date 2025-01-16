import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    this.fromEmail = this.configService.get<string>('MAIL_FROM');

    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'), // Your SMTP server
      port: this.configService.get<number>('MAIL_PORT'), // Your SMTP port (587 for TLS)
      secure: false, // Set to true if using SSL, false for TLS
      auth: {
        user: this.configService.get<string>('MAIL_USER'), // Email
        pass: this.configService.get<string>('MAIL_PASS'), // Password
      },
    });
  }

  async sendMail(mailOptions: Mail.Options): Promise<boolean> {
    try {
      const options: Mail.Options = {
        from: this.fromEmail,
        ...mailOptions,
      };

      await this.transporter.sendMail(options);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
