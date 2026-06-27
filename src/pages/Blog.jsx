import React from 'react';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: 'Yavru Kedilerde İlk Aşı Takvimi Nasıl Olmalı?',
      excerpt: 'Yeni sahiplendiğiniz yavru kedinizin sağlıklı bir başlangıç yapması için bilmeniz gereken aşı takvimi ve paraziter uygulamalar.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
      category: 'Kedi Bakımı',
      date: '25 Haziran 2026',
      author: 'Dr. Ayşe Yılmaz'
    },
    {
      id: 2,
      title: 'Köpeklerde Sıcak Çarpması ve İlkyardım',
      excerpt: 'Yaz aylarında köpeklerinizi bekleyen en büyük tehlikelerden biri olan sıcak çarpması belirtileri ve acil müdahale yöntemleri.',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
      category: 'Köpek Bakımı',
      date: '20 Haziran 2026',
      author: 'Dr. Caner Demir'
    },
    {
      id: 3,
      title: 'Kuşlarda Beslenme: Doğru Yem Seçimi',
      excerpt: 'Muhabbet kuşu, papağan ve kanaryalar için ideal beslenme rasyonları, vitamin takviyeleri ve kaçınılması gereken besinler.',
      image: 'https://images.unsplash.com/photo-1480044965905-02098d414e96?w=800&q=80',
      category: 'Kuş Bakımı',
      date: '15 Haziran 2026',
      author: 'Vet. Hekim Elif Kaya'
    },
    {
      id: 4,
      title: 'Yaşlı Evcil Hayvanlarda Düzenli Check-up Önemi',
      excerpt: '7 yaş ve üzeri kedi ve köpeklerde sık görülen geriatrik hastalıkların erken teşhisi için yapılması gereken düzenli kontroller.',
      image: 'https://images.unsplash.com/photo-1537151608804-ea2f1fa3cc28?w=800&q=80',
      category: 'Koruyucu Hekimlik',
      date: '10 Haziran 2026',
      author: 'Dr. Ayşe Yılmaz'
    }
  ];

  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '120px 0 60px' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: 'rgba(238, 189, 95, 0.2)', color: 'var(--color-secondary)', borderRadius: 'var(--radius-full)', fontWeight: 600, marginBottom: '1rem' }}>
            <BookOpen size={18} /> VagalVet Blog
          </div>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Evcil Hayvan Sağlığı Rehberi
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Uzman hekimlerimiz tarafından hazırlanan güncel makaleler, bakım ipuçları ve klinik duyurularımız.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="glass-panel"
              style={{ 
                borderRadius: 'var(--radius-lg)', 
                overflow: 'hidden',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button className="btn btn-outline" style={{ padding: '0.75rem 2.5rem' }}>Daha Fazla Yükle</button>
        </div>

      </div>
    </main>
  );
}
