import bcrypt from 'bcryptjs';
import db from '../../database.js';
import { signAccessToken, signRefreshToken } from '../utils/tokens.js';

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

function isLocked(username) {
  const row = db.prepare('SELECT locked_until FROM login_attempts WHERE username = ?').get(username);
  if (!row?.locked_until) return false;
  return new Date(row.locked_until) > new Date();
}

function recordFailedAttempt(username) {
  const existing = db.prepare('SELECT * FROM login_attempts WHERE username = ?').get(username);
  if (existing) {
    const attempts = existing.attempts + 1;
    const lockedUntil =
      attempts >= MAX_ATTEMPTS
        ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString()
        : existing.locked_until;
    db.prepare(
      'UPDATE login_attempts SET attempts = ?, locked_until = ? WHERE username = ?'
    ).run(attempts, lockedUntil, username);
  } else {
    db.prepare('INSERT INTO login_attempts (username, attempts) VALUES (?, 1)').run(username);
  }
}

function clearAttempts(username) {
  db.prepare('DELETE FROM login_attempts WHERE username = ?').run(username);
}

export async function login(username, password) {
  if (isLocked(username)) {
    const err = new Error('Çok fazla başarısız deneme. Lütfen 15 dakika sonra tekrar deneyin.');
    err.status = 429;
    throw err;
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) {
    recordFailedAttempt(username);
    const err = new Error('Geçersiz kullanıcı adı veya şifre');
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    recordFailedAttempt(username);
    const err = new Error('Geçersiz kullanıcı adı veya şifre');
    err.status = 401;
    throw err;
  }

  clearAttempts(username);

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  db.prepare(
    'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, datetime("now", "+7 days"))'
  ).run(user.id, refreshToken);

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, username: user.username, role: user.role },
  };
}

export function logout(refreshToken) {
  if (refreshToken) {
    db.prepare('DELETE FROM refresh_tokens WHERE token_hash = ?').run(refreshToken);
  }
}

export function refresh(refreshToken) {
  const stored = db.prepare(
    'SELECT rt.*, u.id, u.username, u.role FROM refresh_tokens rt JOIN users u ON u.id = rt.user_id WHERE rt.token_hash = ? AND rt.expires_at > datetime("now")'
  ).get(refreshToken);

  if (!stored) {
    const err = new Error('Geçersiz refresh token');
    err.status = 401;
    throw err;
  }

  const user = { id: stored.id, username: stored.username, role: stored.role };
  return {
    accessToken: signAccessToken(user),
    user,
  };
}

export function logAudit(userId, action, resource, details = '') {
  db.prepare(
    'INSERT INTO audit_logs (user_id, action, resource, details) VALUES (?, ?, ?, ?)'
  ).run(userId, action, resource, details);
}
