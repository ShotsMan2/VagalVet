import React, { useState, useEffect } from 'react';
import { Reply, Trash2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(null);

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem('vagalvet_messages') || '[]'));
  }, []);

  const handleReplySubmit = (msgId) => {
    if (!replyText.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(msgId);
      setTimeout(() => {
        setSentSuccess(null);
        setReplyingTo(null);
        setReplyText('');
      }, 3000);
    }, 1500);
  };

  const handleDeleteMessage = (id) => {
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    localStorage.setItem('vagalvet_messages', JSON.stringify(updated));
    toast.success('Mesaj başarıyla silindi.');
  };

  return (
    <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '2rem', minHeight: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>Gelen Mesajlar</h3>
      </div>
      
      {messages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Yeni bir mesaj bulunmuyor.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-glass)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                <div>
                  <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem', display: 'block' }}>{msg.name}</strong>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{msg.email}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{msg.date}</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setReplyingTo(msg.id)} style={{ background: 'rgba(251, 191, 36, 0.1)', color: 'var(--color-primary)', border: '1px solid rgba(251, 191, 36, 0.2)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background='rgba(251, 191, 36, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.background='rgba(251, 191, 36, 0.1)'}>
                      <Reply size={14} /> Yanıtla
                    </button>
                    <button onClick={() => handleDeleteMessage(msg.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background='rgba(239, 68, 68, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.background='rgba(239, 68, 68, 0.1)'}>
                      <Trash2 size={14} /> Sil
                    </button>
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, lineHeight: 1.6 }}>{msg.message}</p>

              {replyingTo === msg.id && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-primary)' }}>
                  <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Mesajınızı buraya yazın..." rows={3} style={{ width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', outline: 'none' }} />
                  <button onClick={() => handleReplySubmit(msg.id)} disabled={isSending || !replyText.trim()} style={{ background: 'var(--color-primary)', color: '#000', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: 'pointer' }}>
                    {isSending ? 'Gönderiliyor...' : 'Gönder'}
                  </button>
                </div>
              )}
              
              {sentSuccess === msg.id && (
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} /> Yanıt başarıyla iletildi.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageManager;
