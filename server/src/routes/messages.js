import { Router } from 'express';
import db from '../../database.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Ad ve mesaj zorunludur' });
  }

  const result = db
    .prepare(
      'INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)'
    )
    .run(name, email || '', phone || '', subject || '', message);

  const newMessage = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newMessage);
});

router.get('/', requireAuth, requireRole('admin'), (_req, res) => {
  const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(messages);
});

router.delete('/:id', requireAuth, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
