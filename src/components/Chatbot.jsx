import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Merhaba! VagalVet Veteriner Kliniğine hoş geldiniz. Size nasıl yardımcı olabilirim?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  
  const [contactSettings, setContactSettings] = useState({ phone: '0553 384 14 60' });

  useEffect(() => {
    const saved = localStorage.getItem('vagalvet_contact_settings');
    if (saved) {
      setContactSettings(JSON.parse(saved));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `Mesajınızı aldık. Şu an hekimlerimiz yoğun olduğu için otomatik yanıt veriyorum. Acil durumlar için lütfen ${contactSettings.phone} numaralı telefonu arayınız. En kısa sürede size dönüş yapacağız.`,
        sender: 'bot'
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: 'var(--color-primary)',
          color: '#000',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(251, 191, 36, 0.4)',
          zIndex: 9999,
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(251, 191, 36, 0.4)';
        }}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '350px',
          height: '450px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--border-glass)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '1.25rem',
            backgroundColor: 'var(--color-primary)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}>
            <Bot size={24} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>VagalVet Asistan</h3>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Çevrimiçi</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: 'var(--bg-main)'
          }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                backgroundColor: msg.sender === 'user' ? 'rgba(251, 191, 36, 0.2)' : 'var(--bg-soft)',
                color: msg.sender === 'user' ? 'var(--color-primary)' : 'var(--text-main)',
                padding: '0.75rem 1rem',
                borderRadius: msg.sender === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                border: msg.sender === 'user' ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid var(--border-glass)',
                fontSize: '0.95rem',
                lineHeight: 1.5
              }}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            gap: '0.5rem',
            backgroundColor: 'var(--bg-surface)'
          }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Mesajınızı yazın..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '2rem',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-main)',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              style={{
                backgroundColor: inputText.trim() ? 'var(--color-primary)' : 'var(--bg-soft)',
                color: inputText.trim() ? '#000' : 'var(--text-muted)',
                border: 'none',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s'
              }}
            >
              <Send size={20} style={{ marginLeft: '-2px' }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
