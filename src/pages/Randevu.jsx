import React, { useState } from 'react';
import { Calendar, Clock, PawPrint, Stethoscope, ChevronRight, CheckCircle2, User, Phone } from 'lucide-react';

export default function Randevu() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    petType: '',
    service: '',
    date: '',
    time: '',
    ownerName: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const petTypes = [
    { id: 'kedi', label: 'Kedi', icon: '🐱' },
    { id: 'kopek', label: 'Köpek', icon: '🐶' },
    { id: 'kus', label: 'Kuş', icon: '🦜' },
    { id: 'diger', label: 'Diğer', icon: '🐾' }
  ];

  const services = [
    'Genel Muayene', 'Aşı Uygulaması', 'Cerrahi Operasyon', 
    'Pet Kuaför', 'Diş Bakımı', 'Acil Müdahale'
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const newAppointment = {
        id: 'RND-' + Math.floor(Math.random() * 10000),
        createdAt: new Date().toLocaleString('tr-TR'),
        ...formData,
        status: 'Beklemede'
      };
      
      const existing = JSON.parse(localStorage.getItem('vagalvet_appointments') || '[]');
      localStorage.setItem('vagalvet_appointments', JSON.stringify([newAppointment, ...existing]));
      
    }, 1500);
  };

  return (
    <main className="bg-gradient-premium" style={{ minHeight: '100vh', padding: '120px 0 60px' }}>
      <div className="container animate-fade-in-up" style={{ maxWidth: '800px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', backgroundColor: 'rgba(238, 189, 95, 0.2)', color: 'var(--color-secondary)', borderRadius: 'var(--radius-full)', fontWeight: 600, marginBottom: '1rem' }}>
            Hızlı & Kolay
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Online Randevu Alın
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Sevimli dostunuz için en uygun zamanı seçin, gerisini bize bırakın.
          </p>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>
            <div style={{ position: 'absolute', top: '50%', left: 0, width: `${(step - 1) * 33.3}%`, height: '2px', background: 'var(--color-primary)', zIndex: 0, transition: 'width 0.3s' }}></div>
            
            {[1, 2, 3, 4].map(num => (
              <div key={num} style={{ 
                width: 40, height: 40, borderRadius: '50%', 
                background: step >= num ? 'var(--color-primary)' : 'var(--bg-surface)',
                border: `2px solid ${step >= num ? 'var(--color-primary)' : 'var(--border-color)'}`,
                color: step >= num ? '#fff' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', position: 'relative', zIndex: 1,
                transition: 'all 0.3s'
              }}>
                {num}
              </div>
            ))}
          </div>
        )}

        <div className="glass-panel delay-200 animate-fade-in-up" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: 80, height: 80, background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CheckCircle2 size={40} color="#10b981" />
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Randevu Talebiniz Alındı!</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Uzman hekimlerimiz talebinizi inceleyip en kısa sürede <strong>{formData.phone}</strong> numaralı telefondan size ulaşarak randevunuzu kesinleştirecektir.
              </p>
              <button onClick={() => window.location.href='/'} className="btn btn-primary">Ana Sayfaya Dön</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: Pet Type */}
              {step === 1 && (
                <div className="fade-in">
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <PawPrint color="var(--color-primary)" /> Dostumuzun Türü Nedir?
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    {petTypes.map(pet => (
                      <div 
                        key={pet.id}
                        onClick={() => setFormData({...formData, petType: pet.label})}
                        style={{
                          border: `2px solid ${formData.petType === pet.label ? 'var(--color-primary)' : 'var(--border-color)'}`,
                          borderRadius: 'var(--radius-md)',
                          padding: '1.5rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: formData.petType === pet.label ? 'rgba(238, 189, 95, 0.1)' : 'transparent',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{pet.icon}</div>
                        <div style={{ fontWeight: 600 }}>{pet.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Service */}
              {step === 2 && (
                <div className="fade-in">
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Stethoscope color="var(--color-primary)" /> Hangi Hizmete İhtiyacınız Var?
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {services.map(srv => (
                      <div 
                        key={srv}
                        onClick={() => setFormData({...formData, service: srv})}
                        style={{
                          border: `2px solid ${formData.service === srv ? 'var(--color-primary)' : 'var(--border-color)'}`,
                          borderRadius: 'var(--radius-md)',
                          padding: '1rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: formData.service === srv ? 'rgba(238, 189, 95, 0.1)' : 'transparent',
                          fontWeight: 600,
                          transition: 'all 0.2s'
                        }}
                      >
                        {srv}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Date & Time */}
              {step === 3 && (
                <div className="fade-in">
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar color="var(--color-primary)" /> Tarih ve Saat Seçimi
                  </h3>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Randevu Tarihi</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      style={{
                        width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface)', fontFamily: 'inherit', fontSize: '1rem', outline: 'none'
                      }}
                    />
                  </div>

                  {formData.date && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Uygun Saatler</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
                        {timeSlots.map(time => (
                          <div 
                            key={time}
                            onClick={() => setFormData({...formData, time})}
                            style={{
                              border: `2px solid ${formData.time === time ? 'var(--color-primary)' : 'var(--border-color)'}`,
                              borderRadius: 'var(--radius-md)',
                              padding: '0.75rem',
                              textAlign: 'center',
                              cursor: 'pointer',
                              background: formData.time === time ? 'var(--color-primary)' : 'transparent',
                              color: formData.time === time ? '#000' : 'var(--text-main)',
                              fontWeight: 600,
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                              transition: 'all 0.2s'
                            }}
                          >
                            <Clock size={16} /> {time}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Contact Info */}
              {step === 4 && (
                <div className="fade-in">
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User color="var(--color-primary)" /> İletişim Bilgileriniz
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Adınız Soyadınız</label>
                      <div style={{ position: 'relative' }}>
                        <User size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                        <input 
                          type="text" 
                          required
                          value={formData.ownerName}
                          onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                          placeholder="Adınız ve Soyadınız"
                          style={{
                            width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                            background: 'var(--bg-surface)', fontFamily: 'inherit', fontSize: '1rem', outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Telefon Numaranız</label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="0 (5XX) XXX XX XX"
                          style={{
                            width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                            background: 'var(--bg-surface)', fontFamily: 'inherit', fontSize: '1rem', outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Eklemek İstedikleriniz (Opsiyonel)</label>
                      <textarea 
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Şikayet veya belirtileri buraya yazabilirsiniz..."
                        style={{
                          width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                          background: 'var(--bg-surface)', fontFamily: 'inherit', fontSize: '1rem', outline: 'none', resize: 'vertical'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                {step > 1 ? (
                  <button type="button" onClick={handlePrev} className="btn btn-outline">Geri</button>
                ) : <div></div>}

                {step < 4 ? (
                  <button 
                    type="button" 
                    onClick={handleNext} 
                    className="btn btn-primary"
                    disabled={
                      (step === 1 && !formData.petType) || 
                      (step === 2 && !formData.service) ||
                      (step === 3 && (!formData.date || !formData.time))
                    }
                    style={{ opacity: ((step === 1 && !formData.petType) || (step === 2 && !formData.service) || (step === 3 && (!formData.date || !formData.time))) ? 0.5 : 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    İleri <ChevronRight size={18} />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !formData.ownerName || !formData.phone}
                    className="btn btn-primary"
                    style={{ opacity: (isSubmitting || !formData.ownerName || !formData.phone) ? 0.7 : 1 }}
                  >
                    {isSubmitting ? 'İşleniyor...' : 'Randevu Talebini Gönder'}
                  </button>
                )}
              </div>

            </form>
          )}
        </div>
      </div>
    </main>
  );
}
