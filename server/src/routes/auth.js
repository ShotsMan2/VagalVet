import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { verifyRefreshToken } from '../utils/tokens.js';
import * as authService from '../services/authService.js';
import { requireAuth } from '../middleware/auth.js';
import config from '../config.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.' },
});

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli' });
    }

    const result = await authService.login(username, password);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth',
    });

    res.json({
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/refresh', (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ error: 'Refresh token bulunamadı' });
    }
    verifyRefreshToken(token);
    const result = authService.refresh(token);
    res.json(result);
  } catch (err) {
    err.status = 401;
    next(err);
  }
});

router.post('/logout', (req, res) => {
  const token = req.cookies?.refreshToken;
  authService.logout(token);
  res.clearCookie('refreshToken', { path: '/api/auth' });
  res.json({ success: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({
    id: req.user.sub,
    username: req.user.username,
    role: req.user.role,
  });
});

export default router;
