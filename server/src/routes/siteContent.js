import { Router } from 'express';
import db from '../../database.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', (_req, res) => {
  const rows = db.prepare('SELECT key, value FROM site_content').all();
  const content = {};
  rows.forEach((row) => {
    content[row.key] = row.value;
  });
  res.json(content);
});

router.put('/', requireAuth, requireRole('admin'), (req, res) => {
  const content = req.body;
  const upsert = db.prepare(
    'INSERT INTO site_content (key, value) VALUES (@key, @value) ON CONFLICT(key) DO UPDATE SET value = @value'
  );

  const saveAll = db.transaction((obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
        upsert.run({ key, value: String(value) });
      }
    }
  });

  saveAll(content);
  res.json({ success: true });
});

export default router;
