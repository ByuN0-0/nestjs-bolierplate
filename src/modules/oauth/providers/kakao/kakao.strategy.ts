import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { fetch } from 'undici';
import type { OAuthProfile } from '../oauth-profile.interface';
import type { OAuthProviderDefinition } from '../oauth-provider.interface';

interface KakaoApiResponse {
  id: string;
  properties?: {
    nickname?: string;
  };
  kakao_account?: {
    email?: string;
  };
}

@Injectable()
export class KakaoOAuthStrategy extends PassportStrategy(
  OAuth2Strategy,
  'kakao',
) {
  constructor(configService: ConfigService) {
    super({
      authorizationURL: 'https://kauth.kakao.com/oauth/authorize',
      tokenURL: 'https://kauth.kakao.com/oauth/token',
      clientID: configService.get<string>('oauth.kakao.clientId') ?? '',
      clientSecret: configService.get<string>('oauth.kakao.clientSecret') ?? '',
      callbackURL:
        configService.get<string>('oauth.kakao.callbackUrl') ??
        'http://localhost:3000/oauth/kakao/redirect',
      scope: ['profile', 'account_email'],
    });
  }

  userProfile(
    accessToken: string,
    done: (err: Error | null, profile?: OAuthProfile) => void,
  ) {
    fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json() as Promise<KakaoApiResponse>)
      .then((payload) => {
        const kakaoAccount = payload.kakao_account ?? {};
        done(null, {
          id: payload.id,
          displayName: payload.properties?.nickname,
          email: kakaoAccount.email,
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

export const kakaoProviderDefinition: OAuthProviderDefinition = {
  id: 'kakao',
  displayName: 'Kakao',
  strategyName: 'kakao',
  authorizePath: '/oauth/kakao',
  callbackPath: '/oauth/kakao/redirect',
  scope: ['profile', 'account_email'],
};
