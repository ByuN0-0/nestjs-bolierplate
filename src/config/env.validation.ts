import { z } from 'zod';

export const envValidationSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test', 'staging'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
  JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('1h'),
  JWT_REFRESH_SECRET: z.string().default(''),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  GOOGLE_CLIENT_ID: z.string().default(''),
  GOOGLE_CLIENT_SECRET: z.string().default(''),
  GOOGLE_CALLBACK_URL: z
    .string()
    .url()
    .default('http://localhost:3000/oauth/google/redirect'),
  NAVER_CLIENT_ID: z.string().default(''),
  NAVER_CLIENT_SECRET: z.string().default(''),
  NAVER_CALLBACK_URL: z
    .string()
    .url()
    .default('http://localhost:3000/oauth/naver/redirect'),
  KAKAO_CLIENT_ID: z.string().default(''),
  KAKAO_CLIENT_SECRET: z.string().default(''),
  KAKAO_CALLBACK_URL: z
    .string()
    .url()
    .default('http://localhost:3000/oauth/kakao/redirect'),
  APPLE_CLIENT_ID: z.string().default(''),
  APPLE_CLIENT_SECRET: z.string().default(''),
  APPLE_CALLBACK_URL: z
    .string()
    .url()
    .default('http://localhost:3000/oauth/apple/redirect'),
});

export type EnvConfig = z.infer<typeof envValidationSchema>;

export const validateEnv = (config: Record<string, any>) =>
  envValidationSchema.parse(config);
