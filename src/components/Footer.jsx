import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (isAdmin) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Save to localStorage just for the mock CRM
    const subs = JSON.parse(localStorage.getItem('vagalvet_newsletter') || '[]');
    localStorage.setItem('vagalvet_newsletter', JSON.stringify([email, ...subs]));
    
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer style={{ 
      padding: '5rem 0 0', 
      backgroundColor: 'var(--color-secondary)',
      color: 'rgba(255, 255, 255, 0.8)',
    }}>
      <div className="container">
        
        {/* Newsletter Section */}
        <div style={{ 
          background: 'var(--bg-main)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '3rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '2rem',
          transform: 'translateY(-100px)',
          marginBottom: '-60px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              E-Bültenimize Abone Olun
            </h3>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>
              Klinik yenilikleri ve hayvan sağlığı ile ilgili faydalı bilgilerden ilk siz haberdar olun.
            </p>
          </div>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flex: '1 1 300px', maxWidth: '500px' }}>
            <input 
              type="email" 
              placeholder="E-Posta Adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1, padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                outline: 'none', background: 'var(--bg-surface)'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 1.5rem' }}>
              {subscribed ? <CheckCircle2 size={24} /> : 'Abone Ol'}
            </button>
          </form>
        </div>

        {/* Top Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '2rem', 
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'white'
              }}>
                <span style={{ color: 'var(--color-primary)' }}>Vagal</span>Vet
              </span>
            </Link>
            <p style={{ maxWidth: '280px', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Can dostlarınız için güvenilir, şefkatli ve modern veteriner sağlık hizmetleri sunan tam donanımlı hayvan hastanesi.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://www.instagram.com/vagalvet.veterinerklinigi/" target="_blank" rel="noreferrer" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Kurumsal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/hizmetler" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} /> Hizmetlerimiz</Link></li>
              <li><Link to="/ekibimiz" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} /> Uzman Kadromuz</Link></li>
              <li><Link to="/blog" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} /> Evcil Hayvan Rehberi</Link></li>
              <li><Link to="/iletisim" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} /> İletişim & Konum</Link></li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Hızlı İşlemler</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/randevu" style={{ color: 'var(--color-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}><ArrowRight size={14} /> Online Randevu Al</Link></li>
              <li><Link to="/hasta-sorgu" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} /> Aşı & Randevu Sorgula</Link></li>
              <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} /> 7/24 Acil Müdahale</Link></li>
              <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRight size={14} /> Pet Kuaför</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Bize Ulaşın</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 4 }} />
                <span>Akademi Mah. Oyalı Sk.<br/>No: 7 A Selçuklu / Konya</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <a href="tel:+905533841460" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>0553 384 14 60</a>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Mail size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <a href="mailto:vagalvetveterinerklinigi@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>vagalvetveterinerklinigi@gmail.com</a>
              </div>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div style={{ 
          padding: '1.5rem 0', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <span>&copy; {new Date().getFullYear()} VagalVet Veteriner Kliniği. Tüm Hakları Saklıdır.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>KVKK Metni</Link>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Gizlilik Politikası</Link>
            <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>Kurumsal Yönetim</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
