import express from 'express';
import db from '../database.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM inventory ORDER BY name').all());
});

router.post('/', authMiddleware, requireRole('admin'), (req, res) => {
  const { name, category, stock, critical_level, unit } = req.body;
  if (!name || !category) return res.status(400).json({ error: 'Ad ve kategori zorunludur' });
  const result = db.prepare('INSERT INTO inventory (name, category, stock, critical_level, unit) VALUES (?, ?, ?, ?, ?)').run(name, category, stock || 0, critical_level || 5, unit || 'adet');
  res.json(db.prepare('SELECT * FROM inventory WHERE id = ?').get(result.lastInsertRowid));
});

router.put('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  const { name, category, stock, critical_level, unit } = req.body;
  db.prepare('UPDATE inventory SET name=?, category=?, stock=?, critical_level=?, unit=?, updated_at=CURRENT_TIMESTAMP WHERE id=?').run(name, category, stock, critical_level, unit, req.params.id);
  res.json(db.prepare('SELECT * FROM inventory WHERE id = ?').get(req.params.id));
});

router.delete('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM inventory WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
