import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService, JwtPayload } from '../../modules/auth/auth.service';
import type {
  UserProfile,
  UserRole,
} from '../../modules/user/interfaces/user.interface';
import type { OAuthProviderId } from '../../modules/oauth/providers/oauth-provider.interface';

type AuthenticatedRequest = Request & { user?: UserProfile };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = authorization.split(' ');

    if (type?.toLowerCase() !== 'bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization scheme');
    }

    try {
      const payload = this.authService.verifyAccessToken(token);
      request.user = {
        id: String(payload.sub),
        email: (payload as JwtPayload & { email?: string }).email ?? '',
        displayName: (payload as JwtPayload & { displayName?: string })
          .displayName,
        roles: (payload as JwtPayload & { roles?: UserRole[] }).roles ?? [
          'USER',
        ],
        provider: (payload as JwtPayload & { provider?: OAuthProviderId })
          .provider,
      };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
