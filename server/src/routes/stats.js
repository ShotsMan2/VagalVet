import { Router } from 'express';
import db from '../../database.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), (_req, res) => {
  const patientCount = db.prepare('SELECT COUNT(*) as count FROM crm_patients').get().count;
  const appointmentCount = db.prepare('SELECT COUNT(*) as count FROM appointments').get().count;
  const appointmentsToday = db
    .prepare("SELECT COUNT(*) as count FROM appointments WHERE date = date('now', 'localtime')")
    .get().count;
  const pendingAppointments = db
    .prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'pending'")
    .get().count;
  const newRegistrations = db
    .prepare("SELECT COUNT(*) as count FROM crm_patients WHERE created_at >= datetime('now', '-7 days')")
    .get().count;

  res.json({
    totalPatients: patientCount,
    appointmentsToday,
    activeTreatments: pendingAppointments,
    newRegistrations,
    totalAppointments: appointmentCount,
  });
});

export default router;
