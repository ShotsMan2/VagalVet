import { Router } from 'express';
import db from '../../database.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { logAudit } from '../services/authService.js';

const router = Router();

router.post('/', (req, res) => {
  const { ownerName, petName, phone, date, time, reason } = req.body;
  if (!ownerName || !phone || !date) {
    return res.status(400).json({ error: 'Eksik bilgi' });
  }

  db.prepare(
    'INSERT INTO appointments (ownerName, petName, phone, date, time, reason) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(ownerName, petName || '', phone, date, time || '', reason || '');

  res.json({ success: true, message: 'Randevunuz alınmıştır.' });
});

router.get('/', requireAuth, requireRole('admin'), (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
  const offset = (page - 1) * limit;

  const appointments = db
    .prepare('SELECT * FROM appointments ORDER BY created_at DESC LIMIT ? OFFSET ?')
    .all(limit, offset);
  const total = db.prepare('SELECT COUNT(*) as count FROM appointments').get().count;

  res.json({ data: appointments, page, limit, total });
});

router.patch('/:id', requireAuth, requireRole('admin'), (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Durum alanı gereklidir.' });
  }

  const result = db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id);
  if (result.changes === 0) {
    return res.status(404).json({ success: false, message: 'Randevu bulunamadı.' });
  }

  logAudit(req.user.sub, 'UPDATE', 'appointment', `${id}:${status}`);
  const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  res.json({ success: true, message: 'Randevu durumu güncellendi.', appointment: updated });
});

export default router;
