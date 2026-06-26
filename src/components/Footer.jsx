import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer style={{ 
      padding: '4rem 0', 
      backgroundColor: 'var(--color-secondary)',
      color: 'rgba(255, 255, 255, 0.8)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '2rem', 
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'white'
            }}>
              <span style={{ color: 'var(--color-primary)' }}>Vagal</span>Vet
            </span>
            <p style={{ maxWidth: '300px', fontSize: '0.95rem' }}>
              Can dostlarınız için güvenilir, şefkatli ve modern veteriner sağlık hizmetleri.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.95rem' }}>
            <a href="/#hizmetler" style={{ color: 'inherit' }}>Hizmetlerimiz</a>
            <a href="/#hekimler" style={{ color: 'inherit' }}>Ekibimiz</a>
            <a href="/#galeri" style={{ color: 'inherit' }}>Galeri</a>
            <a href="/#iletisim" style={{ color: 'inherit' }}>İletişim</a>
          </div>

        </div>
        
        <div style={{ 
          marginTop: '4rem', 
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
          <a href="/admin" style={{ color: 'inherit', opacity: 0.5 }}>Yönetim Paneli</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
