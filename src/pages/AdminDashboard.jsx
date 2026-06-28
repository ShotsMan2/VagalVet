import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Activity, Bell, MessageSquare, Send, CheckCircle2, X, Reply, Plus, Search, Check, AlertTriangle, Mail, FileText, BookOpen } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States
  const [messages, setMessages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [blogs, setBlogs] = useState([]);
  
  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Yeni aşılama stok uyarısı: Parvo', time: '10 dk önce', read: false },
    { id: 2, text: 'Yeni online randevu düştü.', time: '1 saat önce', read: false },
    { id: 3, text: 'Haftalık ciro raporu hazır.', time: '3 saat önce', read: false }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  const unreadCount = notifications.filter(n => !n.read).length;

  // Reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(null);

  // New Patient State
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', type: '', ownerName: '', ownerPhone: '', nextVaccine: '', vaccineName: '', status: 'Sağlıklı' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientTab, setPatientTab] = useState('genel');

  // New Tabs State
  const inventoryData = [
    { id: 'INV-01', name: 'Karma Aşı (Kedi)', category: 'Aşı', stock: 12, critical: 15 },
    { id: 'INV-02', name: 'Kuduz Aşısı', category: 'Aşı', stock: 45, critical: 10 },
    { id: 'INV-03', name: 'Geniş Spektrumlu Antibiyotik', category: 'İlaç', stock: 8, critical: 20 },
    { id: 'INV-04', name: 'Premium Kedi Maması 15kg', category: 'Mama', stock: 4, critical: 5 }
  ];
  const staffData = [
    { id: 1, name: 'Vet. Hekim Mürüvvet Eraslan', status: 'Muayenede', shift: '09:00 - 18:00' },
    { id: 2, name: 'Vet. Hekim Mehmet Ali Eraslan', status: 'Ameliyatta', shift: '10:00 - 19:00' },
    { id: 3, name: 'Vet. Tek. Ayşe Yılmaz', status: 'Müsait', shift: '08:00 - 17:00' }
  ];

  // Settings State
  const [settings, setSettings] = useState({ maintenanceMode: false, onlineBooking: true, emailNotifications: true });
  const [contactSettings, setContactSettings] = useState({ phone: '', email: '', instagram: '', facebook: '' });
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Blog State
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', content: '', image: '', category: '', date: 'Yakın Zamanda', author: 'VagalVet Ekibi' });

  // Content State
  const [siteContent, setSiteContent] = useState({});
  const [saveContentSuccess, setSaveContentSuccess] = useState(false);

  const handleSaveContactSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('vagalvet_contact_settings', JSON.stringify(contactSettings));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveSiteContent = (e) => {
    e.preventDefault();
    localStorage.setItem('vagalvet_site_content', JSON.stringify(siteContent));
    setSaveContentSuccess(true);
    setTimeout(() => setSaveContentSuccess(false), 3000);
  };

  useEffect(() => {
    // Load Data
    setMessages(JSON.parse(localStorage.getItem('vagalvet_messages') || '[]'));
    setAppointments(JSON.parse(localStorage.getItem('vagalvet_appointments') || '[]'));
    setNewsletter(JSON.parse(localStorage.getItem('vagalvet_newsletter') || '[]'));
    
    // Load Contact Settings
    const defaultContactSettings = {
      phone: '0553 384 14 60',
      email: 'info@vagalvet.com',
      instagram: 'https://instagram.com/vagalvet',
      facebook: 'https://facebook.com/vagalvet'
    };
    setContactSettings(JSON.parse(localStorage.getItem('vagalvet_contact_settings') || JSON.stringify(defaultContactSettings)));

    // Load Site Content
    const defaultSiteContent = {
      homeHeroTitle: 'Can dostlarınız için',
      homeHeroTitleHighlight: 'modern sağlık.',
      homeHeroSubtitle: 'VagalVet Veteriner Kliniği olarak sevimli dostlarımızın sağlığı için en güncel tıbbi yöntemlerle yanınızdayız. Profesyonel kadromuz ve donanımlı altyapımızla sevgi dolu bir sağlık hizmeti sunuyoruz.',
      homeAboutTitle: 'Neden VagalVet?',
      homeAboutText1: 'Kliniğimiz, dostlarımızın hem fiziksel hem de psikolojik ihtiyaçlarını göz önünde bulundurarak tasarlanmıştır. Modern ekipmanlarımızla hastalıkları erken teşhis ediyor ve en uygun tedavi yöntemlerini sunuyoruz.',
      homeAboutText2: 'Aşı takibinden cerrahi operasyonlara, laboratuvar hizmetlerinden pet kuaförüne kadar geniş bir yelpazede hizmet veriyoruz. Amacımız sadece hastalıkları tedavi etmek değil, koruyucu hekimlik ile hastalıkların önüne geçmektir.',
      workingHoursWeekday: '09.00 - 20.00',
      workingHoursWeekend: '12.00 - 18.00'
    };
    const savedContent = localStorage.getItem('vagalvet_site_content');
    if (savedContent) {
      let parsed = JSON.parse(savedContent);
      if (parsed.homeHeroTitle === 'Sevgiyle İyileştiriyor, Özenle Yaşatıyoruz') {
        parsed.homeHeroTitle = 'Can dostlarınız için';
      }
      if (!parsed.homeHeroTitleHighlight) {
        parsed.homeHeroTitleHighlight = 'modern sağlık.';
      }
      if (!parsed.workingHoursWeekday) {
        parsed.workingHoursWeekday = '09.00 - 20.00';
        parsed.workingHoursWeekend = '12.00 - 18.00';
      }
      setSiteContent(parsed);
    } else {
      setSiteContent(defaultSiteContent);
    }
    
    // Load Blogs
    let savedBlogs = JSON.parse(localStorage.getItem('vagalvet_blogs') || '[]');
    if (savedBlogs.length === 0) {
      savedBlogs = [
        {
          id: 1,
          title: 'Evcil Hayvanlarımızı Neden Kısırlaştırmalıyız? Kısırlaştırmanın Önemi Nedir?',
          excerpt: 'Kısırlaştırma, hayvan refahını artıran, yaşam süresini uzatan ve birçok ciddi hastalığın önüne geçen çok önemli bir cerrahi müdahaledir.',
          content: `🔖 Dişi hayvanların kısırlaştırılmasıyla kızgınlık dönemine bağlı huzursuzluk, aşırı miyavlama, yuvarlanma ve çiftleşme davranışları ortadan kalkmaktadır. Erkek hayvanların dişilere yönelmesine bağlı kaçma, kavga etme ve yaralanma risklerini azaltır.\n\n🔖 Erkek hayvanların kısırlaştırılmasıyla üreme hormonlarına bağlı davranışlarda belirgin azalma görülmektedir. Alan işaretleme, dolaşma eğilimi, dişilere yönelme ve cinsel motivasyonla ilişkili davranışların azalmasına katkı sağlar. Bu durum hem hayvan refahının artmasına hem de sahip-hayvan ilişkisinin güçlenmesine yardımcı olmaktadır.\n\n🔖 Dişi kedi ve köpeklerde kısırlaştırma meme tümörü riskini anlamlı ölçüde azaltmaktadır. Erkek kedi ve köpeklerde testiküler tümörleri tamamen önlemekte, prostat hastalıklarının riskini önemli ölçüde azaltmaktadır.\n\n🔖 Dişi kedi ve köpeklerde kısırlaştırma (ovariohisterektomi) uygulaması pyometra riskini tamamen ortadan kaldıran tek yöntemdir. Pyometra, yaş ilerledikçe gelişme riski artan ve potansiyel olarak yaşamı tehdit eden üreme sistemi hastalığıdır.\n\n🔖 Kısırlaştırma istenmeyen gebelikleri ve doğumla ilgili komplikasyonları tamamen önler.\n\n🔖 Kısırlaştırma sonrası evcil hayvanlarda hormonların metabolik hız üzerindeki etkilerinin ortadan kalkmasıyla birlikte toplam enerji gereksiniminde azalma meydana gelmektedir. Hormonlarda meydana gelen değişiklikler stresin azalmasına yol açar, iştah artışı yaygın olarak görülür. Bu durumda enerji alımı ve fiziksel aktivite dengesi yönetilerek obezite riskinin önüne geçilmelidir.\n\n‼️ ÖZELLİKLE PYOMETRA VE PROSTAT HASTALIKLARI GİBİ CİDDİ KLİNİK TABLOLAR GÖZ ÖNÜNE ALINIRSA EVCİL HAYVANIMIZI KISIRLAŞTIRMAK İÇİN GEÇ KALINMAMALI, POTANSİYEL RİSKLERİN ÖNÜNE GEÇİLMELİDİR.`,
          image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
          category: 'Koruyucu Hekimlik',
          date: 'Yakın Zamanda',
          author: '@muru.vett & @m.ali_eraslan'
        },
        {
          id: 2,
          title: 'Yeni Doğum Yapan Bir Kedideki Anne Rolü Nedir?',
          excerpt: 'İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu kliniğimize getirildi. Göbek bağını annenin kesmediği durumlarda ne yapılmalıdır?',
          content: `İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu yavrular birbirine dolanmış bir şekilde kliniğimize getirildi. Göbek bağını annenin kesmediği bu durumda erken müdahale için geç kalınmıştı. Gerekli müdahale sonucunda 2 yavru uygun seviyeden göbek bağları kesilerek sağlıklı şekilde kurtarıldı. Genel durumları stabil ve yaşamsal refleksleri iyi hale getirildi.\n\n📌 YENİ DOĞUM YAPAN BİR KEDİDEKİ ANNE ROLÜ NEDİR, GÖBEK BAĞINI ANNENİN KESMEDİĞİ DURUMLARDA NE YAPILMALIDIR?\n\n🐱 Yenidoğan yavru kediler doğru vücut ısısının korunması, bakım, korunma ve idrar/dışkılama uyarımı için annelerine bağımlıdır.\n🐱 Bu nedenle doğumda ve sonrasında uygun anne davranışı ve bakımı yavru kedinin hayatta kalması için gereklidir.\n🐱 Doğumda normal koşullar altında anne fetal zarları açmak, göbek bağını kesmek (ısırmak) ve yavruları yalamakla sorumludur; yalamanın amacı, solunumu uyarmada önemli olmasının yanı sıra, fetal sıvıları uzaklaştırmak ve yavru kedinin kurumasını sağlamaktır.\n🐱 İlk kez doğum yapan annelerde, doğum sırasında ve doğumdan sonraki ilk 48 saat boyunca anne davranışlarının sıkı bir şekilde izlenmesi, anormallikleri belirlemek ve yavru kedileri kurtarmak için çok önemlidir.\n🐱 Yeni doğum sonrası annenin yapamadığı müdahalelerde mutlaka veteriner hekime başvurulmalıdır.\n\n⚠️ NELERE DİKKAT ETMELİYİZ?\n\n➡️ Anne, yavruların göbek bağını koparmış mı?\nEğer göbek bağları duruyorsa, dolanma, enfeksiyon ve kan akımının kesilmesi riski vardır.\n➡️ Yavrular birbirine dolanmış mı?\nGöbek bağları, özellikle doğumdan sonraki ilk birkaç gün içinde kuruyana kadar oldukça esnek ve tehlikelidir.\n➡️ Göbek bağı şiş, kızarık ya da kötü kokulu mu?\nBöyle durumlar göbek enfeksiyonuna işaret eder ve sistemik enfeksiyonlara yol açabilir.\n\n⚠️ UNUTMAYIN!\nİlk doğumu yapan annelerde annelik içgüdüsü zayıf olabilir. Bu gibi durumlarda en kısa sürede veteriner hekime başvurulmalıdır.`,
          image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800&q=80',
          category: 'Klinik Vakalar',
          date: 'Yakın Zamanda',
          author: 'VagalVet Ekibi'
        },
        {
          id: 3,
          title: 'Canine Parvoviral Enteritis (Lina Vakamız)',
          excerpt: 'Kanin Parvoviral Enteritis nedir? Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.',
          content: `🐶🤎 Lina\n🦠 Canine Parvoviral Enteritis\n\n🔖 Kanin Parvoviral Enteritis nedir?\n• Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.\n\n🔖 Nasıl Bulaşır?\n• Bu hastalık hava yoluyla direkt olarak veya hasta köpekler tarafından enfekte dışkı ile kontamine gıdaların ağız yoluyla alınması sonucu geçebilmektedir. Ayrıca enfekte bir hayvanın dışkısıyla (gaitasıyla) kontamine araç ve ekipmanlarla temas yoluyla da enfeksiyon etkenleri duyarlı hayvanlara bulaşabilmektedir.\n\n🔖 En duyarlı yaş aralığı nedir?\n• Her yaş ve ırktan köpek Parvovirüs ile enfekte olabilmesine rağmen en duyarlı yaş aralığı 6-16 haftalık yavru köpeklerdir.\n\n🔖 Klinik belirtileri nelerdir?\n• Halsizlik, iştahsızlık, kusma ve şiddetli ishal gözlemlenir.\n• Bağırsak cidarı etkilendiği için bağırsak yüzeyinde kanamalar şekillenebilmekte ve bunun sonucunda kusma ve kanlı ishal görülmektedir.\n\n📌 Koruyucu immunitenin eksikliği hastalığa yatkın hale getiren hazırlayıcı faktörlerdendir.\n📌 Klinik bulguların görülmesiyle beraber veteriner hekiminize danışmanız erken teşhis ve tedavi için oldukça önemlidir. Tedavinin yanı sıra hastalıktan korunma, önemini korumaktadır.\n\n⚠️ Korunmanın En Etkili Yolu: AŞILAMA 💉\n• Veteriner hekim tarafından köpeğinizin mevcut durumuna göre uygun görülen zaman içerisinde aşılama takvimine başlanmalıdır.\n• Aşılama, viral enfeksiyonlara karşı koruma sağlamak için hayati öneme sahiptir. Can dostlarımız için, sağlıklı yaşamları için aşılarımızı ihmal etmeyelim, geç kalmayalım.❣️\n\nGeçmiş olsun Lina! 🥰`,
          image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
          category: 'Köpek Bakımı',
          date: 'Yakın Zamanda',
          author: 'VagalVet Ekibi'
        }
      ];
      localStorage.setItem('vagalvet_blogs', JSON.stringify(savedBlogs));
    }
    setBlogs(savedBlogs);
    
    // Default dummy patients if empty
    let pts = JSON.parse(localStorage.getItem('vagalvet_patients') || '[]');
    if (pts.length === 0) {
      pts = [
        { id: '#P-001', name: 'Mia', type: 'Kedi (Tekir)', ownerName: 'Ayşe Yılmaz', ownerPhone: '05554443322', nextVaccine: '15.07.2026', vaccineName: 'Karma Aşı', status: 'Tedavi Sürecinde' },
        { id: '#P-002', name: 'Max', type: 'Köpek (Golden)', ownerName: 'Caner Demir', ownerPhone: '05321112233', nextVaccine: '20.08.2026', vaccineName: 'Kuduz Aşısı', status: 'Sağlıklı' }
      ];
      localStorage.setItem('vagalvet_patients', JSON.stringify(pts));
    }
    setPatients(pts);
  }, [activeTab]);

  const handleReplySubmit = (msgId) => {
    if (!replyText.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(msgId);
      setTimeout(() => {
        setSentSuccess(null);
        setReplyingTo(null);
        setReplyText('');
      }, 3000);
    }, 1500);
  };

  const handleAppointmentStatus = (id, status) => {
    const updated = appointments.map(apt => apt.id === id ? { ...apt, status } : apt);
    setAppointments(updated);
    localStorage.setItem('vagalvet_appointments', JSON.stringify(updated));
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    const pt = {
      id: '#P-' + Math.floor(100 + Math.random() * 900),
      ...newPatient
    };
    const updated = [pt, ...patients];
    setPatients(updated);
    localStorage.setItem('vagalvet_patients', JSON.stringify(updated));
    setShowAddPatient(false);
    setNewPatient({ name: '', type: '', ownerName: '', ownerPhone: '', nextVaccine: '', vaccineName: '', status: 'Sağlıklı' });
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    const blog = {
      id: Date.now(),
      ...newBlog
    };
    const updated = [blog, ...blogs];
    setBlogs(updated);
    localStorage.setItem('vagalvet_blogs', JSON.stringify(updated));
    setNewBlog({ title: '', excerpt: '', content: '', image: '', category: '', date: 'Yakın Zamanda', author: 'VagalVet Ekibi' });
    setShowAddBlog(false);
  };

  const handleDeleteBlog = (id) => {
    if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      localStorage.setItem('vagalvet_blogs', JSON.stringify(updated));
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: <LayoutDashboard size={20} /> },
    { id: 'appointments', label: 'Akıllı Randevular', icon: <Calendar size={20} /> },
    { id: 'patients', label: 'Biyo-Kayıtlar (CRM)', icon: <Users size={20} /> },
    { id: 'inventory', label: 'Stok & Depo', icon: <Activity size={20} /> },
    { id: 'finance', label: 'Finans & Fatura', icon: <CheckCircle2 size={20} /> },
    { id: 'staff', label: 'Personel', icon: <Users size={20} /> },
    { id: 'messages', label: 'Gelen Mesajlar', icon: <MessageSquare size={20} /> },
    { id: 'newsletter', label: 'Bülten Aboneleri', icon: <Mail size={20} /> },
    { id: 'settings', label: 'Sistem Ayarları', icon: <Settings size={20} /> },
    { id: 'content', label: 'İçerik Yönetimi', icon: <FileText size={20} /> },
    { id: 'blog', label: 'Blog Yönetimi', icon: <BookOpen size={20} /> },
  ];

  const adminThemeStyles = {
    '--bg-main': '#0f172a',
    '--bg-surface': '#1e293b',
    '--bg-dark': '#020617',
    '--bg-glass': 'rgba(30, 41, 59, 0.7)',
    '--border-glass': 'rgba(255, 255, 255, 0.1)',
    '--text-main': '#f8fafc',
    '--text-muted': '#94a3b8',
    '--color-primary': '#fbbf24',
    '--color-secondary': '#10b981',
    display: 'flex', 
    minHeight: '100vh', 
    background: 'var(--bg-dark)',
    color: 'var(--text-main)',
    fontFamily: 'var(--font-body)'
  };

  return (
    <div style={adminThemeStyles}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-glass)',
        display: 'flex', flexDirection: 'column', padding: '2rem 0'
      }}>
        <div style={{ padding: '0 2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div onClick={() => setActiveTab('dashboard')} style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="VagalVet Logo" style={{ height: '36px', objectFit: 'contain' }} />
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map(item => (
              <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                <button 
                  onClick={() => setActiveTab(item.id)}
                  style={{ 
                    width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem 2rem', color: activeTab === item.id ? 'var(--color-primary)' : 'var(--text-muted)',
                    background: activeTab === item.id ? 'var(--bg-glass)' : 'transparent',
                    borderLeft: `4px solid ${activeTab === item.id ? 'var(--color-primary)' : 'transparent'}`,
                    transition: 'all 0.2s', textAlign: 'left', borderTop: 'none', borderRight: 'none', borderBottom: 'none', cursor: 'pointer'
                  }}>
                  {item.icon}
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '0 2rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#ef4444', padding: '1rem 0', fontWeight: 600, textDecoration: 'none' }}>
            <LogOut size={20} /> Sistemi Kapat
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Top Header */}
        <header style={{ 
          height: '80px', borderBottom: '1px solid var(--border-glass)', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', background: 'var(--bg-surface)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Sistem Durumu: <span style={{ color: '#10b981' }}>Aktif</span></h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowNotifications(!showNotifications)} style={{ color: 'var(--text-main)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}></span>
                )}
              </button>

              {showNotifications && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '1rem', width: '320px',
                  background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 50
                }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Bildirimler {unreadCount > 0 && `(${unreadCount})`}</h4>
                    {unreadCount > 0 && <button onClick={markAllAsRead} style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Tümünü Okundu İşaretle</button>}
                  </div>
                  <div>
                    {notifications.length === 0 ? (
                       <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Bildirim yok.</div>
                    ) : notifications.map((notif) => (
                      <div key={notif.id} onClick={() => markAsRead(notif.id)} style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', gap: '1rem', background: notif.read ? 'transparent' : 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.05)'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor=notif.read ? 'transparent' : 'rgba(255,255,255,0.03)'}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: notif.read ? 'var(--text-muted)' : 'var(--color-primary)', marginTop: 6 }}></div>
                        <div>
                          <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: notif.read ? 'var(--text-muted)' : 'var(--text-main)' }}>{notif.text}</p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid var(--border-glass)', paddingLeft: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Dr. Yapay Zeka</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sistem Yöneticisi</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}>
                🤖
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                {[
                  { title: 'Bekleyen Randevu', value: appointments.filter(a => a.status === 'Beklemede').length, color: 'var(--color-primary)' },
                  { title: 'Toplam Hasta', value: patients.length, color: '#10b981' },
                  { title: 'Gelen Mesaj', value: messages.length, color: '#3b82f6' },
                  { title: 'Sistem Yükü', value: '%12', color: '#ef4444' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{stat.title}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Randevu Trafiği (Haftalık)</h3>
                  <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2%', paddingBottom: '2rem', borderBottom: '1px solid var(--border-glass)' }}>
                    {[40, 65, 30, 80, 50, 95, 20].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--color-primary)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                        <span style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Son Aktiviteler</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ fontSize: '0.9rem' }}><span style={{ color: '#10b981' }}>Yeni Randevu:</span> Ayşe Yılmaz (Kedi)</div>
                    <div style={{ fontSize: '0.9rem' }}><span style={{ color: 'var(--color-primary)' }}>Mesaj Yanıtlandı:</span> Caner Demir</div>
                    <div style={{ fontSize: '0.9rem' }}><span style={{ color: '#ef4444' }}>Aşı Hatırlatması:</span> Max (Golden) için SMS gönderildi.</div>
                    <div style={{ fontSize: '0.9rem' }}><span style={{ color: '#3b82f6' }}>Sistem:</span> Günlük yedekleme başarılı.</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Akıllı Randevular</h3>
                <span style={{ backgroundColor: 'var(--color-primary)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  {appointments.length} Kayıt
                </span>
              </div>
              
              {appointments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Randevu kaydı bulunmamaktadır.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '1rem' }}>Tarih / Saat</th>
                      <th style={{ padding: '1rem' }}>Hasta Sahibi</th>
                      <th style={{ padding: '1rem' }}>Tür & Hizmet</th>
                      <th style={{ padding: '1rem' }}>Durum</th>
                      <th style={{ padding: '1rem' }}>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem' }}>{apt.date} <br/><span style={{ color: 'var(--color-primary)' }}>{apt.time}</span></td>
                        <td style={{ padding: '1rem' }}>{apt.ownerName} <br/><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{apt.phone}</span></td>
                        <td style={{ padding: '1rem' }}>{apt.petType} <br/><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{apt.service}</span></td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem',
                            background: apt.status === 'Onaylandı' ? 'rgba(16, 185, 129, 0.2)' : apt.status === 'Reddedildi' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                            color: apt.status === 'Onaylandı' ? '#10b981' : apt.status === 'Reddedildi' ? '#ef4444' : '#fbbf24'
                          }}>
                            {apt.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                          {apt.status === 'Beklemede' && (
                            <>
                              <button onClick={() => handleAppointmentStatus(apt.id, 'Onaylandı')} style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}><Check size={14}/></button>
                              <button onClick={() => handleAppointmentStatus(apt.id, 'Reddedildi')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}><X size={14}/></button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 3: PATIENTS CRM */}
          {activeTab === 'patients' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Biyo-Kayıtlar (Hasta Yönetimi)</h3>
                <button onClick={() => setShowAddPatient(!showAddPatient)} style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                  <Plus size={16}/> Yeni Hasta Ekle
                </button>
              </div>

              {showAddPatient && (
                <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--border-glass)' }}>
                  <h4 style={{ margin: '0 0 1.5rem 0' }}>Yeni Kayıt Oluştur</h4>
                  <form onSubmit={handleAddPatient} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <input type="text" placeholder="Hayvan Adı" required value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                    <input type="text" placeholder="Türü (Örn: Kedi)" required value={newPatient.type} onChange={e => setNewPatient({...newPatient, type: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                    <input type="text" placeholder="Hasta Sahibi" required value={newPatient.ownerName} onChange={e => setNewPatient({...newPatient, ownerName: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                    <input type="text" placeholder="Sahibi Telefon" required value={newPatient.ownerPhone} onChange={e => setNewPatient({...newPatient, ownerPhone: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                    <input type="date" placeholder="Aşı Tarihi" required value={newPatient.nextVaccine} onChange={e => setNewPatient({...newPatient, nextVaccine: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)', colorScheme: 'dark' }} />
                    <input type="text" placeholder="Aşı Adı" required value={newPatient.vaccineName} onChange={e => setNewPatient({...newPatient, vaccineName: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <button type="button" onClick={() => setShowAddPatient(false)} style={{ padding: '0.6rem 1.5rem', background: 'transparent', color: 'white', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>İptal</button>
                      <button type="submit" style={{ padding: '0.6rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600 }}>Kaydet</button>
                    </div>
                  </form>
                </div>
              )}

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem' }}>Hasta ID</th>
                    <th style={{ padding: '1rem' }}>Hayvan Bilgisi</th>
                    <th style={{ padding: '1rem' }}>Sahibi & İletişim</th>
                    <th style={{ padding: '1rem' }}>Aşı Takvimi</th>
                    <th style={{ padding: '1rem' }}>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((pt) => (
                    <tr key={pt.id} onClick={() => setSelectedPatient(pt)} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.backgroundColor='rgba(255,255,255,0.02)'} onMouseLeave={(e)=>e.currentTarget.style.backgroundColor='transparent'}>
                      <td style={{ padding: '1rem', color: 'var(--color-primary)' }}>{pt.id}</td>
                      <td style={{ padding: '1rem' }}><strong>{pt.name}</strong> <br/><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{pt.type}</span></td>
                      <td style={{ padding: '1rem' }}>{pt.ownerName} <br/><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{pt.ownerPhone}</span></td>
                      <td style={{ padding: '1rem' }}>{pt.nextVaccine} <br/><span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{pt.vaccineName}</span></td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>{pt.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* DETAILED PATIENT MODAL */}
              {selectedPatient && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
                  <div style={{ background: 'var(--bg-surface)', width: '90%', maxWidth: '900px', height: '80vh', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    
                    {/* Header */}
                    <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-dark)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '2.5rem', fontWeight: 800 }}>
                          {selectedPatient.name.charAt(0)}
                        </div>
                        <div>
                          <h2 style={{ margin: 0, fontSize: '2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {selectedPatient.name} 
                            <span style={{ fontSize: '0.9rem', padding: '0.25rem 0.75rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '1rem', fontWeight: 600 }}>{selectedPatient.status}</span>
                          </h2>
                          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-muted)', fontSize: '1.1rem' }}>{selectedPatient.type} • ID: {selectedPatient.id}</p>
                        </div>
                      </div>
                      <button onClick={() => setSelectedPatient(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}>
                        <X size={28} />
                      </button>
                    </div>

                    {/* Body */}
                    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                      {/* Tabs Sidebar */}
                      <div style={{ width: '200px', background: 'rgba(0,0,0,0.2)', borderRight: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', padding: '1rem 0' }}>
                        {['genel', 'aşılar', 'laboratuvar', 'notlar'].map(tab => (
                          <button key={tab} onClick={() => setPatientTab(tab)} style={{ background: patientTab === tab ? 'var(--bg-surface)' : 'transparent', color: patientTab === tab ? 'var(--color-primary)' : 'var(--text-muted)', border: 'none', padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', borderLeft: `3px solid ${patientTab === tab ? 'var(--color-primary)' : 'transparent'}` }}>
                            {tab === 'genel' ? 'Genel Bilgiler' : tab === 'aşılar' ? 'Aşı Geçmişi' : tab === 'laboratuvar' ? 'Laboratuvar' : 'Tedavi Notları'}
                          </button>
                        ))}
                      </div>
                      {/* Tab Content */}
                      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                        {patientTab === 'genel' && (
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Sahibi</h4>
                              <p style={{ fontSize: '1.2rem', margin: 0 }}>{selectedPatient.ownerName}</p>
                            </div>
                            <div>
                              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Telefon</h4>
                              <p style={{ fontSize: '1.2rem', margin: 0 }}>{selectedPatient.ownerPhone}</p>
                            </div>
                            <div>
                              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Kayıt Tarihi</h4>
                              <p style={{ fontSize: '1.2rem', margin: 0 }}>12.04.2023</p>
                            </div>
                            <div>
                              <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Alerjiler</h4>
                              <p style={{ fontSize: '1.2rem', margin: 0, color: '#ef4444' }}>Penisilin Alerjisi Mevcut</p>
                            </div>
                          </div>
                        )}
                        {patientTab === 'aşılar' && (
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                              <span style={{ fontWeight: 600 }}>{selectedPatient.vaccineName}</span>
                              <span style={{ color: 'var(--color-primary)' }}>Sonraki: {selectedPatient.nextVaccine}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', opacity: 0.7 }}>
                              <span style={{ fontWeight: 600 }}>İç Parazit</span>
                              <span>Yapıldı: 10.01.2026</span>
                            </div>
                          </div>
                        )}
                        {patientTab === 'laboratuvar' && (
                          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem 0' }}>
                            <Activity size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Henüz laboratuvar veya röntgen kaydı bulunmuyor.</p>
                            <button style={{ marginTop: '1rem', background: 'transparent', border: '1px dashed var(--color-primary)', color: 'var(--color-primary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>+ Sonuç Yükle</button>
                          </div>
                        )}
                        {patientTab === 'notlar' && (
                          <div>
                            <textarea placeholder="Hekim notu ekleyin..." style={{ width: '100%', height: '100px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', color: 'white', padding: '1rem', marginBottom: '1rem', outline: 'none' }}></textarea>
                            <button style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' }}>Notu Kaydet</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3.1: INVENTORY */}
          {activeTab === 'inventory' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Klinik Stok & Depo Takibi</h3>
                <button style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}>+ Ürün Ekle</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '1rem' }}>Ürün Kodu</th>
                    <th style={{ padding: '1rem' }}>Ürün Adı</th>
                    <th style={{ padding: '1rem' }}>Kategori</th>
                    <th style={{ padding: '1rem' }}>Stok Durumu</th>
                    <th style={{ padding: '1rem' }}>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((inv) => (
                    <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: 'var(--color-primary)' }}>{inv.id}</td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{inv.name}</td>
                      <td style={{ padding: '1rem' }}>{inv.category}</td>
                      <td style={{ padding: '1rem' }}>{inv.stock} Adet</td>
                      <td style={{ padding: '1rem' }}>
                        {inv.stock <= inv.critical ? (
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><AlertTriangle size={14}/> Kritik Stok</span>
                        ) : (
                          <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Yeterli</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3.2: FINANCE */}
          {activeTab === 'finance' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 2rem 0' }}>Finans & Faturalama</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ color: '#10b981', margin: '0 0 0.5rem 0', fontWeight: 600 }}>Günlük Ciro</p>
                  <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--text-main)' }}>₺14,250</h2>
                </div>
                <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ color: '#38bdf8', margin: '0 0 0.5rem 0', fontWeight: 600 }}>Haftalık Ciro</p>
                  <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--text-main)' }}>₺86,400</h2>
                </div>
                <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ color: '#fbbf24', margin: '0 0 0.5rem 0', fontWeight: 600 }}>Bekleyen Ödemeler</p>
                  <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--text-main)' }}>₺2,100</h2>
                </div>
              </div>
              
              <h4 style={{ marginBottom: '1rem' }}>Son İşlemler</h4>
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                {['Klinik Muayene - Mia', 'Karma Aşı - Max', 'Pet Kuaför - Duman'].map((txn, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: i !== 2 ? '1px solid var(--border-glass)' : 'none' }}>
                    <span style={{ fontWeight: 600 }}>{txn}</span>
                    <span style={{ color: '#10b981', fontWeight: 600 }}>+ ₺{(Math.random() * 1000 + 500).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3.3: STAFF */}
          {activeTab === 'staff' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Personel & Nöbet Çizelgesi</h3>
                <button style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}>+ Personel Ekle</button>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {staffData.map(staff => (
                  <div key={staff.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '1.2rem', fontWeight: 800 }}>
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{staff.name}</h4>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mesai: {staff.shift}</span>
                      </div>
                    </div>
                    <div>
                      <span style={{ 
                        padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600,
                        background: staff.status === 'Müsait' ? 'rgba(16, 185, 129, 0.2)' : staff.status === 'Muayenede' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: staff.status === 'Müsait' ? '#10b981' : staff.status === 'Muayenede' ? '#38bdf8' : '#ef4444'
                      }}>
                        {staff.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Gelen Mesajlar</h3>
              </div>
              
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Yeni bir mesaj bulunmuyor.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glass)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                        <div>
                          <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem', display: 'block' }}>{msg.name}</strong>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{msg.email}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{msg.date}</div>
                          <button onClick={() => setReplyingTo(msg.id)} style={{ background: 'rgba(251, 191, 36, 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Reply size={14} /> Yanıtla
                          </button>
                        </div>
                      </div>
                      <p style={{ margin: 0, lineHeight: 1.6 }}>{msg.message}</p>

                      {replyingTo === msg.id && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-primary)' }}>
                          <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Mesajınızı buraya yazın..." rows={3} style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', outline: 'none' }} />
                          <button onClick={() => handleReplySubmit(msg.id)} disabled={isSending || !replyText.trim()} style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: 'pointer' }}>
                            {isSending ? 'Gönderiliyor...' : 'Gönder'}
                          </button>
                        </div>
                      )}
                      
                      {sentSuccess === msg.id && (
                        <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle2 size={18} /> Yanıt başarıyla iletildi.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4.5: NEWSLETTER */}
          {activeTab === 'newsletter' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>E-Bülten Aboneleri</h3>
                <span style={{ backgroundColor: 'var(--color-primary)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  {newsletter.length} Abone
                </span>
              </div>
              
              {newsletter.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Henüz bülten abonesi bulunmuyor.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {newsletter.map((email, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-dark)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
                      <Mail size={20} color="var(--color-primary)" />
                      <span style={{ fontSize: '1.05rem' }}>{email}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', maxWidth: '600px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 2rem 0' }}>Sistem Ayarları</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Online Randevu Alımı</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Müşterilerin web sitesinden randevu almasına izin ver</div>
                  </div>
                  <input type="checkbox" checked={settings.onlineBooking} onChange={() => setSettings({...settings, onlineBooking: !settings.onlineBooking})} style={{ width: 24, height: 24, cursor: 'pointer' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>E-Posta Bildirimleri</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sisteme düşen kayıtlarda e-posta ile bildirim gönder</div>
                  </div>
                  <input type="checkbox" checked={settings.emailNotifications} onChange={() => setSettings({...settings, emailNotifications: !settings.emailNotifications})} style={{ width: 24, height: 24, cursor: 'pointer' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#ef4444' }}>Bakım Modu (Gece Modu / Duraklatma)</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sistemi tamamen duraklatıp ziyaretçilere uyarı gösterir</div>
                  </div>
                  <input type="checkbox" checked={settings.maintenanceMode} onChange={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})} style={{ width: 24, height: 24, cursor: 'pointer' }} />
                </div>
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', margin: '3rem 0 2rem 0', borderTop: '1px solid var(--border-glass)', paddingTop: '2rem' }}>İletişim & Sosyal Medya Ayarları</h3>
              <form onSubmit={handleSaveContactSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Telefon Numarası</label>
                  <input type="text" value={contactSettings.phone} onChange={(e) => setContactSettings({...contactSettings, phone: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>E-Posta Adresi</label>
                  <input type="email" value={contactSettings.email} onChange={(e) => setContactSettings({...contactSettings, email: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Instagram Linki</label>
                  <input type="url" value={contactSettings.instagram} onChange={(e) => setContactSettings({...contactSettings, instagram: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Facebook Linki</label>
                  <input type="url" value={contactSettings.facebook} onChange={(e) => setContactSettings({...contactSettings, facebook: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button type="submit" style={{ padding: '0.8rem 2rem', background: 'var(--color-primary)', color: '#000', fontWeight: 600, border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Ayarları Kaydet</button>
                  {saveSuccess && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={18}/> Kaydedildi!</span>}
                </div>
              </form>
            </div>
          )}

          {activeTab === 'content' && (
            <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Site İçerik Yönetimi</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Ana sayfa metinlerini ve başlıklarını buradan değiştirebilirsiniz.</p>

              <form onSubmit={handleSaveSiteContent} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Ana Sayfa Büyük Başlık (Siyah Kısım)</label>
                  <input type="text" value={siteContent.homeHeroTitle || ''} onChange={(e) => setSiteContent({...siteContent, homeHeroTitle: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Ana Sayfa Büyük Başlık (Yeşil Kısım)</label>
                  <input type="text" value={siteContent.homeHeroTitleHighlight || ''} onChange={(e) => setSiteContent({...siteContent, homeHeroTitleHighlight: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Ana Sayfa Alt Açıklama</label>
                  <textarea rows={3} value={siteContent.homeHeroSubtitle || ''} onChange={(e) => setSiteContent({...siteContent, homeHeroSubtitle: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white', resize: 'vertical' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Hakkımızda Başlığı</label>
                  <input type="text" value={siteContent.homeAboutTitle || ''} onChange={(e) => setSiteContent({...siteContent, homeAboutTitle: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Hakkımızda Metni - Paragraf 1</label>
                  <textarea rows={4} value={siteContent.homeAboutText1 || ''} onChange={(e) => setSiteContent({...siteContent, homeAboutText1: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white', resize: 'vertical' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Hakkımızda Metni - Paragraf 2</label>
                  <textarea rows={4} value={siteContent.homeAboutText2 || ''} onChange={(e) => setSiteContent({...siteContent, homeAboutText2: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white', resize: 'vertical' }} />
                </div>
                
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: '1rem 0 0.5rem 0', color: 'var(--color-primary)' }}>Çalışma Saatleri</h3>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Haftaiçi</label>
                  <input type="text" value={siteContent.workingHoursWeekday || ''} onChange={(e) => setSiteContent({...siteContent, workingHoursWeekday: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Haftasonu (Cmt-Paz)</label>
                  <input type="text" value={siteContent.workingHoursWeekend || ''} onChange={(e) => setSiteContent({...siteContent, workingHoursWeekend: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" style={{ padding: '0.8rem 2rem', background: 'var(--color-primary)', color: '#000', fontWeight: 600, border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>İçerikleri Kaydet</button>
                  {saveContentSuccess && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={18}/> Kaydedildi!</span>}
                </div>
              </form>
            </div>
          )}

          {/* TAB 7: BLOG */}
          {activeTab === 'blog' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Blog Yönetimi</h2>
                <button onClick={() => setShowAddBlog(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Plus size={20} /> Yeni Yazı Ekle
                </button>
              </div>

              {showAddBlog && (
                <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', marginBottom: '2rem' }}>
                  <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Yeni Blog Yazısı</h3>
                  <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Başlık</label>
                      <input type="text" required value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Özet</label>
                      <textarea rows={2} required value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white', resize: 'vertical' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>İçerik</label>
                      <textarea rows={6} required value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white', resize: 'vertical' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Görsel URL (Örn: https://images.unsplash...)</label>
                        <input type="text" required value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                      </div>
                      <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Kategori</label>
                        <input type="text" required value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                      <button type="submit" className="btn btn-primary">Kaydet</button>
                      <button type="button" onClick={() => setShowAddBlog(false)} className="btn btn-outline" style={{ color: 'var(--text-main)', border: '1px solid var(--border-glass)' }}>İptal</button>
                    </div>
                  </form>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {blogs.map(blog => (
                  <div key={blog.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <div style={{ height: '160px', width: '100%', background: '#333' }}>
                      <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>{blog.category}</div>
                      <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', color: 'var(--text-main)' }}>{blog.title}</h3>
                      <button onClick={() => handleDeleteBlog(blog.id)} style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', width: '100%' }}>
                        Yazıyı Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
