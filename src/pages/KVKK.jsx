import React from 'react';

const KVKK = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <main style={{ flex: 1, padding: '100px 5%', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-main)', lineHeight: 1.8 }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>KVKK Aydınlatma Metni</h1>
        
        <p style={{ marginBottom: '1.5rem' }}>
          Değerli hayvan dostları ve hasta sahipleri, VagalVet Veteriner Kliniği olarak kişisel verilerinizin güvenliğine büyük önem vermekteyiz.
          Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında,
          hukuka ve dürüstlük kurallarına uygun olarak işlemekte ve muhafaza etmekteyiz.
        </p>

        <h2 style={{ color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Kişisel Verilerin İşlenme Amacı</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Tarafınıza ait iletişim bilgileri (ad, soyad, telefon, e-posta), veteriner hekimlik hizmetlerinin sunulması, randevu planlamalarının yapılması,
          aşılama takvimi bildirimleri ve klinik içi operasyonların yönetilmesi amacıyla işlenmektedir.
        </p>

        <h2 style={{ color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Verilerin Aktarımı</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          İşlenen kişisel verileriniz, yasal zorunluluklar haricinde hiçbir üçüncü taraf kişi, kurum veya kuruluşla paylaşılmamaktadır.
          Sadece resmi makamların talepleri doğrultusunda yetkili kurumlara aktarılabilir.
        </p>

        <h2 style={{ color: 'var(--color-secondary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Haklarınız</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Kanun'un 11. maddesi uyarınca kliniğimize başvurarak kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme,
          eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahipsiniz.
        </p>
      </main>
    </div>
  );
};

export default KVKK;
