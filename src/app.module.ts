import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { OAuthModule } from './modules/oauth/oauth.module';
import { UserModule } from './modules/user/user.module';
import configuration, { AppConfig } from './config/configuration';
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
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig, true>) => ({
        uri: configService.getOrThrow('database.mongoUri', { infer: true }),
        dbName: configService.getOrThrow('database.dbName', { infer: true }),
      }),
    }),
    AuthModule,
    UserModule,
    OAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
