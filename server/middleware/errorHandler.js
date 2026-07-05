import logger from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Sunucu hatası' : err.message
  });
}
