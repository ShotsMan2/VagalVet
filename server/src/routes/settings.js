import { Router } from 'express';
import db from '../../database.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), (_req, res) => {
  const settingsRows = db.prepare('SELECT * FROM settings').all();
  const settings = {};
  settingsRows.forEach((row) => {
    settings[row.key] = row.value;
  });
  res.json(settings);
});

router.post('/', requireAuth, requireRole('admin'), (req, res) => {
  const settings = req.body;
  const insert = db.prepare(
    'INSERT INTO settings (key, value) VALUES (@key, @value) ON CONFLICT(key) DO UPDATE SET value = @value'
  );

  const insertMany = db.transaction((settingsObj) => {
    for (const [key, value] of Object.entries(settingsObj)) {
      if (value !== null && value !== undefined) {
        insert.run({ key, value: String(value) });
      }
    }
  });

  insertMany(settings);
  res.json({ success: true });
});

export default router;
