import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, ArrowRight, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Hardcoded fallback blog verileri — API ve localStorage başarısız olursa kullanılır
const fallbackBlogs = [
  {
    id: '1',
    title: 'Evcil Hayvanlarımızı Neden Kısırlaştırmalıyız? Kısırlaştırmanın Önemi Nedir?',
    excerpt: 'Kısırlaştırma, hayvan refahını artıran, yaşam süresini uzatan ve birçok ciddi hastalığın önüne geçen çok önemli bir cerrahi müdahaledir.',
    content: '🔖 Dişi hayvanların kısırlaştırılmasıyla kızgınlık dönemine bağlı huzursuzluk, aşırı miyavlama, yuvarlanma ve çiftleşme davranışları ortadan kalkmaktadır. Erkek hayvanların dişilere yönelmesine bağlı kaçma, kavga etme ve yaralanma risklerini azaltır.\n\n🔖 Erkek hayvanların kısırlaştırılmasıyla üreme hormonlarına bağlı davranışlarda belirgin azalma görülmektedir.\n\n🔖 Dişi kedi ve köpeklerde kısırlaştırma meme tümörü riskini anlamlı ölçüde azaltmaktadır.\n\n🔖 Kısırlaştırma istenmeyen gebelikleri ve doğumla ilgili komplikasyonları tamamen önler.\n\n‼️ ÖZELLİKLE PYOMETRA VE PROSTAT HASTALIKLARI GİBİ CİDDİ KLİNİK TABLOLAR GÖZ ÖNÜNE ALINIRSA EVCİL HAYVANIMIZI KISIRLAŞTIRMAK İÇİN GEÇ KALINMAMALI, POTANSİYEL RİSKLERİN ÖNÜNE GEÇİLMELİDİR.',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
    category: 'Koruyucu Hekimlik',
    date: 'Yakın Zamanda',
    author: '@muru.vett & @m.ali_eraslan'
  },
  {
    id: '2',
    title: 'Yeni Doğum Yapan Bir Kedideki Anne Rolü Nedir?',
    excerpt: 'İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu kliniğimize getirildi. Göbek bağını annenin kesmediği durumlarda ne yapılmalıdır?',
    content: 'İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu yavrular birbirine dolanmış bir şekilde kliniğimize getirildi.\n\n📌 YENİ DOĞUM YAPAN BİR KEDİDEKİ ANNE ROLÜ NEDİR?\n\n🐱 Yenidoğan yavru kediler doğru vücut ısısının korunması, bakım, korunma ve idrar/dışkılama uyarımı için annelerine bağımlıdır.\n🐱 Doğumda normal koşullar altında anne fetal zarları açmak, göbek bağını kesmek ve yavruları yalamakla sorumludur.\n\n⚠️ UNUTMAYIN! İlk doğumu yapan annelerde annelik içgüdüsü zayıf olabilir. Bu gibi durumlarda en kısa sürede veteriner hekime başvurulmalıdır.',
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800&q=80',
    category: 'Klinik Vakalar',
    date: 'Yakın Zamanda',
    author: 'VagalVet Ekibi'
  },
  {
    id: '3',
    title: 'Canine Parvoviral Enteritis (Lina Vakamız)',
    excerpt: 'Kanin Parvoviral Enteritis nedir? Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.',
    content: '🐶🤎 Lina\n🦠 Canine Parvoviral Enteritis\n\n🔖 Kanin Parvoviral Enteritis nedir?\n• Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.\n\n🔖 Nasıl Bulaşır?\n• Bu hastalık hava yoluyla direkt olarak veya hasta köpekler tarafından enfekte dışkı ile kontamine gıdaların ağız yoluyla alınması sonucu geçebilmektedir.\n\n⚠️ Korunmanın En Etkili Yolu: AŞILAMA 💉\n\nGeçmiş olsun Lina! 🥰',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
    category: 'Köpek Bakımı',
    date: 'Yakın Zamanda',
    author: 'VagalVet Ekibi'
  }
];

export default function Blog() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFromFallback = () => {
      // Önce localStorage'dan dene, yoksa hardcoded fallback kullan
      const cached = localStorage.getItem('vagalvet_blogs');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.length > 0) {
            setArticles(parsed);
            return;
          }
        } catch (e) {
          console.error('localStorage parse hatası:', e);
        }
      }
      setArticles(fallbackBlogs);
    };

    fetch('/api/blog')
      .then(res => {
        if (!res.ok) throw new Error('API yanıt vermedi: ' + res.status);
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('API JSON döndürmedi');
        }
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          const mapped = data.map(item => ({
            ...item,
            id: item.id.toString(),
          }));
          setArticles(mapped);
        } else {
          // API başarılı ama boş dönerse → fallback'ten oku
          loadFromFallback();
        }
      })
      .catch(err => {
        console.error("Blog fetch hatası:", err);
        setError(err.message);
        // API başarısız olursa → fallback'ten oku
        loadFromFallback();
      })
      .finally(() => {
        setLoading(false);
      });
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

        {/* Loading State - Skeleton Kartlar */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}
              >
                <div style={{ height: '240px', background: 'linear-gradient(135deg, rgba(238,189,95,0.08), rgba(238,189,95,0.03))' }} />
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '80px', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }} />
                    <div style={{ width: '100px', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }} />
                  </div>
                  <div style={{ width: '85%', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', marginBottom: '0.75rem' }} />
                  <div style={{ width: '60%', height: '20px', borderRadius: '4px', background: 'rgba(255,255,255,0.07)', marginBottom: '1rem' }} />
                  <div style={{ width: '100%', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '0.5rem' }} />
                  <div style={{ width: '90%', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} />
                  <div style={{ width: '120px', height: '16px', borderRadius: '4px', background: 'rgba(238,189,95,0.15)' }} />
                </div>
              </div>
            ))}
            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
              }
            `}</style>
          </div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5rem 2rem',
              textAlign: 'center'
            }}
          >
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'rgba(238,189,95,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '2rem',
              border: '2px solid rgba(238,189,95,0.2)'
            }}>
              <BookOpen size={40} color="var(--color-secondary)" />
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-heading)',
              marginBottom: '0.75rem'
            }}>
              Henüz blog yazısı bulunmamaktadır
            </h3>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '1rem',
              maxWidth: '450px',
              lineHeight: 1.7
            }}>
              Uzman hekimlerimiz tarafından hazırlanan makaleler yakında burada yayınlanacaktır.
            </p>
          </motion.div>
        )}

        {/* Blog Grid */}
        {!loading && articles.length > 0 && (
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
        )}

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
