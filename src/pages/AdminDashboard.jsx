import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Activity, Bell } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Genel Bakış', icon: <LayoutDashboard size={20} /> },
    { id: 'patients', label: 'Biyo-Kayıtlar', icon: <Users size={20} /> },
    { id: 'appointments', label: 'Akıllı Randevular', icon: <Calendar size={20} /> },
    { id: 'settings', label: 'Sistem Ayarları', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'var(--bg-dark)',
      color: 'var(--text-main)',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        background: 'var(--bg-surface)', 
        borderRight: '1px solid var(--border-glass)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 0'
      }}>
        <div style={{ padding: '0 2rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            width: '32px', height: '32px', 
            background: 'var(--color-primary)', 
            borderRadius: '8px',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <Activity color="var(--bg-dark)" size={20} />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>
            Vagal<span style={{ color: 'var(--color-secondary)' }}>Vet</span> Admin
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
            fontWeight: 600
          }}>
            <LogOut size={20} />
            Sistemi Kapat (Siteye Dön)
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
            <button style={{ color: 'var(--text-main)', position: 'relative' }}>
              <Bell size={24} />
              <span style={{ 
                position: 'absolute', top: -5, right: -5, 
                width: 10, height: 10, background: '#ef4444', 
                borderRadius: '50%', boxShadow: '0 0 10px #ef4444' 
              }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Dr. Yapay Zeka</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Baş Hekim</div>
              </div>
              <div style={{ 
                width: 40, height: 40, 
                borderRadius: '50%', 
                background: 'var(--color-secondary)',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
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
                  { title: 'Sistem Yükü', value: '%12', color: 'var(--color-secondary)' },
                ].map((stat, i) => (
                  <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{stat.title}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-heading)' }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-panel" style={{ padding: '2rem', minHeight: '400px' }}>
                <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Holografik Tarama Akışı</h3>
                
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
                      { id: '#NX-31-A', type: 'Siber-Kedi (Bengal)', status: 'Optimizasyon', action: 'Tarama Sürüyor' },
                      { id: '#NX-31-B', type: 'Biyo-Köpek (Golden)', status: 'Kritik', action: 'Acil Müdahale' },
                      { id: '#NX-31-C', type: 'Avian-Drone', status: 'Stabil', action: 'Taburcu' },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--color-primary)' }}>{row.id}</td>
                        <td style={{ padding: '1rem' }}>{row.type}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '1rem', 
                            fontSize: '0.8rem',
                            background: row.status === 'Kritik' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                            color: row.status === 'Kritik' ? '#ef4444' : '#10b981'
                          }}>
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
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

          {activeTab !== 'dashboard' && (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
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
