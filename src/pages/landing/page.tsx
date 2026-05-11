import { useEffect } from 'react';
import { trackPageView, trackCTAClick } from '@/lib/tracking';
import HeroFormSection from './components/HeroFormSection';
import GoogleReviewsSection from '@/components/feature/GoogleReviewsSection';
import { SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '@/lib/siteContact';

export default function LandingPage() {
  useEffect(() => {
    trackPageView('Ücretsiz İşitme Testi | Hacettepe İşitme Cihazları Samsun', '/ucretsiz-isitme-testi');
  }, []);

  return (
    <div className="pt-[72px] animate-fadeInUp">
      <HeroFormSection />

      {/* Benefits */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-3">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Samsun İlkadım&apos;da işitme sağlığı alanında 15 yıllık deneyim
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ri-user-star-line', title: 'Uzman Odyometrist', desc: 'Sertifikalı uzman kadro ile kişiselleştirilmiş çözümler.' },
              { icon: 'ri-shield-check-line', title: 'SGK Anlaşmalı', desc: 'Tüm cihazlarda SGK ve özel sigorta desteği.' },
              { icon: 'ri-time-line', title: 'Aynı Gün Randevu', desc: 'İşitme testi için uygun saat dilimleri mevcuttur.' },
              { icon: 'ri-heart-pulse-line', title: 'Ömür Boyu Destek', desc: 'Satış sonrası bakım, onarım ve ayarlama hizmetleri.' },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-accent/10 mb-4">
                  <i className={`${b.icon} text-xl text-brand-accent`} />
                </div>
                <h3 className="text-base font-bold text-brand-dark mb-2">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-3">
              Süreç Nasıl İşler?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Ücretsiz işitme testinizden cihaz teslimine kadar 4 basit adım
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Randevu Oluşturun', desc: `Formu doldurun veya ${SITE_PHONE_DISPLAY} numarasını arayın.` },
              { step: '02', title: 'Test ve Analiz', desc: 'Odyometri uzmanımız kapsamlı testi yapar.' },
              { step: '03', title: 'Cihaz Seçimi', desc: 'Bütçenize ve ihtiyacınıza en uygun cihaz belirlenir.' },
              { step: '04', title: 'Uyarlama & Teslim', desc: 'Cihazınız kişiselleştirilir ve aynı gün teslim edilir.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-accent text-white font-bold text-lg mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-base font-bold text-brand-dark mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviewsSection subtitle="Google Haritalar üzerindeki güncel işletme yorumları" />

      {/* Trust Badges */}
      <section className="py-16 bg-brand-dark">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'ri-shield-check-line', label: 'SGK Anlaşmalı' },
              { icon: 'ri-award-line', label: '15+ Yıl Deneyim' },
              { icon: 'ri-customer-service-2-line', label: '7/24 Destek' },
              { icon: 'ri-repeat-line', label: '30 Gün İade' },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2">
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10">
                  <i className={`${badge.icon} text-2xl text-brand-accent`} />
                </span>
                <p className="text-sm font-semibold text-white">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Ücretsiz Randevunuzu Oluşturun
          </h2>
          <p className="text-gray-500 mb-2">
            Formu doldurun veya doğrudan arayın:
          </p>
          <p className="text-2xl font-bold text-brand-dark mb-8">
            <a href={`tel:${SITE_PHONE_E164}`} className="hover:text-brand-accent transition-colors" onClick={() => trackCTAClick('Telefon Arama', 'landing_final_cta')}>
              {SITE_PHONE_DISPLAY}
            </a>
          </p>
          <a
            href="#form"
            className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-[#008f7f] transition-all hover:scale-105 whitespace-nowrap"
            onClick={() => trackCTAClick('Yukarı Dön Form', 'landing_final_cta', '#form')}
          >
            <span>Randevu Formuna Dön</span>
            <i className="ri-arrow-up-line" />
          </a>
        </div>
      </section>
    </div>
  );
}