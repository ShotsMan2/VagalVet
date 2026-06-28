import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldPlus, Dna, Syringe, Phone, 
  Clock, Mail, MapPin, Stethoscope, Scissors, ShoppingBag, Truck, HeartPulse,
  ArrowRight, Award, Heart, Shield, Star, Quote
} from 'lucide-react';

const Counter = ({ end, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--color-secondary)', fontFamily: 'var(--font-heading)' }}>{count}{suffix}</div>
      <div style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginTop: '0.5rem', fontWeight: 600 }}>{label}</div>
    </div>
  );
};

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [contactSettings, setContactSettings] = useState({ phone: '0553 384 14 60', email: 'info@vagalvet.com', instagram: '#', facebook: '#' });
  const [siteContent, setSiteContent] = useState({
    homeHeroTitle: 'Can dostlarınız için',
    homeHeroTitleHighlight: 'modern sağlık.',
    homeHeroSubtitle: 'VagalVet Veteriner Kliniği olarak sevimli dostlarımızın sağlığı için en güncel tıbbi yöntemlerle yanınızdayız. Profesyonel kadromuz ve donanımlı altyapımızla sevgi dolu bir sağlık hizmeti sunuyoruz.',
    homeAboutTitle: 'Neden VagalVet?',
    homeAboutText1: 'Kliniğimiz, dostlarımızın hem fiziksel hem de psikolojik ihtiyaçlarını göz önünde bulundurarak tasarlanmıştır. Modern ekipmanlarımızla hastalıkları erken teşhis ediyor ve en uygun tedavi yöntemlerini sunuyoruz.',
    homeAboutText2: 'Aşı takibinden cerrahi operasyonlara, laboratuvar hizmetlerinden pet kuaförüne kadar geniş bir yelpazede hizmet veriyoruz. Amacımız sadece hastalıkları tedavi etmek değil, koruyucu hekimlik ile hastalıkların önüne geçmektir.'
  });

  useEffect(() => {
    setMounted(true);
    const savedContact = localStorage.getItem('vagalvet_contact_settings');
    if (savedContact) {
      setContactSettings(JSON.parse(savedContact));
    }
    const savedContent = localStorage.getItem('vagalvet_site_content');
    if (savedContent) {
      let parsed = JSON.parse(savedContent);
      if (parsed.homeHeroTitle === 'Sevgiyle İyileştiriyor, Özenle Yaşatıyoruz') {
        parsed.homeHeroTitle = 'Can dostlarınız için';
      }
      if (!parsed.homeHeroTitleHighlight) {
        parsed.homeHeroTitleHighlight = 'modern sağlık.';
      }
      if (!parsed.workingHoursWeekday) {
        parsed.workingHoursWeekday = '09.00 - 20.00';
        parsed.workingHoursWeekend = '12.00 - 18.00';
      }
      setSiteContent(parsed);
    }

    // Scroll Animation Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    { id: 1, title: 'Muayene & Teşhis', icon: <Stethoscope size={28} color="var(--color-secondary)" />, desc: 'Kapsamlı fiziksel ve klinik muayene' },
    { id: 2, title: 'Dahiliye & Cerrahi', icon: <Syringe size={28} color="var(--color-secondary)" />, desc: 'Modern cerrahi müdahaleler ve tedaviler' },
    { id: 3, title: 'Aşılama & Paraziter', icon: <ShieldPlus size={28} color="var(--color-secondary)" />, desc: 'Düzenli takip ve koruyucu hekimlik' },
    { id: 4, title: 'Laboratuvar', icon: <Dna size={28} color="var(--color-secondary)" />, desc: 'Hızlı ve kesin laboratuvar tetkikleri' },
    { id: 5, title: '7/24 Acil', icon: <HeartPulse size={28} color="var(--color-secondary)" />, desc: 'Kesintisiz acil veteriner müdahalesi' },
    { id: 6, title: 'Evde Sağlık', icon: <Truck size={28} color="var(--color-secondary)" />, desc: 'Gezici sağlık ve evde bakım hizmeti' },
    { id: 7, title: 'Pet Kuaför', icon: <Scissors size={28} color="var(--color-secondary)" />, desc: 'Profesyonel pet kuaför hizmetleri' },
    { id: 8, title: 'Pet Shop', icon: <ShoppingBag size={28} color="var(--color-secondary)" />, desc: 'Besleme ve danışmanlık hizmetleri' },
  ];

  const values = [
    { icon: <Award size={28} color="var(--color-secondary)" />, title: 'Deneyim & Uzmanlık', desc: 'Yılların verdiği bilgi birikimi ve sürekli eğitimle en güncel veterinerlik uygulamalarını sunuyoruz.' },
    { icon: <Shield size={28} color="var(--color-secondary)" />, title: 'Modern Ekipman', desc: 'Son teknoloji tıbbi cihazlar ve donanımla doğru teşhis ve etkili tedavi sağlıyoruz.' },
    { icon: <Heart size={28} color="var(--color-secondary)" />, title: 'Sevgi & Şefkat', desc: 'Her hastamıza özel, sevgi dolu yaklaşım. Dostlarınızı kendi ailemizin bir ferdi gibi görüyoruz.' },
    { icon: <Clock size={28} color="var(--color-secondary)" />, title: '7/24 Erişim', desc: 'Acil durumlarda gece gündüz ulaşılabilir veteriner hizmeti. Tek bir telefon uzağınızdayız.' },
  ];

  return (
    <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease' }}>
      
      {/* Hero Section */}
      <section className="bg-gradient-premium" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px', // Navbar offset
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Soft background shape */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '0',
          width: '51.5%',
          height: '110%',
          backgroundColor: 'var(--bg-soft)',
          borderRadius: '100px 0 0 100px',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          
          <div className="animate-fade-in-up" style={{ flex: '1 1 500px', paddingRight: '2rem' }}>
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'rgba(238, 189, 95, 0.2)', color: 'var(--color-secondary)', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              VagalVet Veteriner Kliniği
            </div>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              color: 'var(--text-main)',
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>
              {siteContent.homeHeroTitle} <br/>
              <span className="text-gradient">{siteContent.homeHeroTitleHighlight}</span>
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-muted)', 
              marginBottom: '2.5rem',
              maxWidth: '550px',
              lineHeight: 1.7
            }}>
              {siteContent.homeHeroSubtitle}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={`tel:${(contactSettings.phone || '').replace(/[^0-9]/g, '')}`} className="btn btn-primary">
                <Phone size={20} style={{ marginRight: '0.5rem' }}/>
                Randevu Alın
              </a>
              <Link to="/hizmetler" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                Hizmetleri İncele
              </Link>
            </div>
            <div className="glass-panel delay-200 animate-fade-in-up" style={{ marginTop: '3rem', display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-main)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', maxWidth: '400px' }}>
              <div className="animate-pulse-soft glow-effect" style={{ backgroundColor: 'var(--badge-bg)', padding: '0.75rem', borderRadius: '50%', display: 'flex' }}>
                <HeartPulse size={24} color="var(--badge-text)" />
              </div>
              <div>
                <span style={{ fontSize: '1rem', fontWeight: 700, display: 'block' }}>7/24 Acil Müdahale & Destek</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{contactSettings.phone} • {contactSettings.email}</span>
              </div>
            </div>
          </div>
          
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center' }}>
             <img 
               src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=1000&fit=crop" 
               alt="Modern Veteriner Kliniği" 
               className="animate-float"
               style={{ 
                 width: '100%', 
                 maxWidth: '550px', 
                 height: 'auto', 
                 aspectRatio: '4/5', 
                 objectFit: 'cover', 
                 borderRadius: '2rem',
                 boxShadow: 'var(--shadow-lg)'
               }} 
             />
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="reveal-on-scroll" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>{siteContent.homeAboutTitle}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {siteContent.homeAboutText1}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.8 }}>
              {siteContent.homeAboutText2}
            </p>
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', gap: '1rem' }}>
            <img src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=500&fit=crop" alt="Kliniğimiz" style={{ width: '50%', borderRadius: '1rem', objectFit: 'cover' }} />
            <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=500&fit=crop" alt="Muayene" style={{ width: '50%', borderRadius: '1rem', objectFit: 'cover', transform: 'translateY(2rem)' }} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="reveal-on-scroll" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '700px', margin: '0 auto 5rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
              Kapsamlı <span style={{ color: 'var(--color-secondary)' }}>Hizmetlerimiz</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Dostlarınızın tüm sağlık ve bakım ihtiyaçları için modern tıbbın sunduğu en güncel yaklaşımları uyguluyoruz.</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {services.map(s => (
              <Link key={s.id} to="/hizmetler" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="surface-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                  <div style={{ 
                    width: '60px', height: '60px', 
                    backgroundColor: 'var(--bg-soft)', 
                    borderRadius: '1rem', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center' 
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{s.desc}</p>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                    <ArrowRight size={20} color="var(--color-primary)" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/hizmetler" className="btn btn-outline" style={{ textDecoration: 'none' }}>Tüm Hizmetlerimizi Gör</Link>
          </div>
        </div>
      </section>

      {/* Team & Hours Section */}
      <section id="hekimler" className="reveal-on-scroll" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'stretch' }}>
            
            {/* Vets */}
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'var(--bg-soft)', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
                Uzman Kadromuz
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Deneyimli Hekimlerimiz</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.125rem' }}>Can dostlarınız güvenilir ve şefkatli ellerde.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="surface-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ backgroundColor: 'var(--bg-soft)', padding: '1.5rem', borderRadius: 'var(--radius-full)' }}>
                    <Stethoscope size={32} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Mürüvvet Eraslan</h3>
                    <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Veteriner Hekim</p>
                  </div>
                </div>
                <div className="surface-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ backgroundColor: 'var(--bg-soft)', padding: '1.5rem', borderRadius: 'var(--radius-full)' }}>
                    <Stethoscope size={32} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Mehmet Ali Eraslan</h3>
                    <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Veteriner Hekim</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div style={{ flex: '1 1 400px', display: 'flex' }}>
              <div className="surface-card" style={{ padding: '3.5rem', width: '100%', backgroundColor: 'var(--hours-card-bg)', color: 'var(--hours-card-text)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '3rem', color: 'var(--hours-card-text)' }}>Çalışma Saatlerimiz</h2>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, display: 'block' }}>Haftaiçi Her Gün</span>
                  </div>
                  <span style={{ fontSize: '1.25rem', opacity: 0.9 }}>{siteContent.workingHoursWeekday || '09.00 - 20.00'}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600, display: 'block' }}>Haftasonu</span>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>(Cmt. - Paz.)</span>
                  </div>
                  <span style={{ fontSize: '1.25rem', opacity: 0.9 }}>{siteContent.workingHoursWeekend || '12.00 - 18.00'}</span>
                </div>

                <div style={{ backgroundColor: 'var(--badge-bg)', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--badge-text)', fontWeight: 700, fontSize: '1.1rem' }}>
                  7/24 Acil Müdahale Hizmeti Sağlanmaktadır.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Neden VagalVet */}
      <section className="reveal-on-scroll" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Neden VagalVet?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '550px', margin: '0 auto' }}>
              Bizi tercih etmeniz için birçok neden var.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {values.map((v, i) => (
              <div key={i} className="surface-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '64px', height: '64px',
                  backgroundColor: 'var(--bg-soft)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-main)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          <Counter end={15} label="Uzman Hekim & Personel" suffix="+" />
          <Counter end={10000} label="Mutlu Hasta" suffix="+" />
          <Counter end={20} label="Yıllık Deneyim" suffix="+" />
          <Counter end={7} label="Gün / 24 Saat Açık" suffix="/24" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '8rem 0', backgroundColor: 'var(--bg-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: 'rgba(238, 189, 95, 0.2)', color: 'var(--color-secondary)', borderRadius: 'var(--radius-full)', fontWeight: 600, marginBottom: '1rem' }}>
              <Star size={16} fill="currentColor" /> Başarı Hikayeleri
            </div>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Hasta Sahiplerimizin <span style={{ color: 'var(--color-secondary)' }}>Yorumları</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { text: "Lina'nın parvo tedavisinde gösterdikleri çaba ve şefkat kelimelerle anlatılamaz. Gece gündüz demeden yanımızda oldular. VagalVet ekibine minnettarız.", author: "Ayşe T.", pet: "Lina'nın Annesi" },
              { text: "Kliniğin hijyeni ve teknolojik altyapısı muazzam. Mia'nın kısırlaştırma ameliyatı çok başarılı geçti, ertesi gün ayaklandı. Her şey için teşekkürler.", author: "Burak K.", pet: "Mia'nın Babası" },
              { text: "Acil bir durumda gecenin 3'ünde getirdik kedimizi. Kapıda karşılayıp anında müdahale ettiler. Gözü kapalı güvenebileceğiniz tek klinik.", author: "Elif S.", pet: "Duman'ın Annesi" }
            ].map((review, i) => (
              <div key={i} className="surface-card" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
                <Quote size={48} color="rgba(251, 191, 36, 0.1)" style={{ position: 'absolute', top: '1rem', right: '1rem' }} />
                <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--color-secondary)', marginBottom: '1.5rem' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                </div>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem', fontStyle: 'italic' }}>
                  "{review.text}"
                </p>
                <div>
                  <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{review.author}</h4>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>{review.pet}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Galeri Section */}
      <section id="galeri" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Kliniğimizden Kareler</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Minik dostlarımızın sağlıklı ve mutlu anları</p>
            </div>
            <Link to="/galeri" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', textDecoration: 'none' }}>
              Tüm Galeri <ArrowRight size={18} />
            </Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', aspectRatio: '1/1' }}>
              <img src="/images/1.png" alt="Sevimli Hastamız 1" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)', transition: 'transform var(--transition-slow)' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.2)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1.15)'} />
            </div>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', aspectRatio: '1/1' }}>
              <img src="/images/2.png" alt="Sevimli Hastamız 2" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)', transition: 'transform var(--transition-slow)' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.2)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1.15)'} />
            </div>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', aspectRatio: '1/1' }}>
              <img src="/images/3.png" alt="Sevimli Hastamız 3" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)', transition: 'transform var(--transition-slow)' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.2)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1.15)'} />
            </div>
            <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', aspectRatio: '1/1' }}>
              <img src="/images/4.jpg" alt="Sevimli Hastamız 4" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.15)', transition: 'transform var(--transition-slow)' }} onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.2)'} onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1.15)'} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="surface-card" style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}>
            
            <div style={{ flex: '1 1 500px', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Bize Ulaşın</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>Sorularınız ve randevu talepleriniz için bizimle iletişime geçebilirsiniz.</p>
              <Link to="/iletisim" className="btn btn-accent" style={{ textDecoration: 'none', alignSelf: 'flex-start', marginBottom: '2rem' }}>
                Detaylı İletişim Sayfası <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </Link>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'var(--bg-soft)', padding: '1rem', borderRadius: '50%' }}>
                    <MapPin size={24} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Adres</h4>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Akademi Mah. Oyalı Sk.<br/>No: 7 A Selçuklu / Konya<br/>Konya Ardıçlı Toki</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'var(--bg-soft)', padding: '1rem', borderRadius: '50%' }}>
                    <Phone size={24} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Telefon</h4>
                    <p style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.25rem' }}>0 (553) 384 14 60</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: 'var(--bg-soft)', padding: '1rem', borderRadius: '50%' }}>
                    <Mail size={24} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email & Sosyal Medya</h4>
                    <a href="mailto:vagalvetveterinerklinigi@gmail.com" style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>vagalvetveterinerklinigi@gmail.com</a>
                    <a href="https://www.instagram.com/vagalvet.veterinerklinigi/" target="_blank" rel="noreferrer" style={{ fontWeight: 600 }}>@vagalvet.veterinerklinigi</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ flex: '1 1 400px', minHeight: '400px' }}>
              <iframe 
                title="VagalVet Konum"
                src="https://maps.google.com/maps?q=VagalVet+Veteriner+Klini%C4%9Fi+Konya&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
