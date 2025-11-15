import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import type { OAuthProfile } from './providers/oauth-profile.interface';
import type { OAuthProviderId } from './providers/oauth-provider.interface';

@Injectable()
export class OAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  loginWithProvider(profile: OAuthProfile, provider?: OAuthProviderId) {
    if (!provider) {
      throw new BadRequestException('OAuth provider is required');
    }

    const user = this.userService.syncOAuthProfile(provider, profile);

    const tokens = this.authService.createTokenPair({
      sub: user.id,
      email: user.email,
      displayName: user.displayName,
      roles: user.roles,
    });

    return { ...tokens, user, provider };
  }
}
