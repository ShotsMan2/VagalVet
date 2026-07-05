import { Router } from 'express';
import db from '../../database.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { logAudit } from '../services/authService.js';

const router = Router();

router.get('/', (_req, res) => {
  const blogs = db.prepare('SELECT * FROM blog ORDER BY id DESC').all();
  res.json(blogs);
});

router.post('/', requireAuth, requireRole('admin'), (req, res) => {
  const { title, excerpt, content, author, date, category, image } = req.body;
  if (!title || !excerpt || !category || !image) {
    return res.status(400).json({ error: 'title, excerpt, category ve image zorunludur' });
  }

  const result = db
    .prepare(
      'INSERT INTO blog (title, excerpt, content, author, date, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
    .run(title, excerpt, content || '', author || '', date || '', category, image);

  logAudit(req.user.sub, 'CREATE', 'blog', title);
  const newBlog = db.prepare('SELECT * FROM blog WHERE id = ?').get(result.lastInsertRowid);
  res.json(newBlog);
});

router.delete('/:id', requireAuth, requireRole('admin'), (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM blog WHERE id = ?').run(id);
  logAudit(req.user.sub, 'DELETE', 'blog', id);
  res.json({ success: true });
});

export default router;
