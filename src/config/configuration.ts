const parseOrigins = (value: string) =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const configuration = () => ({
  environment: process.env.NODE_ENV!,
  port: Number(process.env.PORT!),
  cors: {
    origins: parseOrigins(process.env.CORS_ALLOWED_ORIGINS!),
  },
  database: {
    mongoUri: process.env.MONGODB_URI!,
    dbName: process.env.MONGODB_DB_NAME!,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN!,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL!,
  },
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL!,
    },
    naver: {
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      callbackUrl: process.env.NAVER_CALLBACK_URL!,
    },
    kakao: {
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      callbackUrl: process.env.KAKAO_CALLBACK_URL!,
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
      callbackUrl: process.env.APPLE_CALLBACK_URL!,
    },
  },
});

export type AppConfig = ReturnType<typeof configuration>;

export default configuration;
