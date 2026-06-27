import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Activity, Bell, MessageSquare, Send, CheckCircle2, X, Reply, Plus, Search, Check, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States
  const [messages, setMessages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  
  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, text: 'Sistem güncellemesi tamamlandı.', time: '10 dk önce' },
    { id: 2, text: 'Yeni hasta kaydı: #P-004', time: '1 saat önce' },
    { id: 3, text: 'Haftalık yedekleme alındı.', time: '3 saat önce' }
  ];

  // Reply state
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(null);

  // New Patient State
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', type: '', ownerName: '', ownerPhone: '', nextVaccine: '', vaccineName: '', status: 'Sağlıklı' });

  // Settings State
  const [settings, setSettings] = useState({ maintenanceMode: false, onlineBooking: true, emailNotifications: true });

  useEffect(() => {
    // Load Data
    setMessages(JSON.parse(localStorage.getItem('vagalvet_messages') || '[]'));
    setAppointments(JSON.parse(localStorage.getItem('vagalvet_appointments') || '[]'));
    
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

  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: <LayoutDashboard size={20} /> },
    { id: 'appointments', label: 'Akıllı Randevular', icon: <Calendar size={20} /> },
    { id: 'patients', label: 'Biyo-Kayıtlar (CRM)', icon: <Users size={20} /> },
    { id: 'messages', label: 'Gelen Mesajlar', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Sistem Ayarları', icon: <Settings size={20} /> },
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
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '1px' }}>
            <span style={{ color: 'var(--color-primary)' }}>Vagal</span><span style={{ color: 'var(--color-secondary)' }}>Vet</span> Admin
          </span>
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
                <span style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}></span>
              </button>

              {showNotifications && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: '1rem', width: '320px',
                  background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 50
                }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ margin: 0 }}>Bildirimler</h4>
                  </div>
                  <div>
                    {notifications.map((notif) => (
                      <div key={notif.id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', gap: '1rem' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', marginTop: 6 }}></div>
                        <div>
                          <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>{notif.text}</p>
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
                    <tr key={pt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
