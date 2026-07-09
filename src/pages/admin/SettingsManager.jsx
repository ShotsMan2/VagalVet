import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SettingsManager = () => {
  const [settings, setSettings] = useState({ maintenanceMode: false, onlineBooking: true, emailNotifications: true });
  const [contactSettings, setContactSettings] = useState({ phone: '', email: '', instagram: '', facebook: '' });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const defaultContactSettings = {
      phone: '0553 384 14 60',
      email: 'info@vagalvet.com',
      instagram: 'https://instagram.com/vagalvet',
      facebook: 'https://facebook.com/vagalvet'
    };
    setContactSettings(JSON.parse(localStorage.getItem('vagalvet_contact_settings') || JSON.stringify(defaultContactSettings)));
  }, []);

  const handleSaveContactSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('vagalvet_contact_settings', JSON.stringify(contactSettings));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', maxWidth: '600px' }}
    >
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
    </motion.div>
  );
};

export default SettingsManager;
