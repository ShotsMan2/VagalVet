import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Blog() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(item => ({
          ...item,
          id: item.id.toString(),
        }));
        setArticles(mapped);
      })
      .catch(err => console.error("Blog fetch hatası:", err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeArticle]);

  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeArticle]);



  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      <section style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        backgroundColor: 'var(--page-header-bg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(238,189,95,0.08)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(238,189,95,0.05)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', backgroundColor: 'rgba(238,189,95,0.2)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}
          >
            <BookOpen size={18} color="var(--color-secondary)" />
            <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>VagalVet Blog & Klinik Vakalar</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', marginBottom: '1rem' }}
          >
            Evcil Hayvan Sağlığı Rehberi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}
          >
            Uzman hekimlerimiz tarafından hazırlanan güncel makaleler, klinik vakalarımız ve detaylı bakım ipuçları.
          </motion.p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {articles.map((article, index) => (
            <article 
              key={article.id} 
              className={`glass-panel reveal-on-scroll delay-${(index % 4) * 100}`}
              onClick={() => setActiveArticle(article)}
              style={{ 
                borderRadius: 'var(--radius-lg)', 
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', top: 16, left: 16, 
                  background: 'var(--color-primary)', color: '#000', 
                  padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', 
                  fontSize: '0.8rem', fontWeight: 'bold', zIndex: 1 
                }}>
                  {article.category}
                </div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {article.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} /> {article.author}</span>
                </div>
                <h2 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', lineHeight: 1.4 }}>
                  {article.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {article.excerpt}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
                  Devamını Oku <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal for full article reading */}
        {activeArticle && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem'
          }} onClick={() => setActiveArticle(null)}>
            <div 
              style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveArticle(null)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white',
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 10
                }}
              >
                <X size={20} />
              </button>
              
              <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
                <img src={activeArticle.image} alt={activeArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              
              <div style={{ padding: '3rem' }}>
                <div style={{ display: 'inline-block', background: 'var(--color-primary)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {activeArticle.category}
                </div>
                <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {activeArticle.title}
                </h2>
                
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {activeArticle.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {activeArticle.author}</span>
                </div>
                
                <div style={{ 
                  color: 'var(--text-main)', 
                  fontSize: '1.05rem', 
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap'
                }}>
                  {activeArticle.content}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
