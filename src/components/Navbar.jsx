import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdmin) return null; // Admin has its own layout

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: isScrolled ? 'var(--bg-surface)' : 'transparent',
      boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
      transition: 'all var(--transition-normal)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '1.75rem', 
            fontWeight: 800,
            letterSpacing: '-0.02em'
          }}>
            <span style={{ color: 'var(--color-primary)' }}>Vagal</span>
            <span style={{ color: 'var(--color-secondary)' }}>Vet</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'none', gap: '2.5rem', alignItems: 'center', '@media(min-width: 768px)': { display: 'flex' } }} className="desktop-nav">
          <a href="/#hizmetler" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Hizmetlerimiz</a>
          <a href="/#hekimler" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Ekibimiz</a>
          <a href="/#galeri" style={{ color: 'var(--text-main)', fontWeight: 500 }}>Galeri</a>
          <a href="/#iletisim" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>İletişim</a>
        </div>

        {/* Mobile Toggle (Simple implementation for now) */}
        <div className="mobile-toggle" style={{ display: 'block', cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} color="var(--color-secondary)" /> : <Menu size={28} color="var(--color-secondary)" />}
        </div>
      </div>

      {/* Internal CSS for simple mobile responsive hiding */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
