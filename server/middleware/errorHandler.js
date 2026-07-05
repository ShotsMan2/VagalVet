import logger from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error(`[Error] ${err.name}: ${err.message}\n${err.stack}`);
  
  // Custom Application Errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Geçersiz veri gönderimi',
      details: err.details || err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Bu işlem için yetkiniz yok'
    });
  }

  // SQLite Constraint Errors
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({
      success: false,
      error: 'Bu kayıt zaten mevcut'
    });
  }

  // Fallback for unexpected errors
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Beklenmeyen bir sunucu hatası oluştu.' 
      : err.message
  });
}
