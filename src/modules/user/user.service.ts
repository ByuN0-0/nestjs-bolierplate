import { Injectable } from '@nestjs/common';
import { UserProfile, UserRole } from './interfaces/user.interface';
import type { OAuthProviderId } from '../oauth/providers/oauth-provider.interface';
import type { OAuthProfile } from '../oauth/providers/oauth-profile.interface';

@Injectable()
export class UserService {
  private readonly users = new Map<string, UserProfile>([
    [
      'local:1',
      {
        id: 'local:1',
        email: 'hello@blynx.dev',
        displayName: 'Blynx User',
        roles: ['USER'],
      },
    ],
    [
      'local:2',
      {
        id: 'local:2',
        email: 'admin@blynx.dev',
        displayName: 'Blynx Admin',
        roles: ['ADMIN'],
      },
    ],
  ]);

  findById(id: string): UserProfile | undefined {
    return this.users.get(id);
  }

  findOrCreate(profile: UserProfile): UserProfile {
    const normalized: UserProfile = {
      ...profile,
      roles: profile.roles ?? ['USER'],
    };

    const existing = this.users.get(normalized.id);
    if (existing) {
      return existing;
    }

    this.users.set(normalized.id, normalized);
    return normalized;
  }

  syncOAuthProfile(
    provider: OAuthProviderId,
    profile: OAuthProfile,
    roles: UserRole[] = ['USER'],
  ): UserProfile {
    const userId = `${provider}:${profile.id}`;
    const normalized: UserProfile = {
      id: userId,
      email: profile.email ?? `${profile.id}@${provider}.oauth`,
      displayName: profile.displayName,
      provider,
      roles,
    };

    const existing = this.users.get(userId);
    if (existing) {
      const updated: UserProfile = {
        ...existing,
        email: normalized.email || existing.email,
        displayName: normalized.displayName ?? existing.displayName,
        roles: normalized.roles ?? existing.roles,
      };
      this.users.set(userId, updated);
      return updated;
    }

    this.users.set(userId, normalized);
    return normalized;
  }
}
