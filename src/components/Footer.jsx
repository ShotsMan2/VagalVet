import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer style={{ 
      padding: '5rem 0 3rem', 
      backgroundColor: 'var(--color-secondary)',
      color: 'rgba(255, 255, 255, 0.8)',
    }}>
      <div className="container">
        {/* Top Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
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
            <p style={{ maxWidth: '280px', fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.7 }}>
              Can dostlarınız için güvenilir, şefkatli ve modern veteriner sağlık hizmetleri.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Hızlı Erişim</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.95rem' }}>Ana Sayfa</Link>
              <Link to="/hizmetler" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.95rem' }}>Hizmetlerimiz</Link>
              <Link to="/ekibimiz" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.95rem' }}>Ekibimiz</Link>
              <Link to="/galeri" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.95rem' }}>Galeri</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem' }}>İletişim</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <span>Akademi Mah. Oyalı Sk.<br/>No: 7 A Selçuklu / Konya</span>
              <a href="tel:+905533841460" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>0553 384 14 60</a>
              <a href="mailto:vagalvetveterinerklinigi@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>vagalvetveterinerklinigi@gmail.com</a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Çalışma Saatleri</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <span>Haftaiçi: 09.00 - 20.00</span>
              <span>Haftasonu: 12.00 - 18.00</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>7/24 Acil Müdahale</span>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div style={{ 
          paddingTop: '2rem', 
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
            <a href="https://www.instagram.com/vagalvet.veterinerklinigi/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
            <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>Yönetim</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
