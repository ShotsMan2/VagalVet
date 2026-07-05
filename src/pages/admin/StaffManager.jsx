import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const StaffManager = () => {
  const [staffData, setStaffData] = useState([]);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', status: 'Müsait', shift: '09:00 - 18:00' });

  useEffect(() => {
    let staff = JSON.parse(localStorage.getItem('vagalvet_staff') || '[]');
    if (staff.length === 0) {
      staff = [
        { id: 1, name: 'Vet. Hekim Mürüvvet Eraslan', status: 'Muayenede', shift: '09:00 - 18:00' },
        { id: 2, name: 'Vet. Hekim Mehmet Ali Eraslan', status: 'Ameliyatta', shift: '10:00 - 19:00' },
        { id: 3, name: 'Vet. Tek. Ayşe Yılmaz', status: 'Müsait', shift: '08:00 - 17:00' }
      ];
      localStorage.setItem('vagalvet_staff', JSON.stringify(staff));
    }
    setStaffData(staff);
  }, []);

  const handleAddStaff = (e) => {
    e.preventDefault();
    const s = {
      id: Date.now(),
      ...newStaff
    };
    const updated = [s, ...staffData];
    setStaffData(updated);
    localStorage.setItem('vagalvet_staff', JSON.stringify(updated));
    setShowAddStaff(false);
    setNewStaff({ name: '', status: 'Müsait', shift: '09:00 - 18:00' });
    toast.success('Yeni personel başarıyla eklendi.');
  };

  const handleDeleteStaff = (id) => {
    if(window.confirm('Personel kaydını silmek istediğinize emin misiniz?')) {
      const updated = staffData.filter(s => s.id !== id);
      setStaffData(updated);
      localStorage.setItem('vagalvet_staff', JSON.stringify(updated));
      toast.success('Personel kaydı silindi.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Personel & Nöbet Çizelgesi</h3>
        <button onClick={() => setShowAddStaff(!showAddStaff)} style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16}/> {showAddStaff ? 'Vazgeç' : 'Personel Ekle'}
        </button>
      </div>

      <AnimatePresence>
        {showAddStaff && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
            <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--border-glass)' }}>
              <h4 style={{ margin: '0 0 1.5rem 0' }}>Yeni Personel Ekle</h4>
              <form onSubmit={handleAddStaff} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <input type="text" placeholder="Ad Soyad" required value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <input type="text" placeholder="Mesai (Örn: 09:00 - 18:00)" required value={newStaff.shift} onChange={e => setNewStaff({...newStaff, shift: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)' }} />
                <select required value={newStaff.status} onChange={e => setNewStaff({...newStaff, status: e.target.value})} style={{ padding: '0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', borderRadius: 'var(--radius-sm)', outline: 'none' }}>
                  <option value="Müsait">Müsait</option>
                  <option value="Muayenede">Muayenede</option>
                  <option value="Ameliyatta">Ameliyatta</option>
                  <option value="İzinde">İzinde</option>
                </select>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
                  <button type="submit" style={{ padding: '0.6rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 600 }}>Kaydet</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {staffData.map(staff => (
          <div key={staff.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-dark)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '1.2rem', fontWeight: 800 }}>
                {staff.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{staff.name}</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mesai: {staff.shift}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ 
                padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600,
                background: staff.status === 'Müsait' ? 'rgba(16, 185, 129, 0.2)' : staff.status === 'Muayenede' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: staff.status === 'Müsait' ? '#10b981' : staff.status === 'Muayenede' ? '#38bdf8' : '#ef4444'
              }}>
                {staff.status}
              </span>
              <button onClick={() => handleDeleteStaff(staff.id)} style={{ padding: '0.4rem 0.8rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.8rem' }}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StaffManager;
