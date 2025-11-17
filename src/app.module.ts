import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OAuthModule } from './modules/oauth/oauth.module';
import { UserModule } from './modules/user/user.module';
import configuration from './config/configuration';
import { validateEnv } from './config/env.validation';

function getEnvFilePath(): string {
  const env = process.env.NODE_ENV;
  switch (env) {
    case 'local':
      return '.env.local';
    case 'development':
      return '.env.dev';
    case 'production':
      return '.env.prod';
    default:
      return '.env';
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePath(),
      load: [configuration],
      validate: validateEnv,
      validationOptions: {
        abortEarly: false,
      },
    }),
    AuthModule,
    UserModule,
    OAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
