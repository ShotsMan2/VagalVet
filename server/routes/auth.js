import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, refreshTokenSchema } from '../validations/auth.validation.js';
import authService from '../services/auth.service.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/login', authLimiter, validate(loginSchema), expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = authService.login(username, password);
  res.json(result);
}));

router.post('/refresh', validate(refreshTokenSchema), expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = authService.refreshToken(refreshToken);
  res.json(result);
}));

router.get('/me', authMiddleware, expressAsyncHandler(async (req, res) => {
  const user = authService.getMe(req.user.userId);
  res.json(user);
}));

export default router;
