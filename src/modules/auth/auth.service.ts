import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { UserRole } from '../user/interfaces/user.interface';

export interface JwtPayload {
  sub: string | number;
  email?: string;
  displayName?: string;
  roles?: UserRole[];
  [key: string]: unknown;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  createAccessToken(payload: JwtPayload): string {
    const secret =
      this.configService.get<string>('jwt.accessSecret') ??
      this.configService.get<string>('jwt.secret');

    if (!secret) {
      throw new Error('JWT access secret is not configured');
    }

    const expiresIn: JwtSignOptions['expiresIn'] =
      (this.configService.get(
        'jwt.accessExpiresIn',
      ) as JwtSignOptions['expiresIn']) ?? '1h';

    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  createRefreshToken(payload: JwtPayload): string {
    const secret =
      this.configService.get<string>('jwt.refreshSecret') ??
      this.configService.get<string>('jwt.accessSecret');

    if (!secret) {
      throw new Error('JWT refresh secret is not configured');
    }

    const expiresIn: JwtSignOptions['expiresIn'] =
      (this.configService.get(
        'jwt.refreshExpiresIn',
      ) as JwtSignOptions['expiresIn']) ?? '7d';

    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }

  createTokenPair(payload: JwtPayload) {
    return {
      accessToken: this.createAccessToken(payload),
      refreshToken: this.createRefreshToken(payload),
    };
  }

  verifyAccessToken(token: string): JwtPayload {
    return this.jwtService.verify<JwtPayload>(token);
  }

  verifyRefreshToken(token: string): JwtPayload {
    const secret =
      this.configService.get<string>('jwt.refreshSecret') ??
      this.configService.get<string>('jwt.accessSecret');

    if (!secret) {
      throw new Error('JWT refresh secret is not configured');
    }

    return this.jwtService.verify<JwtPayload>(token, {
      secret,
    });
  }
}
