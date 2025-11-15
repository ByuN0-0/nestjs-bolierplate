import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { fetch } from 'undici';
import type { OAuthProfile } from '../oauth-profile.interface';
import type { OAuthProviderDefinition } from '../oauth-provider.interface';

interface NaverApiResponse {
  response?: {
    id?: string;
    name?: string;
    email?: string;
  };
}

@Injectable()
export class NaverOAuthStrategy extends PassportStrategy(
  OAuth2Strategy,
  'naver',
) {
  constructor(configService: ConfigService) {
    super({
      authorizationURL: 'https://nid.naver.com/oauth2.0/authorize',
      tokenURL: 'https://nid.naver.com/oauth2.0/token',
      clientID: configService.get<string>('oauth.naver.clientId') ?? '',
      clientSecret: configService.get<string>('oauth.naver.clientSecret') ?? '',
      callbackURL:
        configService.get<string>('oauth.naver.callbackUrl') ??
        'http://localhost:3000/oauth/naver/redirect',
      scope: ['profile', 'email'],
    });
  }

  userProfile(
    accessToken: string,
    done: (err: Error | null, profile?: OAuthProfile) => void,
  ) {
    fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json() as Promise<NaverApiResponse>)
      .then((payload) => {
        const detail = payload.response ?? {};
        done(null, {
          id: detail.id ?? '',
          displayName: detail.name,
          email: detail.email,
        });
      })
      .catch((error) => done(error as Error));
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: OAuthProfile,
  ): OAuthProfile {
    return profile;
  }
}

export const naverProviderDefinition: OAuthProviderDefinition = {
  id: 'naver',
  displayName: 'Naver',
  strategyName: 'naver',
  authorizePath: '/oauth/naver',
  callbackPath: '/oauth/naver/redirect',
  scope: ['profile', 'email'],
};
