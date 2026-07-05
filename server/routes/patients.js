import express from 'express';
import db from '../database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
  const userId = req.query.userId || req.user.userId;
  const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(userId);
  if (!patient) return res.status(404).json({ error: 'Hasta bulunamadı' });

  const recentVisits = db.prepare('SELECT * FROM visits WHERE patient_id = ? ORDER BY date DESC').all(patient.id);
  const prescriptions = db.prepare('SELECT * FROM prescriptions WHERE patient_id = ?').all(patient.id);
  res.json({ ...patient, recentVisits, prescriptions });
});

router.post('/', authMiddleware, (req, res) => {
  const { user_id, petName, petType, age, weight, nextVaccine } = req.body;
  if (!user_id || !petName || !petType) return res.status(400).json({ error: 'user_id, petName ve petType zorunludur' });
  const result = db.prepare('INSERT INTO patients (user_id, petName, petType, age, weight, nextVaccine) VALUES (?, ?, ?, ?, ?, ?)').run(user_id, petName, petType, age || '', weight || '', nextVaccine || '');
  db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(req.user.userId, 'CREATE', 'patient', result.lastInsertRowid, `Hasta eklendi: ${petName}`);
  const newPatient = db.prepare('SELECT * FROM patients WHERE id = ?').get(result.lastInsertRowid);
  res.json(newPatient);
});

router.delete('/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM patients WHERE id = ?').run(req.params.id);
  db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)').run(req.user.userId, 'DELETE', 'patient', req.params.id, 'Hasta silindi');
  res.json({ success: true });
});

export default router;
