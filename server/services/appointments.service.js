import db from '../database.js';
import { AppError } from '../utils/AppError.js';

class AppointmentService {
  createAppointment(data, wss) {
    const { ownerName, petName, phone, date, time, reason } = data;

    const result = db.prepare(
      'INSERT INTO appointments (ownerName, petName, phone, date, time, reason) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(ownerName, petName, phone, date, time, reason);

    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)')
      .run(null, 'CREATE', 'appointment', result.lastInsertRowid, `Randevu oluşturuldu: ${ownerName} - ${petName}`);

    // WebSocket Notification
    if (wss) {
      wss.clients.forEach((client) => {
        if (client.readyState === 1) { // 1 = OPEN
          client.send(JSON.stringify({ type: 'NEW_APPOINTMENT', message: 'Yeni bir randevu talebi alındı!' }));
        }
      });
    }

    return { success: true, message: 'Randevunuz alınmıştır.', id: result.lastInsertRowid };
  }

  getAppointments() {
    return db.prepare('SELECT * FROM appointments ORDER BY created_at DESC').all();
  }

  updateAppointmentStatus(id, status, updaterUserId) {
    const result = db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id);
    if (result.changes === 0) {
      throw new AppError('Randevu bulunamadı.', 404);
    }

    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)')
      .run(updaterUserId, 'UPDATE', 'appointment', id, `Randevu durumu güncellendi: ${status}`);

    const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
    return { success: true, appointment: updated };
  }

  deleteAppointment(id, deleterUserId) {
    const result = db.prepare('DELETE FROM appointments WHERE id = ?').run(id);
    if (result.changes === 0) {
      throw new AppError('Randevu bulunamadı.', 404);
    }

    db.prepare('INSERT INTO audit_logs (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)')
      .run(deleterUserId, 'DELETE', 'appointment', id, 'Randevu silindi');

    return { success: true };
  }
}

export default new AppointmentService();
