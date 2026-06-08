import { useState } from 'react';
import AddressLink from '@/components/feature/AddressLink';
import { trackCTAClick, trackFormSubmit, trackPhoneClick } from '@/lib/tracking';
import FormWhatsAppButton from '@/components/feature/FormWhatsAppButton';
import { triggerContactFallback } from '@/lib/formFallback';
import { offerFormWhatsAppHandoff } from '@/lib/formWhatsApp';
import { SITE_MAP_EMBED_URL, SITE_MAP_URL, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '@/lib/siteContact';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    fetch('/api/form/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as never).toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('CONTACT_FORM_FAILED');
        }
        setSubmitted(true);
        setLoading(false);
        trackFormSubmit('contact', 'success', 'contact-form', {
          subject: formData.subject,
        });
        offerFormWhatsAppHandoff('contact', formData);
      })
      .catch(() => {
        setSubmitted(false);
        setLoading(false);
        trackFormSubmit('contact', 'error', 'contact-form', {
          subject: formData.subject,
        });
        triggerContactFallback('iletişim', 'contact', formData);
      });
  };

  return (
    <div className="pt-[72px] animate-fadeInUp">
      {/* Hero Banner */}
      <section className="relative py-16 md:py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/local-images/readdy-contact-contact2024v2h.webp"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            İletişim
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Her türlü soru ve talebiniz için bize ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-brand-cream">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-accent/10 mx-auto mb-4">
                <i className="ri-phone-line text-xl text-brand-accent" />
              </div>
              <h3 className="text-sm font-bold text-brand-dark mb-1">Telefon</h3>
              <a href={`tel:${SITE_PHONE_E164}`} className="text-sm text-gray-500 hover:text-brand-accent transition-colors" onClick={() => trackPhoneClick(SITE_PHONE_E164)}>
                {SITE_PHONE_DISPLAY}
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-accent/10 mx-auto mb-4">
                <i className="ri-mail-line text-xl text-brand-accent" />
              </div>
              <h3 className="text-sm font-bold text-brand-dark mb-1">E-posta</h3>
              <a href="mailto:hacettepeisitme55@gmail.com" className="text-sm text-gray-500 hover:text-brand-accent transition-colors">
                hacettepeisitme55@gmail.com
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-accent/10 mx-auto mb-4">
                <i className="ri-map-pin-line text-xl text-brand-accent" />
              </div>
              <h3 className="text-sm font-bold text-brand-dark mb-1">Adres</h3>
              <AddressLink className="text-sm text-gray-500 text-pretty" />
            </div>
          </div>
        </div>
      </section>

      {/* Map + Form Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-6">
                Bizi Ziyaret Edin
              </h2>
              <p className="text-gray-500 mb-6">
                Kliniğimiz İlkadım Tepecik&apos;te, Eğitim Araştırma Hastanesi karşısı Şok Market üstündedir; D010 güzergâhına yakındır.
                Aşağıdaki haritadan konumumuzu görebilir ve yol tarifi alabilirsiniz.
              </p>
              <a
                href={SITE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-[#008f7f] transition-colors"
                onClick={() => trackCTAClick('Konum / Harita', 'contact_map_cta', SITE_MAP_URL)}
              >
                <i className="ri-navigation-line" aria-hidden />
                Google Haritalar&apos;da aç / yol tarifi al
              </a>
              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <iframe
                  src={SITE_MAP_EMBED_URL}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hacettepe İşitme Konum"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-brand-cream rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Çalışma Saatleri</p>
                  <p className="text-sm font-semibold text-brand-dark">Pzt-Cmt: 09:00 - 18:00</p>
                  <p className="text-sm text-gray-500">Pazar: Kapalı</p>
                </div>
                <div className="bg-brand-cream rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">WhatsApp Destek</p>
                  <p className="text-sm font-semibold text-brand-dark">{SITE_PHONE_DISPLAY}</p>
                  <p className="text-sm text-gray-500">7/24 Mesaj</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-brand-cream rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-accent/10 mx-auto mb-6">
                    <i className="ri-checkbox-circle-line text-3xl text-brand-accent" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">
                    Mesajınız Gönderildi!
                  </h2>
                  <p className="text-gray-500 mb-6">
                    En kısa sürede size dönüş yapacağız. İsterseniz formu WhatsApp ile de iletebilirsiniz.
                  </p>
                  <FormWhatsAppButton formType="contact" data={formData} />
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  data-form="contact"
                  className="bg-brand-cream rounded-2xl p-8 md:p-10 space-y-5"
                >
                  <div className="text-center mb-6">
                    <h2 className="font-serif text-2xl font-bold text-brand-dark mb-2">
                      Bize Ulaşın
                    </h2>
                    <p className="text-sm text-gray-500">
                      Formu doldurun, ekibimiz size en kısa sürede dönüş yapsın.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-brand-dark mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                        placeholder="0 (5xx) xxx xx xx"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-brand-dark mb-2">
                      Konu *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                    >
                      <option value="">Konu seçin</option>
                      <option value="randevu">Randevu Talebi</option>
                      <option value="urun">Ürün Bilgisi</option>
                      <option value="fiyat">Fiyat Bilgisi</option>
                      <option value="destek">Teknik Destek</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={5}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      {formData.message.length}/500
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !consent}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-[#008f7f] transition-all hover:scale-[1.02] disabled:opacity-60 whitespace-nowrap"
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line" />
                        <span>Mesaj Gönder</span>
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
                      KVKK ve gizlilik metinlerini okudum, ilettiğim bilgilerin iletişim amacıyla
                      kullanılmasını kabul ediyorum.
                    </span>
                  </label>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
