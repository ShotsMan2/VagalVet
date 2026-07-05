import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Activity, Bell, MessageSquare, CheckCircle2, Mail, FileText, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Yeni aşılama stok uyarısı: Parvo', time: '10 dk önce', read: false },
    { id: 2, text: 'Yeni online randevu düştü.', time: '1 saat önce', read: false },
    { id: 3, text: 'Haftalık ciro raporu hazır.', time: '3 saat önce', read: false }
  ]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'NEW_APPOINTMENT' || data.type === 'NEW_MESSAGE') {
          toast.success(data.message || 'Yeni bir bildirim!');
          setNotifications(prev => [
            { id: Date.now(), text: data.message || 'Yeni bildirim', time: 'Az önce', read: false },
            ...prev
          ]);
        }
      } catch (err) {
        console.error('WS error:', err);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { id: 'dashboard', path: '/admin', label: 'Genel Bakış', icon: <LayoutDashboard size={20} /> },
    { id: 'appointments', path: '/admin/randevular', label: 'Akıllı Randevular', icon: <Calendar size={20} /> },
    { id: 'patients', path: '/admin/hastalar', label: 'Biyo-Kayıtlar (CRM)', icon: <Users size={20} /> },
    { id: 'inventory', path: '/admin/stok', label: 'Stok & Depo', icon: <Activity size={20} /> },
    { id: 'finance', path: '/admin/finans', label: 'Finans & Fatura', icon: <CheckCircle2 size={20} /> },
    { id: 'staff', path: '/admin/personel', label: 'Personel', icon: <Users size={20} /> },
    { id: 'messages', path: '/admin/mesajlar', label: 'Gelen Mesajlar', icon: <MessageSquare size={20} /> },
    { id: 'newsletter', path: '/admin/bulten', label: 'Bülten Aboneleri', icon: <Mail size={20} /> },
    { id: 'settings', path: '/admin/ayarlar', label: 'Sistem Ayarları', icon: <Settings size={20} /> },
    { id: 'content', path: '/admin/icerik', label: 'İçerik Yönetimi', icon: <FileText size={20} /> },
    { id: 'blog', path: '/admin/blog', label: 'Blog Yönetimi', icon: <BookOpen size={20} /> },
  ];

  const allowedForStaff = ['dashboard', 'appointments', 'patients'];
  const filteredMenuItems = menuItems.filter(item => 
    user?.role === 'admin' || allowedForStaff.includes(item.id)
  );

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
          <Link to="/admin" style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="VagalVet Logo" style={{ height: '36px', objectFit: 'contain' }} />
          </Link>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredMenuItems.map(item => {
              const isActive = item.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(item.path);
              return (
                <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                  <Link 
                    to={item.path}
                    style={{ 
                      width: '100%', display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1rem 2rem', color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
                      background: isActive ? 'var(--bg-glass)' : 'transparent',
                      borderLeft: `4px solid ${isActive ? 'var(--color-primary)' : 'transparent'}`,
                      transition: 'all 0.2s', textAlign: 'left', textDecoration: 'none', cursor: 'pointer'
                    }}>
                    {item.icon}
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div style={{ padding: '0 2rem' }}>
          <button onClick={() => { logout(); navigate('/admin/login'); }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#ef4444', padding: '1rem 0', fontWeight: 600, textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}>
            <LogOut size={20} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {/* Top Header */}
        <header style={{ 
          height: '80px', borderBottom: '1px solid var(--border-glass)', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem', background: 'var(--bg-surface)', flexShrink: 0
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
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.username || 'Admin'}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user?.role === 'admin' ? 'Sistem Yöneticisi' : 'Kullanıcı'}</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' }}>
                🤖
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
