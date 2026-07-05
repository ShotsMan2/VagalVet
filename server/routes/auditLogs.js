import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import auditLogService from '../services/auditLogs.service.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', authMiddleware, requireRole('admin'), expressAsyncHandler(async (req, res) => {
  const { page, limit, action, entity } = req.query;
  const result = auditLogService.getLogs(page, limit, action, entity);
  res.json(result);
}));

export default router;
