import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Activity, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PatientManager = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', type: '', ownerName: '', ownerPhone: '', nextVaccine: '', vaccineName: '', status: 'Sağlıklı' });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientTab, setPatientTab] = useState('genel');

  useEffect(() => {
    let pts = JSON.parse(localStorage.getItem('vagalvet_patients') || '[]');
    if (pts.length === 0) {
      pts = [
        { id: '#P-001', name: 'Mia', type: 'Kedi (Tekir)', ownerName: 'Ayşe Yılmaz', ownerPhone: '05554443322', nextVaccine: '15.07.2026', vaccineName: 'Karma Aşı', status: 'Tedavi Sürecinde' },
        { id: '#P-002', name: 'Max', type: 'Köpek (Golden)', ownerName: 'Caner Demir', ownerPhone: '05321112233', nextVaccine: '20.08.2026', vaccineName: 'Kuduz Aşısı', status: 'Sağlıklı' }
      ];
      localStorage.setItem('vagalvet_patients', JSON.stringify(pts));
    }
    setPatients(pts);
  }, []);

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

  const handleDeletePatient = (id) => {
    const updated = patients.filter(pt => pt.id !== id);
    setPatients(updated);
    localStorage.setItem('vagalvet_patients', JSON.stringify(updated));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px', position: 'relative' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Biyo-Kayıtlar (CRM)</h3>
        <button onClick={() => setShowAddPatient(!showAddPatient)} style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16}/> {showAddPatient ? 'Vazgeç' : 'Yeni Hasta Ekle'}
        </button>
      </div>

      <AnimatePresence>
        {showAddPatient && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--border-glass)' }}>
              <h4 style={{ margin: '0 0 1.5rem 0' }}>Hızlı Kayıt</h4>
              <form onSubmit={handleAddPatient} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <input type="text" placeholder="Hasta Adı" required value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <input type="text" placeholder="Türü / Irkı" required value={newPatient.type} onChange={e => setNewPatient({...newPatient, type: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <input type="text" placeholder="Sahibi Ad Soyad" required value={newPatient.ownerName} onChange={e => setNewPatient({...newPatient, ownerName: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <input type="tel" placeholder="Telefon Numarası" required value={newPatient.ownerPhone} onChange={e => setNewPatient({...newPatient, ownerPhone: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button type="submit" style={{ padding: '0.6rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600 }}>Kaydet</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
            <th style={{ padding: '1rem' }}>ID</th>
            <th style={{ padding: '1rem' }}>Hasta Adı</th>
            <th style={{ padding: '1rem' }}>Tür / Irk</th>
            <th style={{ padding: '1rem' }}>Sahibi</th>
            <th style={{ padding: '1rem' }}>Durum</th>
            <th style={{ padding: '1rem', textAlign: 'right' }}>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((pt) => (
            <tr key={pt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: 'var(--color-primary)' }}>{pt.id}</td>
              <td style={{ padding: '1rem', fontWeight: 600 }}>{pt.name}</td>
              <td style={{ padding: '1rem' }}>{pt.type}</td>
              <td style={{ padding: '1rem' }}>{pt.ownerName} <br/><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pt.ownerPhone}</span></td>
              <td style={{ padding: '1rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', background: pt.status === 'Sağlıklı' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.2)', color: pt.status === 'Sağlıklı' ? '#10b981' : '#38bdf8' }}>
                  {pt.status}
                </span>
              </td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>
                <button onClick={() => setSelectedPatient(pt)} style={{ padding: '0.4rem 0.8rem', background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem', marginRight: '0.5rem' }}>Detay</button>
                {user?.role === 'admin' && (
                  <button onClick={() => handleDeletePatient(pt.id)} style={{ padding: '0.4rem 0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}>Sil</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ width: '800px', maxWidth: '90%', background: 'var(--bg-dark)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{selectedPatient.name}</h3>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedPatient.id} • {selectedPatient.type}</span>
                </div>
              </div>
              <button onClick={() => setSelectedPatient(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              <div style={{ width: '200px', borderRight: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column' }}>
                {['genel', 'aşılar', 'laboratuvar', 'notlar'].map(tab => (
                  <button key={tab} onClick={() => setPatientTab(tab)} style={{ background: patientTab === tab ? 'var(--bg-surface)' : 'transparent', color: patientTab === tab ? 'var(--color-primary)' : 'var(--text-muted)', border: 'none', padding: '1rem 1.5rem', textAlign: 'left', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', borderLeft: `3px solid ${patientTab === tab ? 'var(--color-primary)' : 'transparent'}` }}>
                    {tab === 'genel' ? 'Genel Bilgiler' : tab === 'aşılar' ? 'Aşı Geçmişi' : tab === 'laboratuvar' ? 'Laboratuvar' : 'Tedavi Notları'}
                  </button>
                ))}
              </div>
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
                  <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--color-primary)', position: 'relative' }}>
                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                      <div style={{ position: 'absolute', left: '-1.45rem', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--color-primary)', border: '4px solid var(--bg-surface)' }}></div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>{selectedPatient.vaccineName} (Gelecek Randevu)</h4>
                      <p style={{ margin: 0, color: 'var(--color-primary)', fontWeight: 600 }}>Beklenen Tarih: {selectedPatient.nextVaccine}</p>
                      <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hatırlatma SMS'i planlandı.</div>
                    </div>
                    
                    <div style={{ position: 'relative', marginBottom: '2rem', opacity: 0.7 }}>
                      <div style={{ position: 'absolute', left: '-1.45rem', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: '#10b981', border: '4px solid var(--bg-surface)' }}></div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>Karma Aşı (Uygulandı)</h4>
                      <p style={{ margin: 0, color: 'var(--text-muted)' }}>Uygulama Tarihi: 10.01.2026</p>
                      <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hekim: Dr. Mürüvvet Eraslan</div>
                    </div>

                    <div style={{ position: 'relative', opacity: 0.5 }}>
                      <div style={{ position: 'absolute', left: '-1.45rem', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: '#10b981', border: '4px solid var(--bg-surface)' }}></div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>İç/Dış Parazit (Uygulandı)</h4>
                      <p style={{ margin: 0, color: 'var(--text-muted)' }}>Uygulama Tarihi: 15.11.2025</p>
                    </div>
                  </div>
                )}
                {patientTab === 'laboratuvar' && (
                  <div>
                    <div style={{ border: '2px dashed var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '3rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.borderColor='var(--color-primary)'} onMouseLeave={(e)=>e.currentTarget.style.borderColor='var(--border-glass)'}>
                      <Activity size={48} color="var(--color-primary)" style={{ marginBottom: '1rem', marginInline: 'auto' }} />
                      <h4 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>PDF / Tahlil Sonucu Yükle</h4>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sürükleyip bırakın veya dosyalarınızdan seçin.</p>
                    </div>
                    
                    <div style={{ marginTop: '2rem' }}>
                      <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Geçmiş Dosyalar</h4>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <FileText size={24} color="#3b82f6" />
                          <div>
                            <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>tam_kan_sayimi_2025.pdf</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>12.04.2025 • 1.2 MB</div>
                          </div>
                        </div>
                        <button style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>İndir</button>
                      </div>
                    </div>
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
    </motion.div>
  );
};

export default PatientManager;
