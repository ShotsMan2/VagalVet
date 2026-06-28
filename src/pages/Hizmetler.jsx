import React, { useEffect, useState } from 'react';
import { 
  Stethoscope, Syringe, ShieldPlus, Dna, HeartPulse, Truck, Scissors, ShoppingBag,
  Phone, Activity, Pill
} from 'lucide-react';

const Hizmetler = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const services = [
    {
      icon: <Stethoscope size={32} color="var(--color-secondary)" />,
      title: 'Muayene & Teşhis',
      desc: 'Kapsamlı fiziksel muayene, klinik değerlendirme ve ileri teşhis yöntemleriyle dostlarınızın sağlık durumunu en doğru şekilde belirliyoruz. Detaylı muayene sürecimizle hastalıkları erken aşamada tespit ediyor, tedavi planını en doğru biçimde oluşturuyoruz.'
    },
    {
      icon: <Activity size={32} color="var(--color-secondary)" />,
      title: 'Dahiliye',
      desc: 'İç hastalıkları tedavisinde uzman kadromuzla kronik ve akut rahatsızlıkları etkin bir şekilde yönetiyoruz. Sindirim sistemi, solunum yolu, böbrek ve karaciğer rahatsızlıkları gibi pek çok alanda güvenilir tedavi sunuyoruz.'
    },
    {
      icon: <Syringe size={32} color="var(--color-secondary)" />,
      title: 'Cerrahi Operasyonlar',
      desc: 'Modern cerrahi ekipmanlarımız ve deneyimli cerrahlarımız ile güvenli ameliyatlar gerçekleştiriyoruz. Kısırlaştırma, tümör operasyonları, ortopedik müdahaleler ve yumuşak doku cerrahisi konularında uzmanlaşmış ekibimiz her zaman yanınızda.'
    },
    {
      icon: <ShieldPlus size={32} color="var(--color-secondary)" />,
      title: 'Aşılama & Paraziter Uygulamalar',
      desc: 'Düzenli aşılama takvimleri ve parazit koruması ile dostlarınızın sağlığını koruma altına alıyoruz. Yavru ve yetişkin hayvanlar için özel aşı programları hazırlıyor, iç ve dış parazit tedavilerini eksiksiz uyguluyoruz.'
    },
    {
      icon: <Dna size={32} color="var(--color-secondary)" />,
      title: 'Laboratuvar Tetkik',
      desc: 'Kan, idrar ve dışkı analizleri ile hızlı ve doğru sonuçlar elde ediyoruz. Klinik biyokimya, hematoloji ve mikrobiyoloji testleriyle hastalıkların kesin tanısını koyarak en uygun tedavi yöntemini belirliyoruz.'
    },
    {
      icon: <HeartPulse size={32} color="var(--color-secondary)" />,
      title: '7/24 Acil Veterinerlik Hizmeti',
      desc: 'Gece gündüz demeden, acil durumlarda hızlı ve etkili müdahale sağlıyoruz. Zehirlenme, travma, solunum sıkıntısı gibi acil durumlarda deneyimli ekibimiz anında devreye giriyor.'
    },
    {
      icon: <Pill size={32} color="var(--color-secondary)" />,
      title: 'Besleme & Danışmanlık',
      desc: 'Hayvanınızın türüne, yaşına ve sağlık durumuna göre özel beslenme programları oluşturuyoruz. Obezite, alerjik reaksiyonlar ve büyüme dönemindeki besin ihtiyaçları konusunda uzman danışmanlık hizmeti sunuyoruz.'
    },
    {
      icon: <Truck size={32} color="var(--color-secondary)" />,
      title: 'Evde Sağlık Hizmetleri',
      desc: 'Kliniğe gelemediğiniz durumlarda veteriner hekimlerimiz evinize geliyor. Gezici sağlık hizmetimizle muayene, aşılama ve basit tedavileri evinizin konforunda gerçekleştiriyoruz.'
    },
    {
      icon: <Scissors size={32} color="var(--color-secondary)" />,
      title: 'Pet Kuaför Hizmeti',
      desc: 'Profesyonel bakım, tıraş, banyo ve tırnak kesimi hizmetleri sunuyoruz. Evcil hayvanınızın hijyeni ve konforu için özel bakım ürünleri kullanarak, onları pırıl pırıl yapıyoruz.'
    },
    {
      icon: <ShoppingBag size={32} color="var(--color-secondary)" />,
      title: 'Pet Shop',
      desc: 'Kaliteli mama, aksesuar ve bakım ürünleri geniş ürün yelpazemizde sizleri bekliyor. Güvenilir markaların ürünlerini uygun fiyatlarla sunuyor, evcil hayvanınız için en doğru seçimi yapmanıza yardımcı oluyoruz.'
    },
  ];

  return (
    <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      
      {/* Hero Banner */}
      <section style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        backgroundColor: 'var(--color-secondary)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(238,189,95,0.08)' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(238,189,95,0.05)' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1.25rem', backgroundColor: 'rgba(238,189,95,0.2)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem' }}>VagalVet Veteriner Kliniği</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', marginBottom: '1rem' }}>
            Hizmetlerimiz
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.7 }}>
            Can dostlarınızın tüm sağlık ve bakım ihtiyaçları için modern tıbbın sunduğu en güncel yaklaşımları uyguluyoruz.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {services.map((s, i) => (
              <div 
                key={i} 
                className={`surface-card glass-panel animate-fade-in-up delay-${Math.min((i + 1) * 100, 400)}`} 
                style={{ 
                  padding: '2.5rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.querySelector('.icon-wrapper').style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.querySelector('.icon-wrapper svg').style.color = 'var(--color-secondary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.querySelector('.icon-wrapper').style.backgroundColor = 'var(--bg-soft)';
                  e.currentTarget.querySelector('.icon-wrapper svg').style.color = 'var(--color-secondary)';
                }}
              >
                <div 
                  className="icon-wrapper"
                  style={{
                    width: '64px', height: '64px',
                    backgroundColor: 'var(--bg-soft)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginTop: '0.5rem', color: 'var(--text-main)', transition: 'color 0.3s ease' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
                  <span>Detaylı Bilgi</span>
                  <span style={{ fontSize: '1.2rem' }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
            Randevu Almak İster Misiniz?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Dostlarınızın sağlığı bizim önceliğimizdir. Hemen bizi arayarak randevunuzu oluşturabilirsiniz.
          </p>
          <a href="tel:+905533841460" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            <Phone size={20} style={{ marginRight: '0.75rem' }} />
            0553 384 14 60
          </a>
        </div>
      </section>

    </div>
  );
};

export default Hizmetler;
