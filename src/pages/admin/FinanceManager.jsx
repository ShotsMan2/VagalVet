import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, FileText, Send } from 'lucide-react';

const FinanceManager = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '600px', display: 'flex', gap: '2rem' }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Finans & Faturalama</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Dışa Aktar (CSV)</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)' }}></div>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.9rem' }}>Aylık Ciro</p>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: 'var(--text-main)' }}>₺248,500</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#10b981' }}><TrendingUp size={14}/> +12% geçen aya göre</div>
          </div>
          <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)' }}></div>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.9rem' }}>Net Kar</p>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: 'var(--text-main)' }}>₺86,400</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#10b981' }}><TrendingUp size={14}/> +5% geçen aya göre</div>
          </div>
          <div style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)' }}></div>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.9rem' }}>Bekleyen Tahsilatlar</p>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: 'var(--text-main)' }}>₺12,100</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>4 Açık Fatura</div>
          </div>
        </div>
        
        <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Son Faturalar</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem 0' }}>FATURA NO</th>
              <th style={{ padding: '1rem 0' }}>MÜŞTERİ</th>
              <th style={{ padding: '1rem 0' }}>TARİH</th>
              <th style={{ padding: '1rem 0' }}>TUTAR</th>
              <th style={{ padding: '1rem 0' }}>DURUM</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'INV-2026-001', client: 'Ahmet Yılmaz (Mia)', date: '28 Haz 2026', amount: '₺1,250', status: 'Ödendi' },
              { id: 'INV-2026-002', client: 'Caner Demir (Max)', date: '28 Haz 2026', amount: '₺4,500', status: 'Bekliyor' },
              { id: 'INV-2026-003', client: 'Elif Kaya (Duman)', date: '27 Haz 2026', amount: '₺850', status: 'Ödendi' },
              { id: 'INV-2026-004', client: 'Burak Şahin (Paşa)', date: '26 Haz 2026', amount: '₺3,200', status: 'İptal' },
            ].map((inv) => (
              <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem 0', color: 'var(--color-primary)', fontWeight: 600 }}>{inv.id}</td>
                <td style={{ padding: '1rem 0', color: 'var(--text-main)' }}>{inv.client}</td>
                <td style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>{inv.date}</td>
                <td style={{ padding: '1rem 0', color: 'var(--text-main)', fontWeight: 600 }}>{inv.amount}</td>
                <td style={{ padding: '1rem 0' }}>
                  <span style={{ 
                    padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem',
                    background: inv.status === 'Ödendi' ? 'rgba(16, 185, 129, 0.1)' : inv.status === 'İptal' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                    color: inv.status === 'Ödendi' ? '#10b981' : inv.status === 'İptal' ? '#ef4444' : '#fbbf24',
                    border: `1px solid ${inv.status === 'Ödendi' ? 'rgba(16, 185, 129, 0.3)' : inv.status === 'İptal' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`
                  }}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ width: '350px', background: 'var(--bg-dark)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--color-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}><FileText size={20} color="#000" /></div>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>Yeni Fatura Oluştur</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Müşteri (Hasta Sahibi)</label>
            <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', color: 'white', outline: 'none' }}>
              <option>Ahmet Yılmaz (Kedi - Mia)</option>
              <option>Caner Demir (Köpek - Max)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>İşlem Kalemleri</label>
            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Muayene Ücreti</span>
              <span style={{ color: 'var(--color-primary)' }}>₺750</span>
            </div>
            <button style={{ width: '100%', background: 'transparent', border: '1px dashed var(--border-glass)', color: 'var(--text-muted)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>+ Kalem Ekle</button>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 600 }}>
              <span>Genel Toplam:</span>
              <span style={{ color: 'var(--color-primary)' }}>₺750</span>
            </div>
            <button style={{ width: '100%', background: 'var(--color-primary)', color: '#000', border: 'none', padding: '1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'transform 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}>
              <Send size={18} /> Faturayı Kes ve Gönder
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceManager;
