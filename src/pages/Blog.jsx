import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, ArrowRight, X } from 'lucide-react';

export default function Blog() {
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeArticle]);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let savedBlogs = JSON.parse(localStorage.getItem('vagalvet_blogs') || '[]');
    if (savedBlogs.length === 0) {
      savedBlogs = [
        {
          id: 1,
          title: 'Evcil Hayvanlarımızı Neden Kısırlaştırmalıyız? Kısırlaştırmanın Önemi Nedir?',
          excerpt: 'Kısırlaştırma, hayvan refahını artıran, yaşam süresini uzatan ve birçok ciddi hastalığın önüne geçen çok önemli bir cerrahi müdahaledir.',
          content: `🔖 Dişi hayvanların kısırlaştırılmasıyla kızgınlık dönemine bağlı huzursuzluk, aşırı miyavlama, yuvarlanma ve çiftleşme davranışları ortadan kalkmaktadır. Erkek hayvanların dişilere yönelmesine bağlı kaçma, kavga etme ve yaralanma risklerini azaltır.\n\n🔖 Erkek hayvanların kısırlaştırılmasıyla üreme hormonlarına bağlı davranışlarda belirgin azalma görülmektedir. Alan işaretleme, dolaşma eğilimi, dişilere yönelme ve cinsel motivasyonla ilişkili davranışların azalmasına katkı sağlar. Bu durum hem hayvan refahının artmasına hem de sahip-hayvan ilişkisinin güçlenmesine yardımcı olmaktadır.\n\n🔖 Dişi kedi ve köpeklerde kısırlaştırma meme tümörü riskini anlamlı ölçüde azaltmaktadır. Erkek kedi ve köpeklerde testiküler tümörleri tamamen önlemekte, prostat hastalıklarının riskini önemli ölçüde azaltmaktadır.\n\n🔖 Dişi kedi ve köpeklerde kısırlaştırma (ovariohisterektomi) uygulaması pyometra riskini tamamen ortadan kaldıran tek yöntemdir. Pyometra, yaş ilerledikçe gelişme riski artan ve potansiyel olarak yaşamı tehdit eden üreme sistemi hastalığıdır.\n\n🔖 Kısırlaştırma istenmeyen gebelikleri ve doğumla ilgili komplikasyonları tamamen önler.\n\n🔖 Kısırlaştırma sonrası evcil hayvanlarda hormonların metabolik hız üzerindeki etkilerinin ortadan kalkmasıyla birlikte toplam enerji gereksiniminde azalma meydana gelmektedir. Hormonlarda meydana gelen değişiklikler stresin azalmasına yol açar, iştah artışı yaygın olarak görülür. Bu durumda enerji alımı ve fiziksel aktivite dengesi yönetilerek obezite riskinin önüne geçilmelidir.\n\n‼️ ÖZELLİKLE PYOMETRA VE PROSTAT HASTALIKLARI GİBİ CİDDİ KLİNİK TABLOLAR GÖZ ÖNÜNE ALINIRSA EVCİL HayVANIMIZI KISIRLAŞTIRMAK İÇİN GEÇ KALINMAMALI, POTANSİYEL RİSKLERİN ÖNÜNE GEÇİLMELİDİR.`,
          image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80',
          category: 'Koruyucu Hekimlik',
          date: 'Yakın Zamanda',
          author: '@muru.vett & @m.ali_eraslan'
        },
        {
          id: 2,
          title: 'Yeni Doğum Yapan Bir Kedideki Anne Rolü Nedir?',
          excerpt: 'İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu kliniğimize getirildi. Göbek bağını annenin kesmediği durumlarda ne yapılmalıdır?',
          content: `İlk doğumunu yapan anne kedimiz yavrularının göbek bağlarını kesmemesi sonucu yavrular birbirine dolanmış bir şekilde kliniğimize getirildi. Göbek bağını annenin kesmediği bu durumda erken müdahale için geç kalınmıştı. Gerekli müdahale sonucunda 2 yavru uygun seviyeden göbek bağları kesilerek sağlıklı şekilde kurtarıldı. Genel durumları stabil ve yaşamsal refleksleri iyi hale getirildi.\n\n📌 YENİ DOĞUM YAPAN BİR KEDİDEKİ ANNE ROLÜ NEDİR, GÖBEK BAĞINI ANNENİN KESMEDİĞİ DURUMLARDA NE YAPILMALIDIR?\n\n🐱 Yenidoğan yavru kediler doğru vücut ısısının korunması, bakım, korunma ve idrar/dışkılama uyarımı için annelerine bağımlıdır.\n🐱 Bu nedenle doğumda ve sonrasında uygun anne davranışı ve bakımı yavru kedinin hayatta kalması için gereklidir.\n🐱 Doğumda normal koşullar altında anne fetal zarları açmak, göbek bağını kesmek (ısırmak) ve yavruları yalamakla sorumludur; yalamanın amacı, solunumu uyarmada önemli olmasının yanı sıra, fetal sıvıları uzaklaştırmak ve yavru kedinin kurumasını sağlamaktır.\n🐱 İlk kez doğum yapan annelerde, doğum sırasında ve doğumdan sonraki ilk 48 saat boyunca anne davranışlarının sıkı bir şekilde izlenmesi, anormallikleri belirlemek ve yavru kedileri kurtarmak için çok önemlidir.\n🐱 Yeni doğum sonrası annenin yapamadığı müdahalelerde mutlaka veteriner hekime başvurulmalıdır.\n\n⚠️ NELERE DİKKAT ETMELİYİZ?\n\n➡️ Anne, yavruların göbek bağını koparmış mı?\nEğer göbek bağları duruyorsa, dolanma, enfeksiyon ve kan akımının kesilmesi riski vardır.\n➡️ Yavrular birbirine dolanmış mı?\nGöbek bağları, özellikle doğumdan sonraki ilk birkaç gün içinde kuruyana kadar oldukça esnek ve tehlikelidir.\n➡️ Göbek bağı şiş, kızarık ya da kötü kokulu mu?\nBöyle durumlar göbek enfeksiyonuna işaret eder ve sistemik enfeksiyonlara yol açabilir.\n\n⚠️ UNUTMAYIN!\nİlk doğumu yapan annelerde annelik içgüdüsü zayıf olabilir. Bu gibi durumlarda en kısa sürede veteriner hekime başvurulmalıdır.`,
          image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=800&q=80',
          category: 'Klinik Vakalar',
          date: 'Yakın Zamanda',
          author: 'VagalVet Ekibi'
        },
        {
          id: 3,
          title: 'Canine Parvoviral Enteritis (Lina Vakamız)',
          excerpt: 'Kanin Parvoviral Enteritis nedir? Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.',
          content: `🐶🤎 Lina\n🦠 Canine Parvoviral Enteritis\n\n🔖 Kanin Parvoviral Enteritis nedir?\n• Köpeklerde ölüm oranı yüksek, bulaşıcı ve özellikle yavru köpekleri etkileyen viral bir hastalıktır.\n\n🔖 Nasıl Bulaşır?\n• Bu hastalık hava yoluyla direkt olarak veya hasta köpekler tarafından enfekte dışkı ile kontamine gıdaların ağız yoluyla alınması sonucu geçebilmektedir. Ayrıca enfekte bir hayvanın dışkısıyla (gaitasıyla) kontamine araç ve ekipmanlarla temas yoluyla da enfeksiyon etkenleri duyarlı hayvanlara bulaşabilmektedir.\n\n🔖 En duyarlı yaş aralığı nedir?\n• Her yaş ve ırktan köpek Parvovirüs ile enfekte olabilmesine rağmen en duyarlı yaş aralığı 6-16 haftalık yavru köpeklerdir.\n\n🔖 Klinik belirtileri nelerdir?\n• Halsizlik, iştahsızlık, kusma ve şiddetli ishal gözlemlenir.\n• Bağırsak cidarı etkilendiği için bağırsak yüzeyinde kanamalar şekillenebilmekte ve bunun sonucunda kusma ve kanlı ishal görülmektedir.\n\n📌 Koruyucu immunitenin eksikliği hastalığa yatkın hale getiren hazırlayıcı faktörlerdendir.\n📌 Klinik bulguların görülmesiyle beraber veteriner hekiminize danışmanız erken teşhis ve tedavi için oldukça önemlidir. Tedavinin yanı sıra hastalıktan korunma, önemini korumaktadır.\n\n⚠️ Korunmanın En Etkili Yolu: AŞILAMA 💉\n• Veteriner hekim tarafından köpeğinizin mevcut durumuna göre uygun görülen zaman içerisinde aşılama takvimine başlanmalıdır.\n• Aşılama, viral enfeksiyonlara karşı koruma sağlamak için hayati öneme sahiptir. Can dostlarımız için, sağlıklı yaşamları için aşılarımızı ihmal etmeyelim, geç kalmayalım.❣️\n\nGeçmiş olsun Lina! 🥰`,
          image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
          category: 'Köpek Bakımı',
          date: 'Yakın Zamanda',
          author: 'VagalVet Ekibi'
        }
      ];
      localStorage.setItem('vagalvet_blogs', JSON.stringify(savedBlogs));
    }
    setArticles(savedBlogs);
  }, []);

  return (
    <main style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '120px 0 60px', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', backgroundColor: 'rgba(238, 189, 95, 0.2)', color: 'var(--color-secondary)', borderRadius: 'var(--radius-full)', fontWeight: 600, marginBottom: '1rem' }}>
            <BookOpen size={18} /> VagalVet Blog & Klinik Vakalar
          </div>
          <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Evcil Hayvan Sağlığı Rehberi
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Uzman hekimlerimiz tarafından hazırlanan güncel makaleler, klinik vakalarımız ve detaylı bakım ipuçları.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="glass-panel"
              onClick={() => setActiveArticle(article)}
              style={{ 
                borderRadius: 'var(--radius-lg)', 
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ 
                  position: 'absolute', top: 16, left: 16, 
                  background: 'var(--color-primary)', color: '#000', 
                  padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', 
                  fontSize: '0.8rem', fontWeight: 'bold', zIndex: 1 
                }}>
                  {article.category}
                </div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                />
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {article.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} /> {article.author}</span>
                </div>
                <h2 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', lineHeight: 1.4 }}>
                  {article.title}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {article.excerpt}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
                  Devamını Oku <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal for full article reading */}
        {activeArticle && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem'
          }} onClick={() => setActiveArticle(null)}>
            <div 
              style={{
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveArticle(null)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white',
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 10
                }}
              >
                <X size={20} />
              </button>
              
              <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
                <img src={activeArticle.image} alt={activeArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              
              <div style={{ padding: '3rem' }}>
                <div style={{ display: 'inline-block', background: 'var(--color-primary)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {activeArticle.category}
                </div>
                <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {activeArticle.title}
                </h2>
                
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {activeArticle.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {activeArticle.author}</span>
                </div>
                
                <div style={{ 
                  color: 'var(--text-main)', 
                  fontSize: '1.05rem', 
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap'
                }}>
                  {activeArticle.content}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
