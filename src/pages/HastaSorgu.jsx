import React, { useState } from 'react';
import { Search, Syringe, Calendar, FileText, AlertCircle } from 'lucide-react';

export default function HastaSorgu() {
  const [phone, setPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setIsSearching(true);
    setError('');
    
    // Simulate database lookup
    setTimeout(() => {
      setIsSearching(false);
      
      const patients = JSON.parse(localStorage.getItem('vagalvet_patients') || '[]');
      const found = patients.filter(p => p.ownerPhone === phone);
      
      if (found.length > 0) {
        setPatientData(found);
      } else {
        // Return some dummy data if it's the exact dummy phone, otherwise error
        if (phone === '05554443322') {
          setPatientData([{
            id: '#P-001',
            name: 'Mia',
            type: 'Kedi (Tekir)',
            ownerName: 'Ayşe Yılmaz',
            nextVaccine: '15.07.2026',
            vaccineName: 'Karma Aşı (2. Doz)',
            status: 'Tedavi Sürecinde'
          }]);
        } else {
          setError('Bu telefon numarasına kayıtlı hasta bulunamadı. Lütfen numarayı kontrol ediniz.');
          setPatientData(null);
        }
      }
    }, 1200);
  };

  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '120px 0 60px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Müşteri Portalı
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Telefon numaranız ile sisteme giriş yaparak dostlarınızın aşı takvimini ve randevularını takip edebilirsiniz.
            (Test için: 05554443322 yazabilirsiniz)
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefon Numaranız (Örn: 05554443322)"
                required
                style={{
                  width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-color)',
                  background: 'var(--bg-surface)', fontFamily: 'inherit', fontSize: '1.1rem', outline: 'none', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSearching}
              style={{ padding: '0 2rem', opacity: isSearching ? 0.7 : 1 }}
            >
              {isSearching ? 'Sorgulanıyor...' : 'Sorgula'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} /> {error}
            </div>
          )}
        </div>

        {patientData && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {patientData.map((patient, index) => (
              <div key={index} className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>{patient.name}</h2>
                    <div style={{ color: 'var(--text-muted)' }}>{patient.type} • Sahibi: {patient.ownerName}</div>
                  </div>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.85rem' }}>
                    ID: {patient.id}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                      <Syringe size={18} /> Yaklaşan Aşı
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{patient.nextVaccine || 'Planlanmış aşı yok'}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{patient.vaccineName || '-'}</div>
                  </div>

                  <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                      <Calendar size={18} /> Randevu Durumu
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>Aktif Randevu Yok</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Yeni randevu alabilirsiniz</div>
                  </div>

                  <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8b5cf6', marginBottom: '0.5rem', fontWeight: 600 }}>
                      <FileText size={18} /> Tedavi Durumu
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{patient.status || 'Sağlıklı'}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Son kontrol: 2 hafta önce</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
