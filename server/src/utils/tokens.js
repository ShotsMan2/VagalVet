import jwt from 'jsonwebtoken';
import config from '../config.js';

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    config.jwtSecret,
    { expiresIn: config.accessTokenExpiry }
  );
}

export function signRefreshToken(user) {
  return jwt.sign(
    { sub: user.id, type: 'refresh' },
    config.jwtRefreshSecret,
    { expiresIn: config.refreshTokenExpiry }
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, config.jwtRefreshSecret);
}
