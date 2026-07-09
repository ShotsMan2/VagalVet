import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string({
    required_error: 'Kullanıcı adı gereklidir',
  }).min(3, 'Kullanıcı adı en az 3 karakter olmalıdır'),
  password: z.string({
    required_error: 'Şifre gereklidir',
  }).min(4, 'Şifre en az 4 karakter olmalıdır'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh token gereklidir',
  }),
});
