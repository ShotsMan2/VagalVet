import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, AlertCircle } from 'lucide-react';

const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const contactCards = [
  {
    icon: MapPin,
    title: 'Adresimiz',
    content: 'Akademi Mah. Oyalı Sk. No: 7 A Selçuklu / Konya',
    sub: 'Konya Ardıçlı Toki',
    href: 'https://www.google.com/maps/search/Akademi+Mahallesi+Oyal%C4%B1+Sokak+Sel%C3%A7uklu+Konya',
    linkLabel: 'Yol Tarifi Al →',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '0 (553) 384 14 60',
    sub: 'Haftaiçi 09:00 – 20:00 arası arayabilirsiniz',
    href: 'tel:+905533841460',
    linkLabel: 'Hemen Ara →',
  },
  {
    icon: Mail,
    title: 'E-Posta',
    content: 'vagalvetveterinerklinigi@gmail.com',
    sub: 'En geç 24 saat içinde dönüş sağlanır',
    href: 'mailto:vagalvetveterinerklinigi@gmail.com',
    linkLabel: 'E-Posta Gönder →',
  },
  {
    icon: InstagramIcon,
    title: 'Instagram',
    content: '@vagalvet.veterinerklinigi',
    sub: 'Bizi takip edin, güncel kalın',
    href: 'https://www.instagram.com/vagalvet.veterinerklinigi/',
    linkLabel: 'Profili Ziyaret Et →',
  },
];

const workingHours = [
  { label: 'Pazartesi', hours: '09:00 – 20:00' },
  { label: 'Salı', hours: '09:00 – 20:00' },
  { label: 'Çarşamba', hours: '09:00 – 20:00' },
  { label: 'Perşembe', hours: '09:00 – 20:00' },
  { label: 'Cuma', hours: '09:00 – 20:00' },
  { label: 'Cumartesi', hours: '12:00 – 18:00' },
  { label: 'Pazar', hours: '12:00 – 18:00' },
];

export default function Iletisim() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Display-only form – no backend wired
  };

  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      {/* ─── HERO ─── */}
      <section
        style={{
          paddingTop: '120px',
          paddingBottom: '72px',
          background: 'linear-gradient(170deg, var(--color-secondary) 0%, #3a605f 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: 'rgba(238,189,95,0.08)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(238,189,95,0.15)',
              color: 'var(--color-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              marginBottom: 18,
              fontFamily: 'var(--font-sans)',
            }}
          >
            İletişim
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            Bizimle İletişime Geçin
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.75)',
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Sorularınız ve randevu talepleriniz için bizimle iletişime geçin.
            Dostlarınızın sağlığı için her zaman buradayız.
          </p>
        </div>
      </section>

      {/* ─── CONTACT CARDS ─── */}
      <section style={{ padding: '80px 0 0' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="surface-card"
                style={{
                  padding: '36px 28px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'var(--transition-normal)',
                  border: '1px solid var(--border-color)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(238,189,95,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color="var(--color-primary)" strokeWidth={1.8} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'var(--text-main)',
                    fontWeight: 500,
                    margin: 0,
                    lineHeight: 1.5,
                    wordBreak: 'break-word',
                  }}
                >
                  {card.content}
                </p>

                {card.sub && (
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {card.sub}
                  </p>
                )}

                <a
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    marginTop: 'auto',
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#d4a84e')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                >
                  {card.linkLabel}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── WORKING HOURS + FORM ─── */}
      <section style={{ padding: '80px 0' }}>
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* — Working Hours — */}
          <div
            className="surface-card"
            style={{
              padding: '40px 36px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(238,189,95,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={22} color="var(--color-primary)" strokeWidth={1.8} />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  margin: 0,
                }}
              >
                Çalışma Saatleri
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {workingHours.map((item, i) => {
                const isWeekend = item.label === 'Cumartesi' || item.label === 'Pazar';
                return (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '13px 0',
                      borderBottom:
                        i < workingHours.length - 1 ? '1px solid var(--border-color)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.93rem',
                        color: isWeekend ? 'var(--text-muted)' : 'var(--text-main)',
                        fontWeight: isWeekend ? 400 : 500,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.93rem',
                        fontWeight: 600,
                        color: isWeekend ? 'var(--text-muted)' : 'var(--color-secondary)',
                      }}
                    >
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Emergency banner */}
            <div
              style={{
                marginTop: 28,
                background: 'linear-gradient(135deg, rgba(238,189,95,0.12) 0%, rgba(238,189,95,0.06) 100%)',
                border: '1px solid rgba(238,189,95,0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <AlertCircle
                size={20}
                color="var(--color-primary)"
                strokeWidth={2}
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    margin: '0 0 4px',
                  }}
                >
                  7/24 Acil Müdahale Hizmeti
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Acil durumlar için mesai saatleri dışında da{' '}
                  <a
                    href="tel:+905533841460"
                    style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    0 (553) 384 14 60
                  </a>{' '}
                  numarasını arayabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* — Contact Form — */}
          <div
            className="surface-card"
            style={{
              padding: '40px 36px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                margin: '0 0 6px',
              }}
            >
              Bize Mesaj Gönderin
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                margin: '0 0 28px',
                lineHeight: 1.6,
              }}
            >
              Formu doldurun, en kısa sürede size dönüş yapalım.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Ad Soyad */}
              <div>
                <label
                  htmlFor="name"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Ad Soyad
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Adınız ve soyadınız"
                  value={form.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    color: 'var(--text-main)',
                    background: 'var(--bg-soft)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    transition: 'var(--transition-fast)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              {/* Telefon */}
              <div>
                <label
                  htmlFor="phone"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Telefon
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0 (5XX) XXX XX XX"
                  value={form.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    color: 'var(--text-main)',
                    background: 'var(--bg-soft)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    transition: 'var(--transition-fast)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              {/* Mesaj */}
              <div>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Mesajınızı buraya yazın..."
                  value={form.message}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    color: 'var(--text-main)',
                    background: 'var(--bg-soft)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'var(--transition-fast)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '14px 32px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  marginTop: 4,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <Send size={18} strokeWidth={2} />
                Mesajı Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── GOOGLE MAPS ─── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                fontWeight: 700,
                color: 'var(--text-main)',
                margin: '0 0 10px',
              }}
            >
              Konumumuz
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Akademi Mah. Oyalı Sk. No: 7 A Selçuklu / Konya
            </p>
          </div>

          <div
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)',
            }}
          >
            <iframe
              title="VagalVet Konum"
              src="https://maps.google.com/maps?q=VagalVet+Veteriner+Klini%C4%9Fi+Konya&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
