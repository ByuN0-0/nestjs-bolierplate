const parseOrigins = (value: string) =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const configuration = () => ({
  environment: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  cors: {
    origins: parseOrigins(
      process.env.CORS_ALLOWED_ORIGINS ?? 'http://localhost:3000',
    ),
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? 'please-set-a-secret',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'please-set-a-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackUrl:
      process.env.GOOGLE_CALLBACK_URL ??
      'http://localhost:3000/oauth/google/redirect',
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackUrl:
        process.env.GOOGLE_CALLBACK_URL ??
        'http://localhost:3000/oauth/google/redirect',
    },
    naver: {
      clientId: process.env.NAVER_CLIENT_ID ?? '',
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? '',
      callbackUrl:
        process.env.NAVER_CALLBACK_URL ??
        'http://localhost:3000/oauth/naver/redirect',
    },
    kakao: {
      clientId: process.env.KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
      callbackUrl:
        process.env.KAKAO_CALLBACK_URL ??
        'http://localhost:3000/oauth/kakao/redirect',
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID ?? '',
      clientSecret: process.env.APPLE_CLIENT_SECRET ?? '',
      callbackUrl:
        process.env.APPLE_CALLBACK_URL ??
        'http://localhost:3000/oauth/apple/redirect',
    },
  },
});

export type AppConfig = ReturnType<typeof configuration>;

export default configuration;
