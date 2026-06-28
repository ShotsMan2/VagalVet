import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the database in the server folder
const dbPath = path.resolve(__dirname, 'vagalvet.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize Tables
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
  `);
  
  // Seed initial data if empty
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    // Admin
    db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('admin', '1234', 'admin');
    
    // Client 1 (Merve Uysal)
    const info = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)').run('merve_uysal', '1234', 'client');
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
      'Yavru Kedi Bakım Rehberi', 
      'Yeni sahiplendiğiniz yavru kedinizin sağlıklı gelişimi için bilmeniz gereken temel bakım kuralları, beslenme önerileri ve aşı takvimi.',
      'Detaylı içerik...',
      'Mürüvvet Eraslan',
      '12 Ekim 2023',
      'Kedi Bakımı',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800'
    );
    insertBlog.run(
      'Köpeklerde Ağız ve Diş Sağlığı', 
      'Dostunuzun genel sağlığını doğrudan etkileyen ağız ve diş bakımının önemi, evde yapabileceğiniz uygulamalar ve profesyonel temizlik.',
      'Detaylı içerik...',
      'Mehmet Ali Eraslan',
      '28 Eylül 2023',
      'Köpek Bakımı',
      'https://images.unsplash.com/photo-1537151608804-ea2f1fa53664?auto=format&fit=crop&q=80&w=800'
    );
  }
}

initDb();

export default db;
