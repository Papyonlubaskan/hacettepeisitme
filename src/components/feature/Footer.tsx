import { Link } from 'react-router-dom';
import { useState } from 'react';
import { trackFormSubmit, trackCTAClick, trackPhoneClick } from '@/lib/tracking';
import { triggerContactFallback } from '@/lib/formFallback';
import AddressLink from '@/components/feature/AddressLink';
import { SITE_PHONE_DISPLAY, SITE_PHONE_E164, SITE_PHONE_WA } from '@/lib/siteContact';

const quickLinks = [
  { label: 'Ana Sayfa', to: '/' },
  { label: 'Hakkımızda', to: '/hakkimizda' },
  { label: 'Randevu Oluştur', to: '/randevu' },
  { label: 'İletişim', to: '/iletisim' },
  { label: 'Online İşitme Testi', to: '/online-isitme-testi' },
  { label: 'İşitme Cihazları', to: '/isitme-cihazlari' },
  { label: 'Marka Katalogları', to: '/katalog' },
  { label: 'İşitme Cihazı Fiyatları', to: '/isitme-cihazi-fiyatlari' },
  { label: 'Samsun İşitme Cihazı', to: '/samsun-isitme-cihazi' },
  { label: 'Samsun İşitme Testi', to: '/samsun-isitme-testi' },
  { label: 'SGK Ödeme Tutarları', to: '/sgk-odeme-tutarlari' },
];

const serviceLinks = [
  { label: 'Ücretsiz İşitme Testi', to: '/ucretsiz-isitme-testi' },
  { label: 'Online İşitme Testi', to: '/online-isitme-testi' },
  { label: 'Cihaz Satışı', to: '/isitme-cihazlari' },
  { label: 'Marka Katalogları', to: '/katalog' },
  { label: 'Cihaz Uyarlama', to: '/randevu' },
  { label: 'Teknik Servis', to: '/iletisim' },
  { label: 'Danışmanlık', to: '/randevu' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !newsletterConsent) return;
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    fetch('/api/form/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as never).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('NEWSLETTER_FORM_FAILED');
        }
        setSubmitted(true);
        setEmail('');
        trackFormSubmit('newsletter', 'success', 'footer-newsletter', { email: email.trim() });
      })
      .catch(() => {
        trackFormSubmit('newsletter', 'error', 'footer-newsletter', { email: email.trim() });
        triggerContactFallback('abone ol');
      });
  };

  return (
    <footer className="bg-brand-dark text-white">
      <div>
        <div className="w-full px-6 lg:px-12 pt-20 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src="/local-images/brand-logo-footer.webp"
                    alt="Hacettepe İşitme"
                    className="h-11 w-auto"
                  />
                  <div>
                    <p className="text-lg font-semibold">Hacettepe İşitme</p>
                    <p className="text-xs text-brand-warm">Samsun&apos;un Güvenilir İşitme Merkezi</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-sm">
                  15 yıllık deneyim ile Samsun&apos;da işitme sağlığı alanında lider çözüm ortağınız. SGK anlaşmalı, uzman kadro.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/hacettepeisitmecihazlari55?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-accent transition-colors"
                    aria-label="Instagram"
                    onClick={() => trackCTAClick('Instagram', 'footer', 'https://www.instagram.com/hacettepeisitmecihazlari55')}
                  >
                    <i className="ri-instagram-line text-lg" />
                  </a>
                  <a
                    href={`https://wa.me/${SITE_PHONE_WA}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-green-500 transition-colors"
                    aria-label="WhatsApp"
                    onClick={() => trackCTAClick('WhatsApp', 'footer', `https://wa.me/${SITE_PHONE_WA}`)}
                  >
                    <i className="ri-whatsapp-line text-lg" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h4 className="font-serif text-base font-semibold mb-5 text-brand-warm">
                  Hizmetler
                </h4>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2"
                        onClick={() => trackCTAClick(link.label, 'footer_services', link.to)}
                      >
                        <i className="ri-arrow-right-s-line text-brand-accent text-xs opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h4 className="font-serif text-base font-semibold mb-5 text-brand-warm">
                  Hızlı Erişim
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                        onClick={() => trackCTAClick(link.label, 'footer_quicklinks', link.to)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4">
                <h4 className="font-serif text-base font-semibold mb-5 text-brand-warm">
                  İletişim
                </h4>
                <div className="space-y-4">
                  <a
                    href={`tel:${SITE_PHONE_E164}`}
                    className="flex items-start gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
                    onClick={() => trackPhoneClick(SITE_PHONE_E164)}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 group-hover:bg-brand-accent/20 transition-colors shrink-0 mt-0.5">
                      <i className="ri-phone-line text-brand-accent text-sm" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-400 mb-0.5">Telefon</span>
                      {SITE_PHONE_DISPLAY}
                    </span>
                  </a>
                  <div className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 shrink-0 mt-0.5">
                      <i className="ri-map-pin-line text-brand-accent text-sm" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-400 mb-0.5">Adres</span>
                      <AddressLink variant="multiline" className="text-gray-300 hover:text-brand-accent" />
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 shrink-0 mt-0.5">
                      <i className="ri-time-line text-brand-accent text-sm" />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-400 mb-0.5">Çalışma Saatleri</span>
                      Pzt-Cmt 09:00 - 18:00
                      <br />
                      <span className="text-gray-500">Pazar: Kapalı</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="max-w-2xl mx-auto text-center">
                <h4 className="font-serif text-lg font-semibold mb-2 text-brand-warm">
                  Kampanyalardan Haberdar Olun
                </h4>
                <p className="text-sm text-gray-300 mb-5">
                  İndirim, kampanyalar ve işitme sağlığı ipuçları için e-bültenimize abone olun.
                </p>
                {submitted ? (
                  <div className="inline-flex items-center gap-2 text-sm text-brand-accent font-medium bg-brand-accent/10 px-5 py-3 rounded-full">
                    <i className="ri-checkbox-circle-line" />
                    Aboneliğiniz tamamlandı!
                  </div>
                ) : (
                  <form
                    onSubmit={handleNewsletter}
                    data-form="newsletter"
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-posta adresiniz"
                      required
                      className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!newsletterConsent}
                      className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-[#008f7f] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 whitespace-nowrap"
                    >
                      <span>Abone Ol</span>
                      <i className="ri-arrow-right-line" />
                    </button>
                  </form>
                )}
                {!submitted && (
                  <label className="mt-3 inline-flex items-start gap-2 text-xs text-gray-400 text-left">
                    <input
                      type="checkbox"
                      checked={newsletterConsent}
                      onChange={(e) => setNewsletterConsent(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span>E-bülten için e-posta bilgilerimin kullanılmasını onaylıyorum.</span>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="w-full px-6 lg:px-12 py-6">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
                <Link to="/gizlilik-politikasi" className="hover:text-brand-accent transition-colors">
                  Gizlilik Politikası
                </Link>
                <Link to="/kullanim-kosullari" className="hover:text-brand-accent transition-colors">
                  Kullanım Koşulları
                </Link>
                <Link to="/kvkk-aydinlatma-metni" className="hover:text-brand-accent transition-colors">
                  KVKK Aydınlatma Metni
                </Link>
              </div>
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-gray-400">
                  © Hacettepe İşitme Cihazları {new Date().getFullYear()}. Tüm hakları saklıdır.
                </p>
                <a
                  href="https://okandemir.org/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-xs text-gray-400 hover:text-brand-accent transition-colors"
                  onClick={() => trackCTAClick('OK Copyright', 'footer', 'https://okandemir.org/')}
                >
                  Designed by <strong className="font-semibold">O</strong> Copyright© Dijital Pazarlama & Yazılım
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}