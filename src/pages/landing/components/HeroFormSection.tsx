import { useState } from 'react';
import { trackFormSubmit, trackLead } from '@/lib/tracking';
import FormWhatsAppButton from '@/components/feature/FormWhatsAppButton';
import { triggerContactFallback } from '@/lib/formFallback';
import { offerFormWhatsAppHandoff } from '@/lib/formWhatsApp';
import { SITE_PHONE_DISPLAY } from '@/lib/siteContact';

export default function HeroFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    fetch('/api/form/landing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as never).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('LANDING_FORM_FAILED');
        }
        setSubmitted(true);
        setLoading(false);
        trackLead('free_hearing_test', 1, 'TRY');
        trackFormSubmit('landing_free_test', 'success', 'landing-hero-form', {
          age: formData.age,
        });
        offerFormWhatsAppHandoff('landing', formData);
      })
      .catch(() => {
        setSubmitted(false);
        setLoading(false);
        trackFormSubmit('landing_free_test', 'error', 'landing-hero-form', {
          age: formData.age,
        });
        triggerContactFallback('ücretsiz test', 'landing', formData);
      });
  };

  return (
    <section id="form" className="relative min-h-[680px] md:min-h-[720px] flex items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <img
          src="/local-images/readdy-landing-landhero2024v2c.webp"
          alt="Ücretsiz İşitme Testi Samsun"
          loading="eager"
          className="w-full h-full object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 bg-brand-dark/50" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 py-20 pt-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-accent/20 rounded-full px-4 py-2 mb-6">
              <i className="ri-gift-line text-brand-accent" />
              <span className="text-sm text-brand-accent font-semibold">Ücretsiz Kampanya</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-5">
              İşitme Sağlığınızı
              <br />
              <em className="text-brand-accent">Ücretsiz Test Edin</em>
            </h1>

            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-md">
              Samsun İlkadım&apos;da 15 yıllık deneyim. Odyometri uzmanlarımız tarafından yapılan kapsamlı işitme testi ve danışmanlık <strong className="text-white">tamamen ücretsiz</strong>.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Kapsamlı odyometri testi (air + bone)',
                'Uzman danışmanlık ve rapor',
                'SGK anlaşmalı merkez',
                'Aynı gün randevu',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/85">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-brand-accent/20 shrink-0">
                    <i className="ri-check-line text-brand-accent text-xs" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['N', 'H', 'S', 'M'].map((l, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-full bg-brand-accent/20 border border-brand-dark flex items-center justify-center text-xs font-bold text-brand-accent"
                  >
                    {l}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/60">
                Bu ay <strong className="text-white">127 kişi</strong> test yaptırdı
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto lg:mx-0 lg:ml-auto w-full">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-accent/10 mx-auto mb-5">
                  <i className="ri-checkbox-circle-line text-3xl text-brand-accent" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                  Randevu Talebiniz Alındı!
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  En kısa sürede {SITE_PHONE_DISPLAY} numaradan size dönüş yapacağız.
                </p>
                <p className="text-xs text-gray-400 mb-5">
                  İlkadım/Samsun şubemizden randevunuz onaylanacaktır.
                </p>
                <FormWhatsAppButton formType="landing" data={formData} className="w-full sm:w-auto" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-form="landing" className="space-y-4">
                <div className="text-center mb-5">
                  <h3 className="font-serif text-xl font-bold text-brand-dark mb-1">
                    Ücretsiz Randevu Al
                  </h3>
                  <p className="text-sm text-gray-500">
                    Formu doldurun, en kısa sürede size dönüş yapalım.
                  </p>
                </div>

                <div>
                  <label htmlFor="land-name" className="block text-sm font-medium text-brand-dark mb-1.5">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="land-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="land-phone" className="block text-sm font-medium text-brand-dark mb-1.5">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="land-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                    placeholder="0 (5xx) xxx xx xx"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="land-email" className="block text-sm font-medium text-brand-dark mb-1.5">
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="land-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="land-age" className="block text-sm font-medium text-brand-dark mb-1.5">
                      Yaş
                    </label>
                    <input
                      type="number"
                      id="land-age"
                      name="age"
                      min="18"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                      placeholder="örn: 65"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !consent}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-6 py-4 rounded-full hover:bg-[#008f7f] transition-all hover:scale-[1.02] disabled:opacity-60 whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <i className="ri-calendar-check-line" />
                      <span>Ücretsiz Randevu Oluştur</span>
                    </>
                  )}
                </button>
                <label className="flex items-start gap-2 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5"
                  />
                  <span>
                    KVKK kapsamında bilgilerimin randevu amacıyla işlenmesini onaylıyorum.
                  </span>
                </label>

                <p className="text-xs text-gray-400 text-center flex items-start gap-1.5">
                  <i className="ri-lock-line mt-0.5 shrink-0" />
                  Bilgileriniz güvende ve üçüncü taraflarla paylaşılmaz. Sadece randevu onayı için kullanılır.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}