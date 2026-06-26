import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, ShieldAlert, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null; // Admin has its own sidebar

  return (
    <nav className="glass-panel" style={{ 
      margin: '2rem auto', 
      maxWidth: '1200px', 
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: 'var(--color-primary)', 
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 20px var(--color-primary-glow)'
        }}>
          <Activity color="var(--bg-dark)" size={24} />
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
          Vagal<span style={{ color: 'var(--color-secondary)' }}>Vet</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" style={{ fontWeight: 600 }}>Ana Sayfa</Link>
        <Link to="#hizmetler" style={{ fontWeight: 600 }}>Hizmetler</Link>
        <Link to="#iletisim" style={{ fontWeight: 600 }}>İletişim</Link>
        <Link to="/admin" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <ShieldAlert size={18} />
          Admin Girişi
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
