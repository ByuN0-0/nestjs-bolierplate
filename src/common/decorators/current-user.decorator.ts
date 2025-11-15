import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import type { UserProfile } from '../../modules/user/interfaces/user.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof UserProfile | undefined, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: UserProfile }>();
    const user = request.user;
    if (!user) {
      return undefined;
    }

    if (data) {
      const safeUser = user as unknown as Record<string, unknown>;
      return safeUser[data] as string;
    }

    return user;
  },
);
