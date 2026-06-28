import React, { useEffect, useState } from 'react';
import { 
  Stethoscope, Award, Heart, Clock, Shield, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

const Ekibimiz = () => {
  const [mounted, setMounted] = useState(false);
  const [siteContent, setSiteContent] = useState({});

  useEffect(() => { 
    setMounted(true); 
    const savedContent = localStorage.getItem('vagalvet_site_content');
    if (savedContent) {
      setSiteContent(JSON.parse(savedContent));
    }

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
  }, []);

  const values = [
    { icon: <Award size={28} color="var(--color-secondary)" />, title: 'Deneyim & Uzmanlık', desc: 'Yılların verdiği bilgi birikimi ve sürekli eğitimle en güncel veterinerlik uygulamalarını sunuyoruz.' },
    { icon: <Shield size={28} color="var(--color-secondary)" />, title: 'Modern Ekipman', desc: 'Son teknoloji tıbbi cihazlar ve donanımla doğru teşhis ve etkili tedavi sağlıyoruz.' },
    { icon: <Heart size={28} color="var(--color-secondary)" />, title: 'Sevgi & Şefkat', desc: 'Her hastamıza özel, sevgi dolu yaklaşım. Dostlarınızı kendi ailemizin bir ferdi gibi görüyoruz.' },
    { icon: <Clock size={28} color="var(--color-secondary)" />, title: '7/24 Erişim', desc: 'Acil durumlarda gece gündüz ulaşılabilir veteriner hizmeti. Tek bir telefon uzağınızdayız.' },
  ];

  return (
    <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      
      {/* Hero Banner */}
      <section style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        backgroundColor: 'var(--page-header-bg)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(238,189,95,0.08)' }}></div>
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(238,189,95,0.05)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'inline-block', padding: '0.5rem 1.25rem', backgroundColor: 'rgba(238,189,95,0.2)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}
          >
            <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Uzman Kadromuz</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', marginBottom: '1rem' }}
          >
            Ekibimiz
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}
          >
            Deneyimli ve şefkatli veteriner hekimlerimizle can dostlarınız güvenilir ellerde.
          </motion.p>
        </div>
      </section>

      {/* Team Profiles */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="animate-fade-in-up delay-100" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Veteriner Hekimlerimiz</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Alanında uzman, sevgi dolu ve özveriyle çalışan veteriner hekimlerimizi tanıyın.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            
            {/* Vet 1 */}
            <div className="surface-card glass-panel delay-100 reveal-on-scroll" style={{ padding: '3rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                opacity: 0.8,
                zIndex: 0
              }}></div>
              <div style={{
                position: 'relative', zIndex: 1,
                width: '160px', height: '160px',
                borderRadius: '50%',
                margin: '0 auto 2rem',
                border: '6px solid var(--bg-surface)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                background: '#fff'
              }}>
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" alt="Mürüvvet Eraslan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.25rem', position: 'relative', zIndex: 1 }}>Mürüvvet Eraslan</h3>
              <div style={{ display: 'inline-block', padding: '0.4rem 1rem', backgroundColor: 'rgba(238,189,95,0.15)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Veteriner Hekim & Dahiliye Uzmanı</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Hayvan sağlığı ve refahı konusundaki tutkusu ile tanınan Veteriner Hekim Mürüvvet Eraslan, 
                her hastasına bireysel yaklaşım göstererek en uygun tedavi planlarını oluşturmaktadır. 
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--bg-soft)', borderRadius: '4px', color: 'var(--text-muted)' }}>Dahiliye</span>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--bg-soft)', borderRadius: '4px', color: 'var(--text-muted)' }}>Koruyucu Hekimlik</span>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--bg-soft)', borderRadius: '4px', color: 'var(--text-muted)' }}>Beslenme</span>
              </div>
            </div>

            {/* Vet 2 */}
            <div className="surface-card glass-panel delay-200 reveal-on-scroll" style={{ padding: '3rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '120px',
                background: 'linear-gradient(135deg, var(--color-secondary), #10b981)',
                opacity: 0.8,
                zIndex: 0
              }}></div>
              <div style={{
                position: 'relative', zIndex: 1,
                width: '160px', height: '160px',
                borderRadius: '50%',
                margin: '0 auto 2rem',
                border: '6px solid var(--bg-surface)',
                boxShadow: 'var(--shadow-md)',
                overflow: 'hidden',
                background: '#fff'
              }}>
                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80" alt="Mehmet Ali Eraslan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '0.25rem', position: 'relative', zIndex: 1 }}>Mehmet Ali Eraslan</h3>
              <div style={{ display: 'inline-block', padding: '0.4rem 1rem', backgroundColor: 'rgba(47,79,79,0.1)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>Veteriner Hekim & Cerrahi Uzmanı</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Cerrahi ve acil müdahale konularındaki uzmanlığıyla bilinen Veteriner Hekim Mehmet Ali Eraslan, 
                hayvan sağlığı alanında kapsamlı bir deneyime sahiptir.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--bg-soft)', borderRadius: '4px', color: 'var(--text-muted)' }}>Ortopedi</span>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--bg-soft)', borderRadius: '4px', color: 'var(--text-muted)' }}>Yumuşak Doku Cerrahisi</span>
                <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--bg-soft)', borderRadius: '4px', color: 'var(--text-muted)' }}>Acil</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Neden VagalVet */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Neden VagalVet?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '550px', margin: '0 auto' }}>
              Bizi tercih etmeniz için birçok neden var.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {values.map((v, i) => (
              <div key={i} className={`surface-card reveal-on-scroll delay-${(i % 4) * 100}`} style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px',
                  backgroundColor: 'var(--bg-soft)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Çalışma Saatlerimiz</h2>
          </div>
          <div className="surface-card" style={{ padding: '3rem', backgroundColor: 'var(--page-header-bg)', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Haftaiçi Her Gün</span>
              <span style={{ fontSize: '1.2rem', opacity: 0.9 }}>{siteContent.workingHoursWeekday || '09.00 - 20.00'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, display: 'block' }}>Haftasonu</span>
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>(Cmt. - Paz.)</span>
              </div>
              <span style={{ fontSize: '1.2rem', opacity: 0.9 }}>{siteContent.workingHoursWeekend || '12.00 - 18.00'}</span>
            </div>
            <div style={{ backgroundColor: 'var(--badge-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--badge-text)', fontWeight: 700, fontSize: '1.05rem' }}>
              7/24 Acil Müdahale Hizmeti Sağlanmaktadır.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Randevu Almak İster Misiniz?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Dostlarınızın sağlığı bizim önceliğimizdir. Hemen bizi arayarak veya kliniğimizi ziyaret ederek randevunuzu oluşturabilirsiniz.
          </p>
          <a href="tel:+905533841460" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            <Phone size={20} style={{ marginRight: '0.75rem' }} />
            0553 384 14 60
          </a>
        </div>
      </section>

    </div>
  );
};

export default Ekibimiz;
