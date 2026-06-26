import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null; // Admin has its own sidebar

  return (
    <nav className="glass-panel" style={{ 
      margin: '2rem auto', 
      width: '95%',
      maxWidth: '1600px', 
      padding: '1rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 100
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, letterSpacing: '1px' }}>
          <span style={{ color: 'var(--color-primary)' }}>Vagal</span><span style={{ color: 'var(--color-secondary)' }}>Vet</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', paddingRight: '1rem' }}>
        <Link to="/" style={{ fontWeight: 600 }}>Ana Sayfa</Link>
        <Link to="#hizmetler" style={{ fontWeight: 600 }}>Hizmetler</Link>
        <Link to="#iletisim" style={{ fontWeight: 600 }}>İletişim</Link>
      </div>
    </nav>
  );
};

export default Navbar;
