import type { OAuthProviderId } from '../../oauth/providers/oauth-provider.interface';

export type UserRole = 'USER' | 'ADMIN';

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  provider?: OAuthProviderId;
  roles: UserRole[];
}
