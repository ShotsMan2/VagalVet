// server/utils/validator.js

export class ValidationError extends Error {
  constructor(message, details = null) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export const validateString = (value, minLength = 1, maxLength = 255) => {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  // Basit TR telefon kontrolü veya uzunluk
  const stripped = phone.replace(/[^0-9]/g, '');
  return stripped.length >= 10 && stripped.length <= 15;
};

export const sanitizeString = (str) => {
  if (!str) return '';
  return str.toString().trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
