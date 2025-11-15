import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import type { OAuthProfile } from '../oauth-profile.interface';
import type { OAuthProviderDefinition } from '../oauth-provider.interface';
import jwt from 'jsonwebtoken';

@Injectable()
export class AppleOAuthStrategy extends PassportStrategy(
  OAuth2Strategy,
  'apple',
) {
  constructor(configService: ConfigService) {
    super({
      authorizationURL: 'https://appleid.apple.com/auth/authorize',
      tokenURL: 'https://appleid.apple.com/auth/token',
      clientID: configService.get<string>('oauth.apple.clientId') ?? '',
      clientSecret: configService.get<string>('oauth.apple.clientSecret') ?? '',
      callbackURL:
        configService.get<string>('oauth.apple.callbackUrl') ??
        'http://localhost:3000/oauth/apple/redirect',
      scope: ['name', 'email'],
      state: true,
    });
  }

  validate(accessToken: string): OAuthProfile {
    const decoded = jwt.decode(accessToken);
    const sub =
      typeof decoded === 'object' && decoded !== null && 'sub' in decoded
        ? (decoded as { sub: string }).sub
        : undefined;

    return {
      id: sub ?? 'apple-user',
      email: undefined,
    };
  }
}

export const appleProviderDefinition: OAuthProviderDefinition = {
  id: 'apple',
  displayName: 'Apple',
  strategyName: 'apple',
  authorizePath: '/oauth/apple',
  callbackPath: '/oauth/apple/redirect',
  scope: ['name', 'email'],
};
