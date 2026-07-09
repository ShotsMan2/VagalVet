import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '400px', padding: '2rem', textAlign: 'center'
        }}>
          <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Bir Hata Oluştu</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px' }}>
            Sayfa yüklenirken beklenmedik bir hata meydana geldi. Lütfen sayfayı yenileyin.
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            style={{
              background: 'var(--color-primary)', color: '#000', border: 'none',
              padding: '0.75rem 2rem', borderRadius: 'var(--radius-md)',
              fontWeight: 600, cursor: 'pointer', fontSize: '1rem'
            }}
          >
            Sayfayı Yenile
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
