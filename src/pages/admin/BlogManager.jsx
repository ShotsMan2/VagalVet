import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BlogManager = () => {
  const { authFetch } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', excerpt: '', content: '', image: '', category: '', date: 'Yakın Zamanda', author: 'VagalVet Ekibi' });

  useEffect(() => {
    authFetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setBlogs(data);
        else setBlogs(JSON.parse(localStorage.getItem('vagalvet_blogs') || '[]'));
      })
      .catch(err => {
        console.error("Blog API hatası:", err);
        setBlogs(JSON.parse(localStorage.getItem('vagalvet_blogs') || '[]'));
      });
  }, [authFetch]);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await authFetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog)
      });
      if (response.ok) {
        const savedBlog = await response.json();
        const updated = [savedBlog, ...blogs];
        setBlogs(updated);
        localStorage.setItem('vagalvet_blogs', JSON.stringify(updated));
      } else {
        const blog = { id: Date.now(), ...newBlog };
        const updated = [blog, ...blogs];
        setBlogs(updated);
        localStorage.setItem('vagalvet_blogs', JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Blog kaydetme hatası:', err);
      const blog = { id: Date.now(), ...newBlog };
      const updated = [blog, ...blogs];
      setBlogs(updated);
      localStorage.setItem('vagalvet_blogs', JSON.stringify(updated));
    }
    setNewBlog({ title: '', excerpt: '', content: '', image: '', category: '', date: 'Yakın Zamanda', author: 'VagalVet Ekibi' });
    setShowAddBlog(false);
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
      try {
        await authFetch(`/api/blog/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Blog silme API hatası:', err);
      }
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      localStorage.setItem('vagalvet_blogs', JSON.stringify(updated));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ paddingBottom: '2rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Blog Yönetimi</h2>
        <button onClick={() => setShowAddBlog(!showAddBlog)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> {showAddBlog ? 'Vazgeç' : 'Yeni Yazı Ekle'}
        </button>
      </div>

      {showAddBlog && (
        <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', marginBottom: '2rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Yeni Blog Yazısı</h3>
          <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Başlık</label>
              <input type="text" required value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Özet</label>
              <textarea rows={2} required value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white', resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>İçerik</label>
              <textarea rows={6} required value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Görsel URL (Örn: https://images.unsplash...)</label>
                <input type="text" required value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Kategori</label>
                <input type="text" required value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)', background: 'var(--bg-dark)', color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">Kaydet</button>
              <button type="button" onClick={() => setShowAddBlog(false)} className="btn btn-outline" style={{ color: 'var(--text-main)', border: '1px solid var(--border-glass)' }}>İptal</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <div style={{ height: '160px', width: '100%', background: '#333' }}>
              <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>{blog.category}</div>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', color: 'var(--text-main)' }}>{blog.title}</h3>
              <button onClick={() => handleDeleteBlog(blog.id)} style={{ padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', width: '100%' }}>
                Yazıyı Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogManager;
