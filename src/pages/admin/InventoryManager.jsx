import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const InventoryManager = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [showAddInventory, setShowAddInventory] = useState(false);
  const [newInventory, setNewInventory] = useState({ name: '', category: '', stock: 0, critical: 5 });

  useEffect(() => {
    let inv = JSON.parse(localStorage.getItem('vagalvet_inventory') || '[]');
    if (inv.length === 0) {
      inv = [
        { id: 'INV-01', name: 'Karma Aşı (Kedi)', category: 'Aşı', stock: 12, critical: 15 },
        { id: 'INV-02', name: 'Kuduz Aşısı', category: 'Aşı', stock: 45, critical: 10 },
        { id: 'INV-03', name: 'Geniş Spektrumlu Antibiyotik', category: 'İlaç', stock: 8, critical: 20 },
        { id: 'INV-04', name: 'Premium Kedi Maması 15kg', category: 'Mama', stock: 4, critical: 5 }
      ];
      localStorage.setItem('vagalvet_inventory', JSON.stringify(inv));
    }
    setInventoryData(inv);
  }, []);

  const handleAddInventory = (e) => {
    e.preventDefault();
    const item = {
      id: 'INV-' + Math.floor(10 + Math.random() * 90),
      ...newInventory
    };
    const updated = [item, ...inventoryData];
    setInventoryData(updated);
    localStorage.setItem('vagalvet_inventory', JSON.stringify(updated));
    setShowAddInventory(false);
    setNewInventory({ name: '', category: '', stock: 0, critical: 5 });
    toast.success('Yeni stok ürünü başarıyla eklendi.');
  };

  const handleDeleteInventory = (id) => {
    if(window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
      const updated = inventoryData.filter(i => i.id !== id);
      setInventoryData(updated);
      localStorage.setItem('vagalvet_inventory', JSON.stringify(updated));
      toast.success('Ürün silindi.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Klinik Stok & Depo Takibi</h3>
        <button onClick={() => setShowAddInventory(!showAddInventory)} style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16}/> {showAddInventory ? 'Vazgeç' : 'Ürün Ekle'}
        </button>
      </div>

      <AnimatePresence>
        {showAddInventory && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--border-glass)' }}>
              <h4 style={{ margin: '0 0 1.5rem 0' }}>Yeni Ürün Ekle</h4>
              <form onSubmit={handleAddInventory} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <input type="text" placeholder="Ürün Adı" required value={newInventory.name} onChange={e => setNewInventory({...newInventory, name: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <input type="text" placeholder="Kategori (Aşı, İlaç, Mama vb.)" required value={newInventory.category} onChange={e => setNewInventory({...newInventory, category: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <input type="number" placeholder="Mevcut Stok" required value={newInventory.stock || ''} onChange={e => setNewInventory({...newInventory, stock: parseInt(e.target.value) || 0})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <input type="number" placeholder="Kritik Stok Seviyesi" required value={newInventory.critical || ''} onChange={e => setNewInventory({...newInventory, critical: parseInt(e.target.value) || 0})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
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
            <th style={{ padding: '1rem' }}>Ürün Kodu</th>
            <th style={{ padding: '1rem' }}>Ürün Adı</th>
            <th style={{ padding: '1rem' }}>Kategori</th>
            <th style={{ padding: '1rem' }}>Stok Durumu</th>
            <th style={{ padding: '1rem' }}>Durum</th>
            <th style={{ padding: '1rem', textAlign: 'right' }}>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((inv) => (
            <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: 'var(--color-primary)' }}>{inv.id}</td>
              <td style={{ padding: '1rem', fontWeight: 600 }}>{inv.name}</td>
              <td style={{ padding: '1rem' }}>{inv.category}</td>
              <td style={{ padding: '1rem' }}>{inv.stock} Adet</td>
              <td style={{ padding: '1rem' }}>
                {inv.stock <= inv.critical ? (
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><AlertTriangle size={14}/> Kritik Stok</span>
                ) : (
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Yeterli</span>
                )}
              </td>
              <td style={{ padding: '1rem', textAlign: 'right' }}>
                <button onClick={() => handleDeleteInventory(inv.id)} style={{ padding: '0.4rem 0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default InventoryManager;
