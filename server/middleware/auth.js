import jwt from 'jsonwebtoken';

export function generateTokens(user) {
  const accessToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
  const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Token gerekli' });
  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
  }
}


export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Kimlik doğrulama gerekli' });
    
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (req.user.role === 'admin' || allowedRoles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }
  };
}
