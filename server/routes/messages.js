import express from 'express';
import db from '../database.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Ad, email ve mesaj zorunludur' });
  const date = new Date().toLocaleString('tr-TR');
  db.prepare('INSERT INTO messages (name, email, message, date) VALUES (?, ?, ?, ?)').run(name, email, message, date);

  const wss = req.app.get('wss');
  if (wss) {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ type: 'NEW_MESSAGE', message: 'Yeni bir iletişim mesajı alındı!' }));
      }
    });
  }

  res.json({ success: true, message: 'Mesajınız alınmıştır.' });
});

router.get('/', authMiddleware, (req, res) => {
  const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(messages);
});

router.delete('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

router.patch('/:id/read', authMiddleware, (req, res) => {
  db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

export default router;
