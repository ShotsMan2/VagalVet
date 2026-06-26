import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer style={{
      marginTop: 'auto',
      padding: '3rem 2rem',
      borderTop: '1px solid var(--border-glass)',
      background: 'rgba(4, 7, 6, 0.8)',
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>VagalVet</h3>
        <p style={{ color: 'var(--text-muted)' }}>Yeni Nesil Hayvan Sağlığı Merkezi</p>
        <p style={{ color: 'var(--text-muted)', marginTop: '2rem', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} VagalVet Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
