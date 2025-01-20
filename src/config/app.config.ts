import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  jwtExpiresIn: process.env.JWT_EXPIRATION || '1h',
  apiPrefix: process.env.API_PREFIX || 'api',
}));
