import React, { useEffect, useState } from 'react';
import { 
  Activity, ShieldPlus, Dna, Syringe, ChevronRight, Phone, 
  Clock, Mail, MapPin, Stethoscope, Scissors, ShoppingBag, Truck, HeartPulse
} from 'lucide-react';

const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    { id: 1, title: 'Muayene, Teşhis & Tedavi', icon: <Stethoscope size={32} color="var(--color-primary)" /> },
    { id: 2, title: 'Dahiliye & Cerrahi', icon: <Syringe size={32} color="var(--color-primary)" /> },
    { id: 3, title: 'Aşılama & Paraziter', icon: <ShieldPlus size={32} color="var(--color-primary)" /> },
    { id: 4, title: 'Laboratuvar Tetkik', icon: <Dna size={32} color="var(--color-primary)" /> },
    { id: 5, title: '7/24 Acil Müdahale', icon: <HeartPulse size={32} color="var(--color-primary)" /> },
    { id: 6, title: 'Evde & Gezici Sağlık', icon: <Truck size={32} color="var(--color-primary)" /> },
    { id: 7, title: 'Pet Kuaför', icon: <Scissors size={32} color="var(--color-primary)" /> },
    { id: 8, title: 'Pet Shop & Besleme', icon: <ShoppingBag size={32} color="var(--color-primary)" /> },
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
            <h1 className="glitch-text" data-text="MODERN VETERİNER KLİNİĞİ" style={{ 
              fontSize: '4rem', 
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              color: 'var(--text-main)'
            }}>
              GÜVENİLİR<br />
              <span style={{ color: 'var(--color-primary)' }}>VETERİNER</span> HİZMETİ
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-muted)', 
              marginBottom: '2rem',
              maxWidth: '600px'
            }}>
              VagalVet Veteriner Kliniği olarak sevimli dostlarımızın sağlığı için en güncel tıbbi yöntemlerle yanınızdayız. Profesyonel kadromuz ve donanımlı altyapımızla sevgi dolu bir sağlık hizmeti sunuyoruz.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="tel:+905533841460" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                <Phone size={20} style={{ marginRight: '0.5rem' }}/>
                0553 384 14 60
              </a>
              <a href="#hizmetler" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Hizmetlerimiz
              </a>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--color-primary)' }}>
              <HeartPulse size={24} />
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>7/24 Acil Veteriner Müdahale Hizmeti Sağlanmaktadır.</span>
            </div>
          </div>
          
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '400px',
              height: '400px',
              position: 'relative',
              perspective: '1000px'
            }}>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {services.map(s => (
              <div key={s.id} className="glass-panel" style={{ 
                padding: '2rem', 
                textAlign: 'center',
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
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.25rem' }}>{s.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Hours Section */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>Veteriner Hekimlerimiz</h2>
              <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Stethoscope size={40} color="var(--color-secondary)" />
                <div>
                  <h3 style={{ fontSize: '1.5rem' }}>Mürüvvet Eraslan</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Veteriner Hekim</p>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Stethoscope size={40} color="var(--color-secondary)" />
                <div>
                  <h3 style={{ fontSize: '1.5rem' }}>Mehmet Ali Eraslan</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Veteriner Hekim</p>
                </div>
              </div>
            </div>

            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>Çalışma Saatlerimiz</h2>
              <div className="glass-panel" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Haftaiçi Her Gün</span>
                  <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>09.00 - 20.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Haftasonu (Cmt - Paz)</span>
                  <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>12.00 - 18.00</span>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(238, 189, 95, 0.1)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-primary)' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>7/24 Acil Müdahale Hizmetimiz Mevcuttur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Section */}
      <section id="galeri" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--color-secondary)' }}>02.</span> KLİNİĞİMİZDEN KARELER
            </h2>
            <div style={{ width: '100px', height: '4px', background: 'var(--color-primary)', margin: '0 auto' }}></div>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Minik dostlarımızın sağlıklı ve mutlu anları</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* These images will be replaced by the user with the actual instagram photos */}
            <div className="glass-panel" style={{ overflow: 'hidden', aspectRatio: '1/1', position: 'relative' }}>
              <img src="/images/patient1.png" alt="Sevimli Hastamız 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/500x500/040706/eebd5f?text=Foto%C4%9Fraf+Bekleniyor'; }} />
            </div>
            <div className="glass-panel" style={{ overflow: 'hidden', aspectRatio: '1/1', position: 'relative' }}>
              <img src="/images/patient2.png" alt="Sevimli Hastamız 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/500x500/040706/eebd5f?text=Foto%C4%9Fraf+Bekleniyor'; }} />
            </div>
            <div className="glass-panel" style={{ overflow: 'hidden', aspectRatio: '1/1', position: 'relative' }}>
              <img src="/images/patient3.png" alt="Sevimli Hastamız 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/500x500/040706/eebd5f?text=Foto%C4%9Fraf+Bekleniyor'; }} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" style={{ padding: '6rem 0', background: 'rgba(15, 23, 20, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--color-secondary)' }}>03.</span> İLETİŞİM & LOKASYON
            </h2>
            <div style={{ width: '100px', height: '4px', background: 'var(--color-primary)', margin: '0 auto' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <MapPin size={32} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Adres</h3>
              <p style={{ color: 'var(--text-muted)' }}>Akademi Mah. Oyalı Sk.<br/>No: 7 A Selçuklu / Konya<br/>Konya Ardıçlı Toki</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <Phone size={32} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>İletişim</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>0553 384 14 60</p>
              <a href="mailto:vagalvetveterinerklinigi@gmail.com" style={{ color: 'var(--text-muted)', wordBreak: 'break-all' }}>vagalvetveterinerklinigi@gmail.com</a>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <Activity size={32} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Sosyal Medya</h3>
              <a href="https://www.instagram.com/vagalvet.veterinerklinigi/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600 }}>
                @vagalvet.veterinerklinigi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Styles */}
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
