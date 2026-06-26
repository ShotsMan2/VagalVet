import React, { useEffect, useState } from 'react';
import { Activity, ShieldPlus, Dna, Syringe, ChevronRight } from 'lucide-react';

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    { id: 1, title: 'Genetik Analiz', icon: <Dna size={32} color="var(--color-primary)" />, desc: 'Evcil hayvanınızın genetik haritasını çıkararak gelecekteki sağlık risklerini önceden tespit ediyoruz.' },
    { id: 2, title: 'Nano-Cerrahi', icon: <Syringe size={32} color="var(--color-primary)" />, desc: 'Hücresel düzeyde müdahale imkanı sunan nanobot destekli ağrısız operasyonlar.' },
    { id: 3, title: 'Biyo-Tarama', icon: <Activity size={32} color="var(--color-primary)" />, desc: 'Saniyeler içinde tüm vücut fonksiyonlarını analiz eden yapay zeka destekli tarama cihazları.' },
    { id: 4, title: 'Siber-Aşılar', icon: <ShieldPlus size={32} color="var(--color-primary)" />, desc: 'Bağışıklık sistemini dijital olarak programlayan yeni nesil koruyucu hekimlik.' },
  ];

  return (
    <div className={`page-transition ${mounted ? 'mounted' : ''}`}>
      {/* Hero Section */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '4rem'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px' }}>
            <h1 className="glitch-text" data-text="GELECEĞİN VETERİNER KLİNİĞİ" style={{ 
              fontSize: '4rem', 
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: 'var(--text-main)'
            }}>
              GELECEĞİN<br />
              <span style={{ color: 'var(--color-primary)' }}>VETERİNER</span> KLİNİĞİ
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-muted)', 
              marginBottom: '2rem',
              maxWidth: '600px'
            }}>
              VagalVet olarak geleceğin en gelişmiş tıbbi teknolojilerini sevimli dostlarımız için sunuyoruz. 
              Yapay zeka teşhislerinden nano-cerrahiye kadar her şey burada.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Hemen Randevu Al
                <ChevronRight style={{ marginLeft: '0.5rem' }} />
              </button>
              <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Teknolojilerimiz
              </button>
            </div>
          </div>
          
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '400px',
              height: '400px',
              position: 'relative',
              perspective: '1000px'
            }}>
              {/* Geometric 3D illusion element */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                animation: 'morph 8s ease-in-out infinite, rotate 20s linear infinite',
                boxShadow: '0 0 50px var(--color-primary-glow)',
                opacity: 0.8
              }}></div>
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                width: '90%',
                height: '90%',
                background: 'var(--bg-dark)',
                borderRadius: 'inherit',
                animation: 'morph 8s ease-in-out infinite, rotate 20s linear infinite reverse',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                border: '2px solid var(--color-primary)'
              }}>
                <span style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '3.5rem', 
                  fontWeight: 800,
                  filter: 'drop-shadow(0 0 10px var(--color-primary))'
                }}>
                  <span style={{ color: 'var(--color-primary)' }}>Vagal</span><span style={{ color: 'var(--color-secondary)' }}>Vet</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" style={{ padding: '8rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--color-secondary)' }}>01.</span> HİZMETLERİMİZ
            </h2>
            <div style={{ width: '100px', height: '4px', background: 'var(--color-primary)', margin: '0 auto' }}></div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {services.map(s => (
              <div key={s.id} className="glass-panel" style={{ 
                padding: '2rem', 
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.5), 0 0 20px var(--color-primary-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.3)';
              }}
              >
                <div style={{ marginBottom: '1.5rem' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Styles for specific Home animations */}
      <style>{`
        @keyframes morph {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;
