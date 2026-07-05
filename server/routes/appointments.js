import express from 'express';
import db from '../database.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { ValidationError, validateString, validatePhone, sanitizeString } from '../utils/validator.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    let { ownerName, petName, phone, date, time, reason } = req.body;
    
    // Validation
    if (!validateString(ownerName, 2)) throw new ValidationError('Geçerli bir isim giriniz.');
    if (!validatePhone(phone)) throw new ValidationError('Geçerli bir telefon numarası giriniz.');
    if (!validateString(date, 1)) throw new ValidationError('Tarih zorunludur.');
    
    // Sanitization
    ownerName = sanitizeString(ownerName);
    petName = sanitizeString(petName);
    reason = sanitizeString(reason);
    time = sanitizeString(time);

    const result = db.prepare('INSERT INTO appointments (ownerName, petName, phone, date, time, reason) VALUES (?, ?, ?, ?, ?, ?)').run(ownerName, petName || '', phone, date, time || '', reason || '');
    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(null, 'CREATE', 'appointment', result.lastInsertRowid, `Randevu oluşturuldu: ${ownerName} - ${petName}`);
  
  const wss = req.app.get('wss');
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ type: 'NEW_APPOINTMENT', message: 'Yeni bir randevu talebi alındı!' }));
      }
    });
  }

    res.json({ success: true, message: 'Randevunuz alınmıştır.' });
  } catch (error) {
    next(error);
  }
});

router.get('/', authMiddleware, (req, res) => {
  const appointments = db.prepare('SELECT * FROM appointments ORDER BY created_at DESC').all();
  res.json(appointments);
});

router.patch('/:id', authMiddleware, (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Durum alanı gereklidir.' });
  const result = db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Randevu bulunamadı.' });
  db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(req.user.userId, 'UPDATE', 'appointment', req.params.id, `Randevu durumu güncellendi: ${status}`);
  const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
  res.json({ success: true, appointment: updated });
});

router.delete('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM appointments WHERE id = ?').run(req.params.id);
  db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(req.user.userId, 'DELETE', 'appointment', req.params.id, 'Randevu silindi');
  res.json({ success: true });
});

export default router;
