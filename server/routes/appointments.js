import express from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createAppointmentSchema, updateAppointmentStatusSchema } from '../validations/appointments.validation.js';
import appointmentService from '../services/appointments.service.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/', validate(createAppointmentSchema), expressAsyncHandler(async (req, res) => {
  const wss = req.app.get('wss');
  const result = appointmentService.createAppointment(req.body, wss);
  res.json(result);
}));

router.get('/', authMiddleware, expressAsyncHandler(async (req, res) => {
  const appointments = appointmentService.getAppointments();
  res.json(appointments);
}));

router.patch('/:id', authMiddleware, validate(updateAppointmentStatusSchema), expressAsyncHandler(async (req, res) => {
  const result = appointmentService.updateAppointmentStatus(req.params.id, req.body.status, req.user.userId);
  res.json(result);
}));

router.delete('/:id', authMiddleware, requireRole('admin'), expressAsyncHandler(async (req, res) => {
  const result = appointmentService.deleteAppointment(req.params.id, req.user.userId);
  res.json(result);
}));

export default router;
