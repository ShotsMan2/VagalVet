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
      'Evcil Hayvanlarımızı Neden Kısırlaştırmalıyız? Kısırlaştırmanın Önemi Nedir?',
      'Kısırlaştırma, hayvan refahını artıran, yaşam süresini uzatan ve birçok ciddi hastalığın önüne geçen çok önemli bir cerrahi müdahaledir.',
      '🔖 Dişi hayvanların kısırlaştırılmasıyla kızgınlık dönemine bağlı huzursuzluk, aşırı miyavlama, yuvarlanma ve çiftleşme davranışları ortadan kalkmaktadır. Erkek hayvanların dişilere yönelmesine bağlı kaçma, kavga etme ve yaralanma risklerini azaltır.\n\n🔖 Erkek hayvanların kısırlaştırılmasıyla üreme hormonlarına bağlı davranışlarda belirgin azalma görülmektedir. Alan işaretleme, dolaşma eğilimi, dişilere yönelme ve cinsel motivasyonla ilişkili davranışların azalmasına katkı sağlar. Bu durum hem hayvan refahının artmasına hem de sahip-hayvan ilişkisinin güçlenmesine yardımcı olmaktadır.\n\n🔖 Dişi kedi ve köpeklerde kısırlaştırma meme tümörü riskini anlamlı ölçüde azaltmaktadır. Erkek kedi ve köpeklerde testiküler tümörleri tamamen önlemekte, prostat hastalıklarının riskini önemli ölçüde azaltmaktadır.\n\n🔖 Dişi kedi ve köpeklerde kısırlaştırma (ovariohisterektomi) uygulaması pyometra riskini tamamen ortadan kaldıran tek yöntemdir. Pyometra, yaş ilerledikçe gelişme riski artan ve potansiyel olarak yaşamı tehdit eden üreme sistemi hastalığıdır.\n\n🔖 Kısırlaştırma istenmeyen gebelikleri ve doğumla ilgili komplikasyonları tamamen önler.\n\n🔖 Kısırlaştırma sonrası evcil hayvanlarda hormonların metabolik hız üzerindeki etkilerinin ortadan kalkmasıyla birlikte toplam enerji gereksiniminde azalma meydana gelmektedir. Hormonlarda meydana gelen değişiklikler stresin azalmasına yol açar, iştah artışı yaygın olarak görülür. Bu durumda enerji alımı ve fiziksel aktivite dengesi yönetilerek obezite riskinin önüne geçilmelidir.\n\n‼️ ÖZELLİKLE PYOMETRA VE PROSTAT HASTALIKLARI GİBİ CİDDİ KLİNİK TABLOLAR GÖZ ÖNÜNE ALINIRSA EVCİL HAYVANIMIZI KISIRLAŞTIRMAK İÇİN GEÇ KALINMAMALI, POTANSİYEL RİSKLERİN ÖNÜNE GEÇİLMELİDİR.',
      '@muru.vett & @m.ali_eraslan',
      'Yakın Zamanda',
      'Koruyucu Hekimlik',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80'
    );
    insertBlog.run(
      'Yeni Doğum Yapan Bir Kedideki Anne Rolü Nedir?',
      'İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu kliniğimize getirildi. Göbek bağını annenin kesmediği durumlarda ne yapılmalıdır?',
      'İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu yavrular birbirine dolanmış bir şekilde kliniğimize getirildi. Göbek bağını annenin kesmediği bu durumda erken müdahale için geç kalınmıştı. Gerekli müdahale sonucunda 2 yavru uygun seviyeden göbek bağları kesilerek sağlıklı şekilde kurtarıldı. Genel durumları stabil ve yaşamsal refleksleri iyi hale getirildi.\n\n📌 YENİ DOĞUM YAPAN BİR KEDİDEKİ ANNE ROLÜ NEDİR, GÖBEK BAĞINI ANNENİN KESMEDİĞİ DURUMLARDA NE YAPILMALIDIR?\n\n🐱 Yenidoğan yavru kediler doğru vücut ısısının korunması, bakım, korunma ve idrar/dışkılama uyarımı için annelerine bağımlıdır.\n🐱 Bu nedenle doğumda ve sonrasında uygun anne davranışı ve bakımı yavru kedinin hayatta kalması için gereklidir.\n🐱 Doğumda normal koşullar altında anne fetal zarları açmak, göbek bağını kesmek (ısırmak) ve yavruları yalamakla sorumludur; yalamanın amacı, solunumu uyarmada önemli olmasının yanı sıra, fetal sıvıları uzaklaştırmak ve yavru kedinin kurumasını sağlamaktır.\n🐱 İlk kez doğum yapan annelerde, doğum sırasında ve doğumdan sonraki ilk 48 saat boyunca anne davranışlarının sıkı bir şekilde izlenmesi, anormallikleri belirlemek ve yavru kedileri kurtarmak için çok önemlidir.\n🐱 Yeni doğum sonrası annenin yapamadığı müdahalelerde mutlaka veteriner hekime başvurulmalıdır.\n\n⚠️ NELERE DİKKAT ETMELİYİZ?\n\n➡️ Anne, yavruların göbek bağını koparmış mı?\nEğer göbek bağları duruyorsa, dolanma, enfeksiyon ve kan akımının kesilmesi riski vardır.\n➡️ Yavrular birbirine dolanmış mı?\nGöbek bağları, özellikle doğumdan sonraki ilk birkaç gün içinde kuruyana kadar oldukça esnek ve tehlikelidir.\n➡️ Göbek bağı şiş, kızarık ya da kötü kokulu mu?\nBöyle durumlar göbek enfeksiyonuna işaret eder ve sistemik enfeksiyonlara yol açabilir.\n\n⚠️ UNUTMAYIN!\nİlk doğumu yapan annelerde annelik içgüdüsü zayıf olabilir. Bu gibi durumlarda en kısa sürede veteriner hekime başvurulmalıdır.',
      'VagalVet Ekibi',
      'Yakın Zamanda',
      'Klinik Vakalar',
      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800&q=80'
    );
    insertBlog.run(
      'Canine Parvoviral Enteritis (Lina Vakamız)',
      'Kanin Parvoviral Enteritis nedir? Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.',
      '🐶🤎 Lina\n🦠 Canine Parvoviral Enteritis\n\n🔖 Kanin Parvoviral Enteritis nedir?\n• Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.\n\n🔖 Nasıl Bulaşır?\n• Bu hastalık hava yoluyla direkt olarak veya hasta köpekler tarafından enfekte dışkı ile kontamine gıdaların ağız yoluyla alınması sonucu geçebilmektedir. Ayrıca enfekte bir hayvanın dışkısıyla (gaitasıyla) kontamine araç ve ekipmanlarla temas yoluyla da enfeksiyon etkenleri duyarlı hayvanlara bulaşabilmektedir.\n\n🔖 En duyarlı yaş aralığı nedir?\n• Her yaş ve ırktan köpek Parvovirüs ile enfekte olabilmesine rağmen en duyarlı yaş aralığı 6-16 haftalık yavru köpeklerdir.\n\n🔖 Klinik belirtileri nelerdir?\n• Halsizlik, iştahsızlık, kusma ve şiddetli ishal gözlemlenir.\n• Bağırsak cidarı etkilendiği için bağırsak yüzeyinde kanamalar şekillenebilmekte ve bunun sonucunda kusma ve kanlı ishal görülmektedir.\n\n📌 Koruyucu immunitenin eksikliği hastalığa yatkın hale getiren hazırlayıcı faktörlerdendir.\n📌 Klinik bulguların görülmesiyle beraber veteriner hekiminize danışmanız erken teşhis ve tedavi için oldukça önemlidir. Tedavinin yanı sıra hastalıktan korunma, önemini korumaktadır.\n\n⚠️ Korunmanın En Etkili Yolu: AŞILAMA 💉\n• Veteriner hekim tarafından köpeğinizin mevcut durumuna göre uygun görülen zaman içerisinde aşılama takvimine başlanmalıdır.\n• Aşılama, viral enfeksiyonlara karşı koruma sağlamak için hayati öneme sahiptir. Can dostlarımız için, sağlıklı yaşamları için aşılarımızı ihmal etmeyelim, geç kalmayalım.❣️\n\nGeçmiş olsun Lina! 🥰',
      'VagalVet Ekibi',
      'Yakın Zamanda',
      'Köpek Bakımı',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80'
    );
  }
}

initDb();

export default db;
