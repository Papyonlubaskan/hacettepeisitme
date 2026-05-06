import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackFormSubmit, trackPhoneClick } from '@/lib/tracking';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    fetch('/api/form/appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as never).toString(),
    })
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        trackFormSubmit('appointment', 'success', 'appointment-form', {
          service: formData.service,
          date: formData.date,
        });
      })
      .catch(() => {
        setSubmitted(false);
        setLoading(false);
        trackFormSubmit('appointment', 'error', 'appointment-form', {
          service: formData.service,
          date: formData.date,
        });
      });
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ];

  return (
    <div className="pt-[72px] animate-fadeInUp">
      {/* Hero Banner */}
      <section className="relative py-16 md:py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/local-images/readdy-appointment-app2024v2g.webp"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Randevu Al
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Ücretsiz işitme testi ve danışmanlık için randevunuzu oluşturun.
          </p>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-brand-cream py-6">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            <a href="tel:+905380260564" className="flex items-center gap-3 text-brand-dark hover:text-brand-accent transition-colors" onClick={() => trackPhoneClick('+905380260564')}>
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10">
                <i className="ri-phone-line text-brand-accent" />
              </span>
              <div>
                <p className="text-xs text-gray-500">Telefon</p>
                <p className="text-sm font-semibold">0 (538) 026 05 64</p>
                <p className="text-sm font-semibold text-gray-400">0 (544) 236 83 36</p>
              </div>
            </a>
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <div className="flex items-center gap-3 text-brand-dark">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10">
                <i className="ri-time-line text-brand-accent" />
              </span>
              <div>
                <p className="text-xs text-gray-500">Çalışma Saatleri</p>
                <p className="text-sm font-semibold">Pzt-Cmt 09:00-18:00</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-gray-200" />
            <div className="flex items-center gap-3 text-brand-dark">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10">
                <i className="ri-map-pin-line text-brand-accent" />
              </span>
              <div>
                <p className="text-xs text-gray-500">Adres</p>
                <p className="text-sm font-semibold">İlkadım/Samsun</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="bg-brand-cream rounded-2xl p-10 text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-accent/10 mx-auto mb-6">
                  <i className="ri-checkbox-circle-line text-3xl text-brand-accent" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">
                  Randevu Talebiniz Alındı!
                </h2>
                <p className="text-gray-500 mb-6">
                  En kısa sürede size dönüş yapacağız. Teşekkür ederiz.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-[#008f7f] transition-all whitespace-nowrap"
                >
                  <i className="ri-home-line" />
                  <span>Ana Sayfaya Dön</span>
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-form="appointment"
                className="bg-brand-cream rounded-2xl p-8 md:p-10 space-y-5"
              >
                <div className="text-center mb-8">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-2">
                    Randevu Formu
                  </h2>
                  <p className="text-sm text-gray-500">
                    Lütfen bilgilerinizi doldurun, size en kısa sürede ulaşalım.
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
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-brand-dark mb-2">
                      Randevu Tarihi *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-brand-dark mb-2">
                      Randevu Saati *
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                    >
                      <option value="">Saat seçin</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-brand-dark mb-2">
                    Hizmet Türü *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent"
                  >
                    <option value="">Hizmet seçin</option>
                    <option value="test">Ücretsiz İşitme Testi</option>
                    <option value="consultation">Danışmanlık ve Cihaz Seçimi</option>
                    <option value="fitting">Cihaz Uyarlama</option>
                    <option value="maintenance">Bakım ve Onarım</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-2">
                    Ek Notlar
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={500}
                    rows={4}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent resize-none"
                    placeholder="Varsa eklemek istediğiniz notlar..."
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
                      <i className="ri-calendar-check-line" />
                      <span>Randevu Oluştur</span>
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
                    KVKK metnini okudum, bilgilerimin randevu geri dönüşü için kullanılmasını onaylıyorum.
                  </span>
                </label>

                <p className="text-xs text-gray-400 text-center">
                  Randevu talebinizi göndererek iletişim bilgilerinizin kullanılmasını onaylamış olursunuz.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
