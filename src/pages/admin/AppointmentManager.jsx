import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../../components/ui/Skeleton';

const AppointmentManager = () => {
  const { authFetch } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authFetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const statusMap = { 'pending': 'Beklemede', 'approved': 'Onaylandı', 'rejected': 'Reddedildi' };
          const mapped = data.map(a => ({ 
            ...a, 
            status: statusMap[a.status] || a.status,
            petName: a.petName || a.petType,
            reason: a.reason || a.service
          }));
          setAppointments(mapped);
        } else {
          setAppointments(JSON.parse(localStorage.getItem('vagalvet_appointments') || '[]'));
        }
      })
      .catch(err => {
        console.error(err);
        setAppointments(JSON.parse(localStorage.getItem('vagalvet_appointments') || '[]'));
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 800);
      });
  }, [authFetch]);

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>Randevu Yönetimi</h2>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <Skeleton width="20%" height="20px" />
              <Skeleton width="30%" height="20px" />
              <Skeleton width="15%" height="20px" />
              <Skeleton width="20%" height="20px" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  const handleAppointmentStatus = (id, status) => {
    const updated = appointments.map(apt => apt.id === id ? { ...apt, status } : apt);
    setAppointments(updated);
    localStorage.setItem('vagalvet_appointments', JSON.stringify(updated));
    const reverseMap = { 'Beklemede': 'pending', 'Onaylandı': 'approved', 'Reddedildi': 'rejected' };
    authFetch(`/api/appointments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: reverseMap[status] || status })
    }).catch(err => console.error('Status güncelleme hatası:', err));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Akıllı Randevular</h3>
        <span style={{ backgroundColor: 'var(--color-primary)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          {appointments.length} Kayıt
        </span>
      </div>
      
      {appointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Randevu kaydı bulunmamaktadır.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {/* Bekleyenler Column */}
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ margin: 0, paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)', color: '#fbbf24', display: 'flex', justifyContent: 'space-between' }}>
              Bekleyenler 
              <span style={{ background: 'rgba(251, 191, 36, 0.2)', padding: '2px 8px', borderRadius: '1rem', fontSize: '0.8rem' }}>
                {appointments.filter(a => a.status === 'Beklemede').length}
              </span>
            </h4>
            {appointments.filter(a => a.status === 'Beklemede').map(apt => (
              <div key={apt.id} style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{apt.petName} - {apt.ownerName}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{apt.time}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>{apt.reason}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleAppointmentStatus(apt.id, 'Onaylandı')} style={{ flex: 1, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(16, 185, 129, 0.2)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(16, 185, 129, 0.1)'}>Onayla</button>
                  <button onClick={() => handleAppointmentStatus(apt.id, 'Reddedildi')} style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.4rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(239, 68, 68, 0.2)'} onMouseLeave={(e)=>e.currentTarget.style.background='rgba(239, 68, 68, 0.1)'}>İptal Et</button>
                </div>
              </div>
            ))}
          </div>

          {/* Onaylananlar / Muayenede Column */}
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ margin: 0, paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)', color: '#10b981', display: 'flex', justifyContent: 'space-between' }}>
              Onaylananlar 
              <span style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: '1rem', fontSize: '0.8rem' }}>
                {appointments.filter(a => a.status === 'Onaylandı').length}
              </span>
            </h4>
            {appointments.filter(a => a.status === 'Onaylandı').map(apt => (
              <div key={apt.id} style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.3)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{apt.petName} - {apt.ownerName}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{apt.date}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{apt.phone}</div>
                <div style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Check size={14} /> Muayene Bekleniyor
                </div>
              </div>
            ))}
          </div>

          {/* İptal Edilenler Column */}
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ margin: 0, paddingBottom: '1rem', borderBottom: '1px solid var(--border-glass)', color: '#ef4444', display: 'flex', justifyContent: 'space-between' }}>
              İptal / Red 
              <span style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '2px 8px', borderRadius: '1rem', fontSize: '0.8rem' }}>
                {appointments.filter(a => a.status === 'Reddedildi').length}
              </span>
            </h4>
            {appointments.filter(a => a.status === 'Reddedildi').map(apt => (
              <div key={apt.id} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-glass)', padding: '1rem', opacity: 0.7 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'line-through' }}>{apt.petName}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{apt.date}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#ef4444' }}>Randevu İptal Edildi</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentManager;
