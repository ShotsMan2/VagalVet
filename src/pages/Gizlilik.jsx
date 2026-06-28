import React from 'react';

const Gizlilik = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <main style={{ flex: 1, padding: '100px 5%', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-main)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>Gizlilik Politikası</h1>
        
        <p style={{ marginBottom: '1.5rem' }}>
          VagalVet Veteriner Kliniği olarak web sitemizi ziyaret eden kullanıcıların gizliliğini korumak bizim için en öncelikli konulardan biridir.
          Bu Gizlilik Politikası, web sitemiz üzerinden toplanan bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.
        </p>

        <h2 style={{ color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Toplanan Bilgiler</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Web sitemizi ziyaret ettiğinizde iletişim formları veya randevu talepleri aracılığıyla kendi isteğinizle paylaştığınız ad, soyad, e-posta adresi
          ve telefon numarası gibi kişisel bilgiler tarafımızca toplanabilir.
        </p>

        <h2 style={{ color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Çerezler (Cookies)</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Kullanıcı deneyimini geliştirmek, site trafiğini analiz etmek ve hizmetlerimizi iyileştirmek amacıyla çerezler (cookies) kullanmaktayız.
          Çerezleri tarayıcı ayarlarınızdan dilediğiniz zaman kapatabilirsiniz.
        </p>

        <h2 style={{ color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Bilgi Güvenliği</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Tarafımızla paylaştığınız tüm bilgiler, güvenli sunucularda standart güvenlik protokolleri (SSL) kullanılarak şifrelenmekte ve korunmaktadır.
          Ancak internet üzerinden veri iletiminin %100 güvenli olamayacağı unutulmamalıdır.
        </p>
      </main>
    </div>
  );
};

export default Gizlilik;
