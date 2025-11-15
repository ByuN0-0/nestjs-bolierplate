export type OAuthProviderId = 'google' | 'naver' | 'kakao' | 'apple';

export interface OAuthProviderDefinition {
  id: OAuthProviderId;
  displayName: string;
  strategyName: string;
  authorizePath: string;
  callbackPath: string;
  scope: string[];
}
