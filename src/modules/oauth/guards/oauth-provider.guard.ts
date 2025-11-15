import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { oauthProviderDefinitions } from '../oauth.providers';
import type { OAuthProviderId } from '../providers/oauth-provider.interface';

const supportedProviders = new Set<OAuthProviderId>(
  oauthProviderDefinitions.map((provider) => provider.id),
);

@Injectable()
export class OAuthProviderGuard implements CanActivate {
  constructor(private readonly moduleRef: ModuleRef) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const provider = request.params?.provider as OAuthProviderId | undefined;

    if (!provider || !supportedProviders.has(provider)) {
      throw new BadRequestException('Unsupported OAuth provider');
    }

    const Guard = AuthGuard(provider);
    const guard = await this.moduleRef.create(Guard);
    return guard.canActivate(context) as Promise<boolean>;
  }
}
