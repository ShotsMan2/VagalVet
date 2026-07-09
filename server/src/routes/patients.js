import { Router } from 'express';
import db from '../../database.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, (req, res) => {
  const userId = req.user.sub;
  const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(userId);
  if (!patient) return res.status(404).json({ error: 'Hasta kaydı bulunamadı' });

  const recentVisits = db
    .prepare('SELECT * FROM visits WHERE patient_id = ? ORDER BY date DESC')
    .all(patient.id);
  const prescriptions = db
    .prepare('SELECT * FROM prescriptions WHERE patient_id = ?')
    .all(patient.id);

  res.json({ ...patient, recentVisits, prescriptions });
});

export default router;
