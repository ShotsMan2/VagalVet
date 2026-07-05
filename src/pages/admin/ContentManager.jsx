import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, MessageSquare, Type, Bold, Italic, Link as LinkIcon, List, AlignLeft, Plus, Check } from 'lucide-react';

const ContentManager = () => {
  const [siteContent, setSiteContent] = useState({});
  const [saveContentSuccess, setSaveContentSuccess] = useState(false);

  useEffect(() => {
    const defaultSiteContent = {
      homeHeroTitle: 'Can dostlarınız için',
      homeHeroTitleHighlight: 'modern sağlık.',
      homeHeroSubtitle: 'VagalVet Veteriner Kliniği olarak sevimli dostlarımızın sağlığı için en güncel tıbbi yöntemlerle yanınızdayız. Profesyonel kadromuz ve donanımlı altyapımızla sevgi dolu bir sağlık hizmeti sunuyoruz.',
      homeAboutTitle: 'Neden VagalVet?',
      homeAboutText1: 'Kliniğimiz, dostlarımızın hem fiziksel hem de psikolojik ihtiyaçlarını göz önünde bulundurarak tasarlanmıştır. Modern ekipmanlarımızla hastalıkları erken teşhis ediyor ve en uygun tedavi yöntemlerini sunuyoruz.',
      homeAboutText2: 'Aşı takibinden cerrahi operasyonlara, laboratuvar hizmetlerinden pet kuaförüne kadar geniş bir yelpazede hizmet veriyoruz. Amacımız sadece hastalıkları tedavi etmek değil, koruyucu hekimlik ile hastalıkların önüne geçmektir.',
      workingHoursWeekday: '09.00 - 20.00',
      workingHoursWeekend: '12.00 - 18.00'
    };
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
    } else {
      setSiteContent(defaultSiteContent);
    }
  }, []);

  const handleSaveSiteContent = (e) => {
    e.preventDefault();
    localStorage.setItem('vagalvet_site_content', JSON.stringify(siteContent));
    setSaveContentSuccess(true);
    setTimeout(() => setSaveContentSuccess(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
      style={{ background: 'var(--bg-main)', minHeight: '80vh', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', display: 'flex' }}
    >
      {/* Notion-style Sidebar */}
      <div style={{ width: '250px', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem 1rem', borderBottom: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--color-primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 800 }}>V</div>
            VagalVet Workspace
          </div>
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Sayfalar</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-main)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left', fontWeight: 500 }}>
              <FileText size={16} /> Ana Sayfa
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left' }}>
              <FileText size={16} /> Hakkımızda
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left' }}>
              <FileText size={16} /> Hizmetler
            </button>
          </div>
        </div>
      </div>

      {/* Notion-style Editor Area */}
      <div style={{ flex: 1, padding: '4rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Title Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', outline: 'none' }} contentEditable suppressContentEditableWarning>Ana Sayfa</div>
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><ImageIcon size={16}/> Cover Ekle</button>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MessageSquare size={16}/> Yorum Ekle</button>
            </div>
          </div>

          {/* Toolbar */}
          <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', marginBottom: '2rem', position: 'sticky', top: '1rem', zIndex: 10 }}>
            <button style={{ background: 'transparent', border: 'none', padding: '0.5rem', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '4px' }}><Type size={18}/></button>
            <button style={{ background: 'transparent', border: 'none', padding: '0.5rem', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '4px' }}><Bold size={18}/></button>
            <button style={{ background: 'transparent', border: 'none', padding: '0.5rem', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '4px' }}><Italic size={18}/></button>
            <div style={{ width: '1px', background: 'var(--border-glass)', margin: '0 0.5rem' }}></div>
            <button style={{ background: 'transparent', border: 'none', padding: '0.5rem', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '4px' }}><LinkIcon size={18}/></button>
            <button style={{ background: 'transparent', border: 'none', padding: '0.5rem', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '4px' }}><ImageIcon size={18}/></button>
            <div style={{ width: '1px', background: 'var(--border-glass)', margin: '0 0.5rem' }}></div>
            <button style={{ background: 'transparent', border: 'none', padding: '0.5rem', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '4px' }}><List size={18}/></button>
            <button style={{ background: 'transparent', border: 'none', padding: '0.5rem', color: 'var(--text-main)', cursor: 'pointer', borderRadius: '4px' }}><AlignLeft size={18}/></button>
          </div>

          {/* Editor Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'grab', padding: '0.5rem 0' }}>::</button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', outline: 'none' }} contentEditable suppressContentEditableWarning>Hero Başlığı</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingLeft: '2rem' }}>
              <div style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                <input type="text" value={siteContent.homeHeroTitle || ''} onChange={(e) => setSiteContent({...siteContent, homeHeroTitle: e.target.value})} style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '1.1rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingLeft: '2rem' }}>
              <div style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                <input type="text" value={siteContent.homeHeroTitleHighlight || ''} onChange={(e) => setSiteContent({...siteContent, homeHeroTitleHighlight: e.target.value})} style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--color-primary)', fontSize: '1.1rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingLeft: '2rem' }}>
              <div style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                <textarea rows={3} value={siteContent.homeHeroSubtitle || ''} onChange={(e) => setSiteContent({...siteContent, homeHeroSubtitle: e.target.value})} style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', resize: 'vertical', lineHeight: 1.6 }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginTop: '2rem' }}>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'grab', padding: '0.5rem 0' }}>::</button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', outline: 'none' }} contentEditable suppressContentEditableWarning>Hakkımızda Bölümü</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingLeft: '2rem' }}>
              <div style={{ flex: 1, background: 'var(--bg-surface)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                <textarea rows={6} value={siteContent.homeAboutText1 || ''} onChange={(e) => setSiteContent({...siteContent, homeAboutText1: e.target.value})} style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', resize: 'vertical', lineHeight: 1.6 }} />
              </div>
            </div>

            {/* Placeholder for new block */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem', color: 'var(--text-muted)', cursor: 'text' }}>
              <Plus size={20} style={{ opacity: 0.5 }}/> ' / ' yazarak yeni bir komut seçin
            </div>

          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '3rem', zIndex: 100 }}>
        <button onClick={handleSaveSiteContent} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'var(--color-primary)', color: '#000', borderRadius: '2rem', fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', transition: 'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
          {saveContentSuccess ? <><Check size={20}/> Kaydedildi!</> : 'Değişiklikleri Kaydet'}
        </button>
      </div>

    </motion.div>
  );
};

export default ContentManager;
