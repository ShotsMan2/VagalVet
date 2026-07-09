import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({ 
  windowMs: 60000, 
  max: 100, 
  message: { error: 'Çok fazla istek. Lütfen bekleyin.' } 
});

export const authLimiter = rateLimit({ 
  windowMs: 15 * 60000, 
  max: 10, 
  message: { error: 'Çok fazla giriş denemesi.' } 
});
