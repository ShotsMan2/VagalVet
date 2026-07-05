import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import settingsService from '../services/settings.service.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', authMiddleware, requireRole('admin'), expressAsyncHandler(async (req, res) => {
  const settings = settingsService.getSettings();
  res.json(settings);
}));

router.post('/', authMiddleware, requireRole('admin'), expressAsyncHandler(async (req, res) => {
  const result = settingsService.updateSettings(req.body, req.user.userId);
  res.json(result);
}));

export default router;
