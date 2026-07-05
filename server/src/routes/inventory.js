import { Router } from 'express';
import db from '../../database.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), (_req, res) => {
  res.json(db.prepare('SELECT * FROM inventory ORDER BY name').all());
});

router.post('/', requireAuth, requireRole('admin'), (req, res) => {
  const { name, category, stock, critical } = req.body;
  if (!name) return res.status(400).json({ error: 'Ürün adı zorunludur' });

  const id = `INV-${Math.floor(10 + Math.random() * 90)}`;
  db.prepare(
    'INSERT INTO inventory (id, name, category, stock, critical) VALUES (?, ?, ?, ?, ?)'
  ).run(id, name, category || '', stock ?? 0, critical ?? 5);

  res.status(201).json(db.prepare('SELECT * FROM inventory WHERE id = ?').get(id));
});

router.delete('/:id', requireAuth, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM inventory WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
