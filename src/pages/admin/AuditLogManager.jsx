import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Activity, Search, Filter, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const AuditLogManager = () => {
  const { authFetch } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ action: '', entity: '' });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page,
        limit: 20,
        ...(filters.action && { action: filters.action }),
        ...(filters.entity && { entity: filters.entity })
      }).toString();
      
      const res = await authFetch(`/api/v1/audit-logs?${query}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (err) {
      toast.error('Loglar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, filters]);

  return (
    <div className="admin-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={28} color="var(--color-primary)" />
            Audit & Activity Logs
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Sistem üzerindeki tüm yönetici hareketleri ve değişiklikler</p>
        </div>
        <button onClick={() => fetchLogs()} className="btn" style={{ background: 'var(--bg-glass)', color: 'var(--text-main)', border: '1px solid var(--border-glass)', display: 'flex', gap: '0.5rem' }}>
          <RefreshCw size={18} /> Yenile
        </button>
      </div>

      <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Filter size={20} color="var(--text-muted)" />
        <select 
          value={filters.action} 
          onChange={(e) => { setFilters(prev => ({...prev, action: e.target.value})); setPage(1); }}
          style={{ padding: '0.5rem 1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}
        >
          <option value="">Tüm İşlemler (Action)</option>
          <option value="CREATE">Oluşturma (CREATE)</option>
          <option value="UPDATE">Güncelleme (UPDATE)</option>
          <option value="DELETE">Silme (DELETE)</option>
        </select>

        <select 
          value={filters.entity} 
          onChange={(e) => { setFilters(prev => ({...prev, entity: e.target.value})); setPage(1); }}
          style={{ padding: '0.5rem 1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-glass)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)' }}
        >
          <option value="">Tüm Modüller (Entity)</option>
          <option value="appointment">Randevu</option>
          <option value="patient">Hasta</option>
          <option value="blog">Blog</option>
          <option value="settings">Ayarlar</option>
        </select>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Yükleniyor...</div>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-glass)', borderBottom: '1px solid var(--border-glass)', textAlign: 'left' }}>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Tarih</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Kullanıcı ID</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>İşlem</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Modül (ID)</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>Detaylar</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>{new Date(log.created_at).toLocaleString('tr-TR')}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{log.user_id || 'Sistem'}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ 
                        padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600,
                        background: log.action === 'CREATE' ? 'rgba(16, 185, 129, 0.1)' : log.action === 'DELETE' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                        color: log.action === 'CREATE' ? '#10b981' : log.action === 'DELETE' ? '#ef4444' : '#fbbf24'
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>{log.entity} {log.entity_id ? `(#${log.entity_id})` : ''}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{log.details}</td>
                  </tr>
                ))}
                {logs.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Kayıt bulunamadı.</td>
                  </tr>
                )}
              </tbody>
            </table>
            
            <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Sayfa {page} / {totalPages}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(p => p - 1)}
                  style={{ padding: '0.5rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  disabled={page === totalPages} 
                  onClick={() => setPage(p => p + 1)}
                  style={{ padding: '0.5rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1 }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuditLogManager;
