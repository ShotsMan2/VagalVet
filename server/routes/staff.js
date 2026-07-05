import express from 'express';
import db from '../database.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM staff ORDER BY name').all());
});

router.post('/', authMiddleware, requireRole('admin'), (req, res) => {
  const { name, role, status, shift, phone, email } = req.body;
  if (!name) return res.status(400).json({ error: 'Ad zorunludur' });
  const result = db.prepare('INSERT INTO staff (name, role, status, shift, phone, email) VALUES (?, ?, ?, ?, ?, ?)').run(name, role || 'Veteriner Hekim', status || 'Müsait', shift || '', phone || '', email || '');
  res.json(db.prepare('SELECT * FROM staff WHERE id = ?').get(result.lastInsertRowid));
});

router.put('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  const { name, role, status, shift, phone, email } = req.body;
  db.prepare('UPDATE staff SET name=?, role=?, status=?, shift=?, phone=?, email=? WHERE id=?').run(name, role, status, shift, phone, email, req.params.id);
  res.json(db.prepare('SELECT * FROM staff WHERE id = ?').get(req.params.id));
});

router.delete('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM staff WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
