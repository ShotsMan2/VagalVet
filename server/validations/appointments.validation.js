import { z } from 'zod';

const phoneRegex = /^[0-9\s\-\+\(\)]+$/;

export const createAppointmentSchema = z.object({
  ownerName: z.string().min(2, 'Geçerli bir isim giriniz.').max(100),
  petName: z.string().optional().default(''),
  phone: z.string().regex(phoneRegex, 'Geçerli bir telefon numarası giriniz.').min(10, 'Telefon numarası çok kısa.'),
  date: z.string().min(1, 'Tarih zorunludur.'),
  time: z.string().optional().default(''),
  reason: z.string().optional().default('')
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'completed', 'cancelled'], {
    required_error: 'Durum alanı gereklidir.',
    invalid_type_error: 'Geçersiz durum değeri.'
  })
});
