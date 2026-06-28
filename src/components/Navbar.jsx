import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { to: '/hizmetler', label: 'Hizmetlerimiz' },
  { to: '/ekibimiz', label: 'Ekibimiz' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/blog', label: 'Blog' },
  { to: '/iletisim', label: 'İletişim' },
  { to: '/hasta-sorgu', label: 'Hasta Portalı' },
];

const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('vagalvet_theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vagalvet_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (isAdmin) return null;

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        backgroundColor: isScrolled ? 'var(--bg-surface)' : 'var(--bg-main)',
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
            <img src="/logo.png" alt="VagalVet Logo" style={{ height: '40px', objectFit: 'contain' }} />
          </Link>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ display: 'none', gap: '2rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                style={{ 
                  color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--text-main)', 
                  fontWeight: location.pathname === link.to ? 700 : 500,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'color var(--transition-fast)',
                  position: 'relative',
                  paddingBottom: '4px'
                }}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: '1px'
                  }}></span>
                )}
              </Link>
            ))}
            <Link to="/randevu" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem', textDecoration: 'none' }}>
              Online Randevu Al
            </Link>
            <button 
              onClick={toggleTheme} 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div 
            className="mobile-toggle" 
            style={{ display: 'block', cursor: 'pointer', padding: '0.5rem' }} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} color="var(--color-secondary)" /> : <Menu size={28} color="var(--color-secondary)" />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--bg-surface)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          gap: '0.5rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--text-main)',
                textDecoration: 'none',
                fontSize: '1.5rem',
                fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                padding: '1rem 0',
                borderBottom: '1px solid var(--border-color)',
                transition: 'color var(--transition-fast)'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/iletisim" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn btn-primary" 
            style={{ marginTop: '1.5rem', textAlign: 'center', textDecoration: 'none', fontSize: '1.1rem', padding: '1rem' }}
          >
            Randevu Al
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
