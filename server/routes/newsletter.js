import express from 'express';
import db from '../database.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email zorunludur' });
  try {
    db.prepare('INSERT INTO newsletter (email) VALUES (?)').run(email);
    res.json({ success: true, message: 'Bültene abone oldunuz.' });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(409).json({ error: 'Bu email zaten kayıtlı' });
    }
    throw err;
  }
});

router.get('/', authMiddleware, (req, res) => {
  const subscribers = db.prepare('SELECT * FROM newsletter WHERE is_active = 1 ORDER BY subscribed_at DESC').all();
  res.json(subscribers);
});

router.delete('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM newsletter WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
