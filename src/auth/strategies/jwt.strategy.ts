import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensure expired tokens are rejected
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: { id: number; email: string }) {
    return { id: payload.id, email: payload.email };
  }
}
