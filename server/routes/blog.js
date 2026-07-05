import express from 'express';
import db from '../database.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  const blogs = db.prepare('SELECT * FROM blog ORDER BY id DESC').all();
  res.json(blogs);
});

router.post('/', authMiddleware, requireRole('admin'), (req, res) => {
  const { title, excerpt, content, author, date, category, image } = req.body;
  if (!title || !excerpt || !category || !image) {
    return res.status(400).json({ error: 'title, excerpt, category ve image zorunludur' });
  }
  const result = db.prepare('INSERT INTO blog (title, excerpt, content, author, date, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)').run(title, excerpt, content || '', author || '', date || '', category, image);
  db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(req.user.userId, 'CREATE', 'blog', result.lastInsertRowid, `Blog yazısı eklendi: ${title}`);
  const newBlog = db.prepare('SELECT * FROM blog WHERE id = ?').get(result.lastInsertRowid);
  res.json(newBlog);
});

router.delete('/:id', authMiddleware, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM blog WHERE id = ?').run(req.params.id);
  db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(req.user.userId, 'DELETE', 'blog', req.params.id, 'Blog yazısı silindi');
  res.json({ success: true });
});

export default router;
