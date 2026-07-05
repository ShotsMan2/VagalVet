import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';

const NewsletterManager = () => {
  const [newsletter, setNewsletter] = useState([]);

  useEffect(() => {
    setNewsletter(JSON.parse(localStorage.getItem('vagalvet_newsletter') || '[]'));
  }, []);

  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>E-Bülten Aboneleri</h3>
        <span style={{ backgroundColor: 'var(--color-primary)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: 'bold' }}>
          {newsletter.length} Abone
        </span>
      </div>
      
      {newsletter.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Henüz bülten abonesi bulunmuyor.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {newsletter.map((email, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-dark)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
              <Mail size={20} color="var(--color-primary)" />
              <span style={{ fontSize: '1.05rem' }}>{email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsletterManager;
