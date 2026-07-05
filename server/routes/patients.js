import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createPatientSchema } from '../validations/patients.validation.js';
import patientService from '../services/patients.service.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/me', authMiddleware, expressAsyncHandler(async (req, res) => {
  const userId = req.query.userId || req.user.userId;
  const result = patientService.getPatientData(userId);
  res.json(result);
}));

router.post('/', authMiddleware, validate(createPatientSchema), expressAsyncHandler(async (req, res) => {
  const result = patientService.createPatient(req.body, req.user.userId);
  res.json(result);
}));

router.delete('/:id', authMiddleware, expressAsyncHandler(async (req, res) => {
  const result = patientService.deletePatient(req.params.id, req.user.userId);
  res.json(result);
}));

export default router;
