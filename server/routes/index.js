import express from 'express';

import authRoutes from './auth.js';
import appointmentsRoutes from './appointments.js';
import blogRoutes from './blog.js';
import patientsRoutes from './patients.js';
import messagesRoutes from './messages.js';
import newsletterRoutes from './newsletter.js';
import inventoryRoutes from './inventory.js';
import staffRoutes from './staff.js';
import settingsRoutes from './settings.js';
import statsRoutes from './stats.js';
import healthRoutes from './health.js';
import auditLogsRoutes from './auditLogs.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/appointments', appointmentsRoutes);
router.use('/blog', blogRoutes);
router.use('/patients', patientsRoutes);
router.use('/messages', messagesRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/staff', staffRoutes);
router.use('/settings', settingsRoutes);
router.use('/stats', statsRoutes);
router.use('/health', healthRoutes);
router.use('/audit-logs', auditLogsRoutes);

export default router;
