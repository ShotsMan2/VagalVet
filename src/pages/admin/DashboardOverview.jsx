import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../../components/ui/Skeleton';

const DashboardOverview = () => {
  const { authFetch, user } = useAuth();
  const [stats, setStats] = useState({ totalPatients: 0, appointmentsToday: 0, activeTreatments: 0, newRegistrations: 0 });
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [patientsCount, setPatientsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authFetch('/api/stats').then(res => res.json()).then(data => setStats(data)).catch(err => console.error(err)).finally(() => {
      setTimeout(() => setLoading(false), 800);
    });
    setAppointmentsCount(JSON.parse(localStorage.getItem('vagalvet_appointments') || '[]').length);
    setPatientsCount(JSON.parse(localStorage.getItem('vagalvet_patients') || '[]').length);
    setMessagesCount(JSON.parse(localStorage.getItem('vagalvet_messages') || '[]').length);
  }, [authFetch]);

  const chartData = stats.chartData || [];
  const petDemographics = stats.petDemographics || [];
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
              <Skeleton width="60%" height="15px" style={{ marginBottom: '1rem' }} />
              <Skeleton width="40%" height="40px" />
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '350px' }}>
            <Skeleton width="40%" height="25px" style={{ marginBottom: '1.5rem' }} />
            <Skeleton width="100%" height="250px" />
          </div>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '350px' }}>
            <Skeleton width="40%" height="25px" style={{ marginBottom: '1.5rem' }} />
            <Skeleton width="100%" height="250px" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {[
          { title: 'Bekleyen Randevu', value: appointmentsCount, color: 'var(--color-primary)' },
          { title: 'Toplam Hasta', value: patientsCount, color: '#10b981' },
          { title: 'Gelen Mesaj', value: messagesCount, color: '#3b82f6' },
          { title: 'Sistem Yükü', value: '%12', color: '#ef4444' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{stat.title}</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '350px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>Randevu Trafiği (Haftalık)</h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRandevu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }} />
                <Area type="monotone" dataKey="randevu" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRandevu)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {user?.role === 'admin' && (
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '350px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>Aylık Gelir Trendi (₺)</h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[{ name: 'Oca', gelir: 45000 }, { name: 'Şub', gelir: 52000 }, { name: 'Mar', gelir: 48000 }, { name: 'Nis', gelir: 61000 }, { name: 'May', gelir: 59000 }, { name: 'Haz', gelir: 72000 }]} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-glass)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }} />
                <Area type="monotone" dataKey="gelir" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorGelir)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        )}
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '350px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>Hasta Dağılımı</h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={petDemographics} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {petDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }} />
              </PieChart>
            </ResponsiveContainer>
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
    </motion.div>
  );
};

export default DashboardOverview;
