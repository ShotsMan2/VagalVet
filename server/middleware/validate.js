import { z } from 'zod';
import { AppError } from '../utils/AppError.js';

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return next(new AppError(`Validation Error: ${errorMessages}`, 400));
    }
    next(error);
  }
};
