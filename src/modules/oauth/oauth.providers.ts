import {
  GoogleOAuthStrategy,
  googleProviderDefinition,
} from './providers/google';
import { NaverOAuthStrategy, naverProviderDefinition } from './providers/naver';
import { KakaoOAuthStrategy, kakaoProviderDefinition } from './providers/kakao';
import { AppleOAuthStrategy, appleProviderDefinition } from './providers/apple';
import type { OAuthProviderDefinition } from './providers/oauth-provider.interface';

export const oauthStrategyProviders = [
  GoogleOAuthStrategy,
  NaverOAuthStrategy,
  KakaoOAuthStrategy,
  AppleOAuthStrategy,
];

export const oauthProviderDefinitions: OAuthProviderDefinition[] = [
  googleProviderDefinition,
  naverProviderDefinition,
  kakaoProviderDefinition,
  appleProviderDefinition,
];
