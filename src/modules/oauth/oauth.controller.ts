import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OAuthService } from './oauth.service';
import { OAuthProfile } from './providers/oauth-profile.interface';
import { Request } from 'express';
import { OAuthProviderGuard } from './guards/oauth-provider.guard';
import type { OAuthProviderId } from './providers/oauth-provider.interface';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Get(':provider')
  @UseGuards(OAuthProviderGuard)
  initiateLogin() {
    return;
  }

  @Get(':provider/redirect')
  @UseGuards(OAuthProviderGuard)
  handleRedirect(
    @Req() req: Request & { user: OAuthProfile },
    @Param('provider') provider: OAuthProviderId,
  ) {
    return this.oauthService.loginWithProvider(req.user, provider);
  }
}
