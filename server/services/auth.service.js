import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database.js';
import { generateTokens } from '../middleware/auth.js';
import { AppError } from '../utils/AppError.js';

class AuthService {
  login(username, password) {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new AppError('Geçersiz kullanıcı adı veya şifre', 401);
    }

    const tokens = generateTokens(user);
    
    return {
      ...tokens,
      user: { id: user.id, username: user.username, role: user.role }
    };
  }

  refreshToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = db.prepare('SELECT id, username, role FROM users WHERE id = ?').get(decoded.userId);
      
      if (!user) {
        throw new AppError('Kullanıcı bulunamadı', 401);
      }

      const accessToken = jwt.sign(
        { userId: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '2h' }
      );
      
      return { accessToken };
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError('Geçersiz veya süresi dolmuş refresh token', 401);
    }
  }

  getMe(userId) {
    const user = db.prepare('SELECT id, username, role FROM users WHERE id = ?').get(userId);
    if (!user) {
      throw new AppError('Kullanıcı bulunamadı', 404);
    }
    return user;
  }
}

export default new AuthService();
