import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// --- AUTHENTICATION ---
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);

  if (!user) {
    return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
  }

  res.json({
    id: user.id,
    username: user.username,
    role: user.role
  });
});

// --- PATIENTS (CLIENT PORTAL) ---
app.get('/api/patients/me', (req, res) => {
  const { userId } = req.query; // in a real app, use JWT tokens
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const patient = db.prepare('SELECT * FROM patients WHERE user_id = ?').get(userId);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });

  const recentVisits = db.prepare('SELECT * FROM visits WHERE patient_id = ? ORDER BY date DESC').all(patient.id);
  const prescriptions = db.prepare('SELECT * FROM prescriptions WHERE patient_id = ?').all(patient.id);

  res.json({
    ...patient,
    recentVisits,
    prescriptions
  });
});

// --- BLOG ---
app.get('/api/blog', (req, res) => {
  const blogs = db.prepare('SELECT * FROM blog ORDER BY id DESC').all();
  res.json(blogs);
});

app.post('/api/blog', (req, res) => {
  const { title, excerpt, content, author, date, category, image } = req.body;
  if (!title || !excerpt || !category || !image) {
    return res.status(400).json({ error: 'title, excerpt, category ve image zorunludur' });
  }
  const result = db.prepare(
    'INSERT INTO blog (title, excerpt, content, author, date, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(title, excerpt, content || '', author || '', date || '', category, image);
  const newBlog = db.prepare('SELECT * FROM blog WHERE id = ?').get(result.lastInsertRowid);
  res.json(newBlog);
});

app.delete('/api/blog/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM blog WHERE id = ?').run(id);
  res.json({ success: true });
});

// --- APPOINTMENTS ---
app.post('/api/appointments', (req, res) => {
  const { ownerName, petName, phone, date, time, reason } = req.body;
  if (!ownerName || !phone || !date) return res.status(400).json({ error: 'Eksik bilgi' });

  const stmt = db.prepare('INSERT INTO appointments (ownerName, petName, phone, date, time, reason) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(ownerName, petName, phone, date, time, reason);

  res.json({ success: true, message: 'Randevunuz alınmıştır.' });
});

app.get('/api/appointments', (req, res) => {
  const appointments = db.prepare('SELECT * FROM appointments ORDER BY created_at DESC').all();
  res.json(appointments);
});

app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Durum alanı gereklidir.' });
  }

  const result = db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, id);

  if (result.changes === 0) {
    return res.status(404).json({ success: false, message: 'Randevu bulunamadı.' });
  }

  const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);
  res.json({ success: true, message: 'Randevu durumu güncellendi.', appointment: updated });
});

// --- SETTINGS (ADMIN DASHBOARD) ---
app.get('/api/settings', (req, res) => {
  const settingsRows = db.prepare('SELECT * FROM settings').all();
  const settings = {};
  settingsRows.forEach(row => {
    settings[row.key] = row.value;
  });
  res.json(settings);
});

app.post('/api/settings', (req, res) => {
  const settings = req.body;
  const insert = db.prepare('INSERT INTO settings (key, value) VALUES (@key, @value) ON CONFLICT(key) DO UPDATE SET value = @value');
  
  const insertMany = db.transaction((settingsObj) => {
    for (const [key, value] of Object.entries(settingsObj)) {
      if (value !== null && value !== undefined) {
        insert.run({ key, value: String(value) });
      }
    }
  });

  try {
    insertMany(settings);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DASHBOARD STATS ---
app.get('/api/stats', (req, res) => {
  // Mock stats or compute from DB
  const patientCount = db.prepare('SELECT COUNT(*) as count FROM patients').get().count;
  const blogCount = db.prepare('SELECT COUNT(*) as count FROM blog').get().count;
  
  res.json({
    totalPatients: patientCount * 14, // just a mock multiplier for dashboard aesthetics
    appointmentsToday: 12,
    activeTreatments: patientCount * 3,
    newRegistrations: 8
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
