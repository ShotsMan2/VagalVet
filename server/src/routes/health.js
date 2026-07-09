import { Router } from 'express';
import db from '../../database.js';

const router = Router();

router.get('/', (_req, res) => {
  try {
    db.prepare('SELECT 1').get();
    res.json({
      status: 'ok',
      db: 'connected',
      uptime: process.uptime(),
      version: process.env.npm_package_version || '0.0.0',
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({ status: 'error', db: 'disconnected' });
  }
});

router.get('/ready', (_req, res) => {
  try {
    db.prepare('SELECT 1').get();
    res.json({ ready: true });
  } catch {
    res.status(503).json({ ready: false });
  }
});

export default router;
