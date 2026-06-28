import React, { useState } from 'react';
import { ExternalLink, Camera } from 'lucide-react';

const galleryImages = [
  { src: '/images/1.png', alt: 'Sevimli Yavru Kedi' },
  { src: '/images/2.png', alt: 'Beyaz Van Kedisi' },
  { src: '/images/3.png', alt: 'Sevimli Tavşan' },
  { src: '/images/4.jpg', alt: 'Kıvırcık Köpek' },
];

function GalleryCard({ src, alt }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        aspectRatio: '1/1',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transition: 'box-shadow 0.4s ease',
        position: 'relative',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.25)' : 'scale(1.15)',
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
      {/* Overlay with caption on hover */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
          padding: '40px 20px 18px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <span
          style={{
            color: '#fff',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          {alt}
        </span>
      </div>
    </div>
  );
}

export default function Galeri() {
  const [igHovered, setIgHovered] = useState(false);

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      {/* ── Hero Banner ── */}
      <section
        style={{
          paddingTop: '120px',
          paddingBottom: '64px',
          background: 'linear-gradient(135deg, var(--color-secondary) 0%, #3a5f5f 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '280px',
            height: '280px',
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
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(238,189,95,0.06)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(238,189,95,0.15)',
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              marginBottom: '20px',
            }}
          >
            <Camera size={16} style={{ color: 'var(--color-primary)' }} />
            <span
              style={{
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Fotoğraf Galerisi
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            Galeri
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.75)',
              margin: '0 auto',
              maxWidth: '520px',
              lineHeight: 1.7,
            }}
          >
            Kliniğimizden ve sevimli hastalarımızdan kareler
          </p>
        </div>
      </section>

      {/* ── Photo Grid ── */}
      <section
        className="container"
        style={{ padding: '72px 24px 56px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {galleryImages.map((img) => (
            <GalleryCard key={img.src} src={img.src} alt={img.alt} />
          ))}
        </div>
      </section>

      {/* ── Instagram CTA ── */}
      <section
        style={{
          padding: '64px 24px 96px',
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: '48px 40px',
            textAlign: 'center',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.08rem',
              color: 'var(--text-main)',
              lineHeight: 1.75,
              margin: '0 0 28px',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Daha fazla fotoğraf ve güncel paylaşımlarımız için bizi Instagram'da takip edin!
          </p>

          <a
            href="https://www.instagram.com/vagalvet.veterinerklinigi/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIgHovered(true)}
            onMouseLeave={() => setIgHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: 'var(--radius-full)',
              background: igHovered
                ? 'linear-gradient(135deg, #e6683c 0%, #dc2743 50%, #cc2366 100%)'
                : 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: '#fff',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
              boxShadow: igHovered
                ? '0 8px 24px rgba(220,39,67,0.3)'
                : '0 4px 14px rgba(220,39,67,0.15)',
              transform: igHovered ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            @vagalvet.veterinerklinigi
            <ExternalLink size={14} style={{ opacity: 0.7 }} />
          </a>
        </div>
      </section>
    </div>
  );
}
