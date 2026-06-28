import React, { useState } from 'react';
import { Lock, User, FileText, Calendar, Activity, Pill, LogOut, Download, AlertCircle } from 'lucide-react';

const ClientPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (phone && password) {
      setIsLoggedIn(true);
    }
  };

  const patient = {
    owner: 'Ayşe Yılmaz',
    petName: 'Mia',
    petType: 'Kedi (British Shorthair)',
    age: '2 Yaş',
    weight: '4.2 kg',
    nextVaccine: 'Karma Aşı (15 Temmuz 2026)',
    recentVisits: [
      { date: '10 Haz 2026', type: 'Genel Muayene', doctor: 'Dr. Mürüvvet Eraslan' },
      { date: '25 May 2026', type: 'İç-Dış Parazit', doctor: 'Dr. Mehmet Ali Eraslan' }
    ],
    prescriptions: [
      { name: 'Vitamin C + Bağışıklık Desteği', freq: 'Günde 1 kez' }
    ]
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', paddingTop: '80px' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Lock size={30} color="#000" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Hasta Portalı</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Sağlık verilerine erişmek için giriş yapın.</p>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Telefon Numaranız" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                placeholder="Şifreniz" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem', fontWeight: 600 }}>Giriş Yap</button>
          </form>
          <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Şifrenizi mi unuttunuz? Lütfen kliniğimizle iletişime geçin.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-main)', fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>Merhaba, {patient.owner}</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.1rem' }}>{patient.petName} için sağlık paneline hoş geldiniz.</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={18} /> Çıkış Yap
          </button>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Pet Info Card */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 700, color: '#000' }}>
                {patient.petName.charAt(0)}
              </div>
              <div>
                <h2 style={{ margin: 0, color: 'var(--text-main)' }}>{patient.petName}</h2>
                <span style={{ color: 'var(--text-muted)' }}>{patient.petType}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Yaş</span>
                <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}>{patient.age}</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ağırlık</span>
                <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}>{patient.weight}</div>
              </div>
            </div>
          </div>

          {/* Upcoming Card */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, var(--color-primary) 0%, #dca743 100%)', color: '#000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <AlertCircle size={24} />
              <h3 style={{ margin: 0 }}>Sıradaki İşlem</h3>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '1.2rem' }}>{patient.nextVaccine.split('(')[0]}</p>
              <p style={{ margin: 0, opacity: 0.9 }}>Tarih: {patient.nextVaccine.split('(')[1].replace(')', '')}</p>
            </div>
          </div>

          {/* Records List */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Activity size={24} color="var(--color-primary)" />
              <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Son Ziyaretler</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {patient.recentVisits.map((visit, i) => (
                <div key={i} style={{ paddingBottom: '1rem', borderBottom: i !== patient.recentVisits.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--text-main)' }}>{visit.type}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{visit.date}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{visit.doctor}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Pill size={24} color="var(--color-primary)" />
              <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Aktif Reçeteler</h3>
            </div>
            {patient.prescriptions.map((pres, i) => (
              <div key={i} style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{pres.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kullanım: {pres.freq}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Lab Results Placeholder */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={24} color="var(--color-primary)" />
                <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Laboratuvar Sonuçları</h3>
              </div>
            </div>
            <div style={{ background: 'var(--bg-surface)', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '3rem', textAlign: 'center' }}>
              <FileText size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>Yakın zamanda laboratuvar tahlili bulunmuyor.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
