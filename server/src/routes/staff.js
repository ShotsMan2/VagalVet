import { Router } from 'express';
import db from '../../database.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), (_req, res) => {
  res.json(db.prepare('SELECT * FROM staff ORDER BY name').all());
});

router.post('/', requireAuth, requireRole('admin'), (req, res) => {
  const { name, status, shift } = req.body;
  if (!name) return res.status(400).json({ error: 'Personel adı zorunludur' });

  const result = db
    .prepare('INSERT INTO staff (name, status, shift) VALUES (?, ?, ?)')
    .run(name, status || 'Müsait', shift || '09:00 - 18:00');

  res.status(201).json(db.prepare('SELECT * FROM staff WHERE id = ?').get(result.lastInsertRowid));
});

router.delete('/:id', requireAuth, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM staff WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
