import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'vagalvet.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'client'
    );

    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      petName TEXT NOT NULL,
      petType TEXT NOT NULL,
      age TEXT,
      weight TEXT,
      nextVaccine TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      date TEXT NOT NULL,
      doctor TEXT,
      FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS prescriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      freq TEXT NOT NULL,
      FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS blog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT,
      author TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ownerName TEXT NOT NULL,
      petName TEXT NOT NULL,
      phone TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      reason TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      date TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      replied INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      critical_level INTEGER NOT NULL DEFAULT 5,
      unit TEXT DEFAULT 'adet',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS staff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Veteriner Hekim',
      status TEXT DEFAULT 'Müsait',
      shift TEXT,
      phone TEXT,
      email TEXT
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      entity TEXT NOT NULL,
      entity_id INTEGER,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
    CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
    CREATE INDEX IF NOT EXISTS idx_patients_user_id ON patients(user_id);
    CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
    CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
  `);

  // Seed initial data if empty
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    const hashedPassword = bcrypt.hashSync('1234', 10);

    // Admin
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', hashedPassword, 'admin');

    // Client 1 (Merve Uysal)
    const info = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('merve_uysal', hashedPassword, 'client');
    const clientId = info.lastInsertRowid;

    const pInfo = db.prepare('INSERT INTO patients (user_id, petName, petType, age, weight, nextVaccine) VALUES (?, ?, ?, ?, ?, ?)').run(
      clientId, 'Tarçın', 'Golden Retriever', '3 Yaş', '28 kg', 'Karma Aşı (15.11.2023)'
    );
    const petId = pInfo.lastInsertRowid;

    db.prepare('INSERT INTO visits (patient_id, type, date, doctor) VALUES (?, ?, ?, ?)').run(petId, 'Genel Muayene', '01.10.2023', 'Vet. Hekim Mürüvvet Eraslan');
    db.prepare('INSERT INTO visits (patient_id, type, date, doctor) VALUES (?, ?, ?, ?)').run(petId, 'Kuduz Aşısı', '15.08.2023', 'Vet. Hekim Mehmet Ali Eraslan');

    db.prepare('INSERT INTO prescriptions (patient_id, name, freq) VALUES (?, ?, ?)').run(petId, 'NexGard Spectra', 'Ayda 1 Kez');
    db.prepare('INSERT INTO prescriptions (patient_id, name, freq) VALUES (?, ?, ?)').run(petId, 'Bravecto', '3 Ayda 1 Kez');
  }

  const blogCount = db.prepare('SELECT COUNT(*) as count FROM blog').get().count;
  if (blogCount === 0) {
    const insertBlog = db.prepare('INSERT INTO blog (title, excerpt, content, author, date, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)');
    insertBlog.run(
      'Evcil Hayvanlarımızı Neden Kısırlaştırmalıyız? Kısırlaştırmanın Önemi Nedir?',
      'Kısırlaştırma, hayvan refahını artıran, yaşam süresini uzatan ve birçok ciddi hastalığın önüne geçen çok önemli bir cerrahi müdahaledir.',
      'Kısırlaştırma ile ilgili detaylı bilgi...',
      '@muru.vett & @m.ali_eraslan',
      'Yakın Zamanda',
      'Koruyucu Hekimlik',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80'
    );
    insertBlog.run(
      'Yeni Doğum Yapan Bir Kedideki Anne Rolü Nedir?',
      'İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu kliniğimize getirildi.',
      'Anne kedilerin doğum sonrası bakımı hakkında detaylı bilgi...',
      'VagalVet Ekibi',
      'Yakın Zamanda',
      'Klinik Vakalar',
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800&q=80'
    );
    insertBlog.run(
      'Canine Parvoviral Enteritis (Lina Vakamız)',
      'Kanin Parvoviral Enteritis nedir? Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.',
      'Parvoviral enteritis hakkında detaylı bilgi...',
      'VagalVet Ekibi',
      'Yakın Zamanda',
      'Köpek Bakımı',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80'
    );
  }
}

initDb();

export default db;
