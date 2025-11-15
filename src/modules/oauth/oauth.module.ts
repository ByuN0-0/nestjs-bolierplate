import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { OAuthService } from './oauth.service';
import { OAuthController } from './oauth.controller';
import { UserModule } from '../user/user.module';
import { oauthStrategyProviders } from './oauth.providers';
import { OAuthProviderGuard } from './guards/oauth-provider.guard';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    ConfigModule,
    UserModule,
  ],
  providers: [OAuthService, ...oauthStrategyProviders, OAuthProviderGuard],
  controllers: [OAuthController],
  exports: [OAuthService],
})
export class OAuthModule {}
