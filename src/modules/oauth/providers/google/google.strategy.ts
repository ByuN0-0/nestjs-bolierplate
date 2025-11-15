import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from 'passport-google-oauth20';
import type { OAuthProfile } from '../oauth-profile.interface';
import type { OAuthProviderDefinition } from '../oauth-provider.interface';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('oauth.google.clientId') ?? '',
      clientSecret:
        configService.get<string>('oauth.google.clientSecret') ?? '',
      callbackURL:
        configService.get<string>('oauth.google.callbackUrl') ??
        'http://localhost:3000/oauth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): OAuthProfile {
    return {
      id: profile.id,
      displayName: profile.displayName ?? undefined,
      email: profile.emails?.[0]?.value,
    };
  }
}

export const googleProviderDefinition: OAuthProviderDefinition = {
  id: 'google',
  displayName: 'Google',
  strategyName: 'google',
  authorizePath: '/oauth/google',
  callbackPath: '/oauth/google/redirect',
  scope: ['profile', 'email'],
};
