import logger from '../utils/logger.js';
import { AppError } from '../utils/AppError.js';

export function errorHandler(err, req, res, next) {
  logger.error(`[Error] ${err.name}: ${err.message}\n${err.stack}`);

  let error = { ...err };
  error.message = err.message;

  // Custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  // SQLite Constraint Errors
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({
      success: false,
      error: 'Bu kayıt zaten mevcut'
    });
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Geçersiz token. Lütfen tekrar giriş yapın.'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Oturum süresi doldu. Lütfen tekrar giriş yapın.'
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
