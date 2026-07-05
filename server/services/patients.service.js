import db from '../database.js';
import { AppError } from '../utils/AppError.js';

class PatientService {
  getPatientData(userId) {
    const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(userId);
    if (!patient) {
      throw new AppError('Hasta bulunamadı', 404);
    }

    const recentVisits = db.prepare('SELECT * FROM visits WHERE patient_id = ? ORDER BY date DESC').all(patient.id);
    const prescriptions = db.prepare('SELECT * FROM prescriptions WHERE patient_id = ?').all(patient.id);
    
    return { ...patient, recentVisits, prescriptions };
  }

  createPatient(data, creatorUserId) {
    const { user_id, petName, petType, age, weight, nextVaccine } = data;
    
    const result = db.prepare(
      'INSERT INTO patients (user_id, petName, petType, age, weight, nextVaccine) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(user_id, petName, petType, age || '', weight || '', nextVaccine || '');
    
    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)')
      .run(creatorUserId, 'CREATE', 'patient', result.lastInsertRowid, `Hasta eklendi: ${petName}`);
    
    const newPatient = db.prepare('SELECT * FROM patients WHERE id = ?').get(result.lastInsertRowid);
    return newPatient;
  }

  deletePatient(patientId, deleterUserId) {
    const info = db.prepare('DELETE FROM patients WHERE id = ?').run(patientId);
    
    if (info.changes === 0) {
      throw new AppError('Hasta bulunamadı veya zaten silinmiş', 404);
    }

    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)')
      .run(deleterUserId, 'DELETE', 'patient', patientId, 'Hasta silindi');
    
    return { success: true };
  }
}

export default new PatientService();
