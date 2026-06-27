import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Activity, Bell, MessageSquare, Send, CheckCircle2, X, Reply } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([]);
  
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

  useEffect(() => {
    if (activeTab === 'messages') {
      const stored = JSON.parse(localStorage.getItem('vagalvet_messages') || '[]');
      setMessages(stored);
    }
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

  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: <LayoutDashboard size={20} /> },
    { id: 'messages', label: 'Gelen Mesajlar', icon: <MessageSquare size={20} /> },
    { id: 'patients', label: 'Biyo-Kayıtlar', icon: <Users size={20} /> },
    { id: 'appointments', label: 'Akıllı Randevular', icon: <Calendar size={20} /> },
    { id: 'settings', label: 'Sistem Ayarları', icon: <Settings size={20} /> },
  ];

  // Inline CSS variables override for Dark Mode Admin Panel
  const adminThemeStyles = {
    '--bg-main': '#0f172a',
    '--bg-surface': '#1e293b',
    '--bg-dark': '#020617',
    '--bg-glass': 'rgba(30, 41, 59, 0.7)',
    '--border-glass': 'rgba(255, 255, 255, 0.1)',
    '--text-main': '#f8fafc',
    '--text-muted': '#94a3b8',
    '--color-primary': '#fbbf24', // golden yellow for admin highlights
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
        width: '280px', 
        background: 'var(--bg-surface)', 
        borderRight: '1px solid var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 0'
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
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    padding: '1rem 2rem',
                    color: activeTab === item.id ? 'var(--color-primary)' : 'var(--text-muted)',
                    background: activeTab === item.id ? 'var(--bg-glass)' : 'transparent',
                    borderLeft: `4px solid ${activeTab === item.id ? 'var(--color-primary)' : 'transparent'}`,
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}>
                  {item.icon}
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '0 2rem' }}>
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            color: '#ef4444', 
            padding: '1rem 0',
            fontWeight: 600,
            textDecoration: 'none'
          }}>
            <LogOut size={20} />
            Sistemi Kapat (Siteye Dön)
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Top Header */}
        <header style={{ 
          height: '80px', 
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem',
          background: 'var(--bg-surface)'
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Sistem Durumu: <span style={{ color: '#10b981' }}>Aktif</span></h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            
            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ color: 'var(--text-main)', position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <Bell size={24} />
                <span style={{ 
                  position: 'absolute', top: -2, right: -2, 
                  width: 10, height: 10, background: '#ef4444', 
                  borderRadius: '50%', boxShadow: '0 0 10px #ef4444' 
                }}></span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '1rem',
                  width: '320px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                  zIndex: 50
                }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0 }}>Bildirimler</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', cursor: 'pointer' }}>Tümünü Okundu İşaretle</span>
                  </div>
                  <div>
                    {notifications.map((notif) => (
                      <div key={notif.id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', marginTop: 6 }}></div>
                        <div>
                          <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>{notif.text}</p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '0.75rem', textAlign: 'center', background: 'var(--bg-dark)', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Tüm Bildirimleri Gör
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid var(--border-glass)', paddingLeft: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Dr. Yapay Zeka</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Baş Hekim</div>
              </div>
              <div style={{ 
                width: 40, height: 40, 
                borderRadius: '50%', 
                background: 'var(--color-secondary)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)'
              }}>
                🤖
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {activeTab === 'dashboard' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                {[
                  { title: 'Aktif Sensörler', value: '1,024', color: 'var(--color-primary)' },
                  { title: 'Bugünkü Taramalar', value: '84', color: '#10b981' },
                  { title: 'Bekleyen Operasyonlar', value: '3', color: '#f59e0b' },
                  { title: 'Sistem Yükü', value: '%12', color: '#ef4444' },
                ].map((stat, i) => (
                  <div key={i} style={{ 
                    background: 'var(--bg-surface)', 
                    border: '1px solid var(--border-glass)', 
                    borderRadius: 'var(--radius-lg)', 
                    padding: '1.5rem' 
                  }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{stat.title}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-heading)' }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ 
                background: 'var(--bg-surface)', 
                border: '1px solid var(--border-glass)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '2rem', minHeight: '400px' 
              }}>
                <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Hasta Durum Akışı</h3>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '1rem' }}>Hasta ID</th>
                      <th style={{ padding: '1rem' }}>Tür/Irk</th>
                      <th style={{ padding: '1rem' }}>Durum</th>
                      <th style={{ padding: '1rem' }}>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: '#P-001', type: 'Kedi (Tekir)', status: 'Tedavi', action: 'Gözlem Altında' },
                      { id: '#P-002', type: 'Köpek (Golden)', status: 'Acil', action: 'Müdahale Sürüyor' },
                      { id: '#P-003', type: 'Kuş (Muhabbet)', status: 'Stabil', action: 'Taburcu Bekliyor' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--color-primary)' }}>{row.id}</td>
                        <td style={{ padding: '1rem' }}>{row.type}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '1rem', 
                            fontSize: '0.8rem',
                            background: row.status === 'Acil' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: row.status === 'Acil' ? '#ef4444' : '#10b981'
                          }}>
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button style={{ 
                            background: 'transparent', 
                            border: '1px solid var(--border-glass)', 
                            color: 'var(--text-main)',
                            padding: '0.5rem 1rem', 
                            fontSize: '0.8rem',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer'
                          }}>
                            {row.action}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'messages' && (
            <div style={{ 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border-glass)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '2rem', minHeight: '400px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Gelen Mesajlar</h3>
                <span style={{ backgroundColor: 'var(--color-primary)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  {messages.length} Mesaj
                </span>
              </div>
              
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  <MessageSquare size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                  <p>Henüz yeni bir mesaj bulunmuyor.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ 
                      backgroundColor: 'var(--bg-dark)', 
                      border: '1px solid var(--border-glass)', 
                      padding: '1.5rem', 
                      borderRadius: 'var(--radius-md)' 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                        <div>
                          <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>{msg.name}</strong>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{msg.email}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{msg.date}</div>
                          <button 
                            onClick={() => {
                              setReplyingTo(msg.id);
                              setSentSuccess(null);
                            }}
                            style={{
                              background: 'rgba(251, 191, 36, 0.1)',
                              color: 'var(--color-primary)',
                              border: '1px solid rgba(251, 191, 36, 0.2)',
                              padding: '0.4rem 0.8rem',
                              borderRadius: 'var(--radius-md)',
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                          >
                            <Reply size={14} /> Yanıtla
                          </button>
                        </div>
                      </div>
                      <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-main)' }}>{msg.message}</p>

                      {/* Reply Box */}
                      {replyingTo === msg.id && (
                        <div style={{ 
                          marginTop: '1.5rem', 
                          padding: '1rem', 
                          background: 'rgba(0,0,0,0.2)', 
                          borderRadius: 'var(--radius-md)',
                          borderLeft: '3px solid var(--color-primary)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Alıcı: {msg.email}</span>
                            <button onClick={() => setReplyingTo(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={16}/></button>
                          </div>
                          
                          <textarea 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Mesajınızı buraya yazın..."
                            rows={3}
                            style={{
                              width: '100%',
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--border-glass)',
                              color: 'white',
                              padding: '0.75rem',
                              borderRadius: 'var(--radius-sm)',
                              marginBottom: '1rem',
                              fontFamily: 'inherit',
                              resize: 'vertical',
                              outline: 'none',
                              boxSizing: 'border-box'
                            }}
                          />
                          
                          <button 
                            onClick={() => handleReplySubmit(msg.id)}
                            disabled={isSending || !replyText.trim()}
                            style={{
                              background: 'var(--color-primary)',
                              color: '#000',
                              border: 'none',
                              padding: '0.5rem 1.5rem',
                              borderRadius: 'var(--radius-sm)',
                              fontWeight: 600,
                              cursor: isSending || !replyText.trim() ? 'not-allowed' : 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              opacity: isSending || !replyText.trim() ? 0.7 : 1
                            }}
                          >
                            <Send size={16} />
                            {isSending ? 'Gönderiliyor...' : 'Site Üzerinden Mail Gönder'}
                          </button>
                        </div>
                      )}

                      {/* Sent Success Message */}
                      {sentSuccess === msg.id && (
                        <div style={{
                          marginTop: '1rem',
                          padding: '0.75rem 1rem',
                          background: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: 'var(--radius-md)',
                          color: '#10b981',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          <CheckCircle2 size={18} />
                          Mail başarıyla gönderildi! Kullanıcıya iletildi.
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'messages' && (
            <div style={{ 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border-glass)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '4rem 2rem', textAlign: 'center' 
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🚧</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Modül Yapılandırılıyor</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
                Bu modül VagalVet sistemi için güvenli sunuculardan yükleniyor. Lütfen bekleyin.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
