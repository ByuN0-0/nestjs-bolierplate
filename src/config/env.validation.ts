import { z } from 'zod';

export const envValidationSchema = z.object({
  NODE_ENV: z.enum(['local', 'development', 'production'], {
    message: 'NODE_ENV is required',
  }),
  PORT: z.coerce.number().int().positive({
    message: 'PORT is required and must be a positive integer',
  }),
  CORS_ALLOWED_ORIGINS: z.string().min(1, 'CORS_ALLOWED_ORIGINS is required'),
  JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required'),
  JWT_ACCESS_EXPIRES_IN: z.string().min(1, 'JWT_ACCESS_EXPIRES_IN is required'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
  JWT_REFRESH_EXPIRES_IN: z
    .string()
    .min(1, 'JWT_REFRESH_EXPIRES_IN is required'),
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
  GOOGLE_CALLBACK_URL: z.url().min(1, 'GOOGLE_CALLBACK_URL is required'),
  NAVER_CLIENT_ID: z.string().min(1, 'NAVER_CLIENT_ID is required'),
  NAVER_CLIENT_SECRET: z.string().min(1, 'NAVER_CLIENT_SECRET is required'),
  NAVER_CALLBACK_URL: z.url().min(1, 'NAVER_CALLBACK_URL is required'),
  KAKAO_CLIENT_ID: z.string().min(1, 'KAKAO_CLIENT_ID is required'),
  KAKAO_CLIENT_SECRET: z.string().min(1, 'KAKAO_CLIENT_SECRET is required'),
  KAKAO_CALLBACK_URL: z.url().min(1, 'KAKAO_CALLBACK_URL is required'),
  APPLE_CLIENT_ID: z.string().min(1, 'APPLE_CLIENT_ID is required'),
  APPLE_CLIENT_SECRET: z.string().min(1, 'APPLE_CLIENT_SECRET is required'),
  APPLE_CALLBACK_URL: z.url().min(1, 'APPLE_CALLBACK_URL is required'),
});

export type EnvConfig = z.infer<typeof envValidationSchema>;

export const validateEnv = (config: Record<string, any>) =>
  envValidationSchema.parse(config);
