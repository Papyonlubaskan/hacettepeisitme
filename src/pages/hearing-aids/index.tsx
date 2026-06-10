import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddressLink from '@/components/feature/AddressLink';
import PhoneCallButton from '@/components/feature/PhoneCallButton';
import ShowcaseVideo from '@/components/hearing-aids/ShowcaseVideo';
import { FIT_VIDEOS, SHOWCASE_SERIES } from '@/mocks/hearingAidShowcase';
import { serviceJsonLd } from '@/lib/schema';
import { SITE_PHONE_DISPLAY } from '@/lib/siteContact';
import { trackCTAClick } from '@/lib/tracking';

function FeatureLine({ highlight, text }: { highlight?: string; text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm md:text-base text-gray-700">
      <i className="ri-check-line text-brand-accent mt-1 shrink-0" />
      <span>
        {highlight ? <strong className="text-brand-dark">{highlight}</strong> : null}
        {text}
      </span>
    </li>
  );
}

export default function HearingAidsIndexPage() {
  const [activeNav, setActiveNav] = useState(SHOWCASE_SERIES[0].id);
  const path = '/isitme-cihazlari';
  const jsonLd = serviceJsonLd(
    'İşitme Cihazları Satışı',
    'Samsun Hacettepe İşitme Merkezi’nde Phonak, Signia, Oticon, ReSound işitme cihazı satışı, video tanıtım ve deneme.',
    path,
  );

  const scrollToSeries = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pt-[72px] animate-fadeInUp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero — referans düzen: koyu arka plan, logo, başlık, seri menüsü */}
      <section className="relative overflow-hidden bg-[#071525] text-white">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-brand-accent/30 blur-3xl" />
          <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 py-14 md:py-20">
          <div className="max-w-6xl mx-auto text-center">
            <img
              src="/local-images/brand-logo-navbar.webp"
              alt="Hacettepe İşitme Cihazları"
              className="h-12 md:h-14 mx-auto mb-8"
            />
            <p className="inline-block bg-brand-accent/20 text-brand-accent text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
              Hacettepe İşitme · Samsun
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 leading-tight">
              İşitme Cihazları
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-sm md:text-base">
              Phonak, Signia, Oticon ve ReSound dünya markalarını merkezimizde deneyin. Uzman odyolog eşliğinde
              ücretsiz test ve 30 gün deneme imkânı.
            </p>

            <div className="flex justify-center mb-10">
              <img
                src="/local-images/readdy-products-prod1opt.webp"
                alt="Premium işitme cihazı"
                className="h-28 md:h-40 object-contain drop-shadow-2xl"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {SHOWCASE_SERIES.map((series) => (
                <button
                  key={series.id}
                  type="button"
                  onClick={() => scrollToSeries(series.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeNav === series.id
                      ? 'bg-white text-brand-accent shadow-lg scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {series.badge ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-brand-accent font-serif italic whitespace-nowrap">
                      {series.badge}
                    </span>
                  ) : null}
                  {series.navLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seri bölümleri */}
      {SHOWCASE_SERIES.map((series, index) => {
        const isPediatric = series.id === 'pediatrik';
        const bgClass = index % 2 === 0 ? 'bg-gradient-to-br from-cyan-50 via-teal-50/80 to-white' : 'bg-white';

        return (
          <section key={series.id} id={series.id} className={`py-16 md:py-24 ${bgClass} scroll-mt-24`}>
            <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div>
                  <p className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">{series.brand}</p>
                  <h2 className="font-serif text-2xl md:text-4xl font-bold text-brand-dark mb-3 leading-snug">
                    {series.headline}
                  </h2>
                  {series.subline ? <p className="text-gray-600 mb-6">{series.subline}</p> : null}

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-brand-accent/30 text-brand-accent text-xs font-bold">
                      {series.seriesName}
                    </span>
                    {series.badges.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-dark/5 text-brand-dark text-xs font-semibold"
                      >
                        {b === 'Bluetooth' && <i className="ri-bluetooth-line text-brand-accent" />}
                        {b === 'Şarjlı' && <i className="ri-battery-2-charge-line text-brand-accent" />}
                        {b}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2 mb-8">
                    {series.features.map((f) => (
                      <FeatureLine key={f.text} highlight={f.highlight} text={f.text} />
                    ))}
                  </ul>

                  <p className="text-xs text-gray-400 mb-6">{series.origin}</p>

                  {series.warranty ? (
                    <p className="inline-flex items-center gap-2 bg-brand-dark text-white text-sm font-bold px-4 py-2 rounded-lg mb-6">
                      <i className="ri-shield-check-line text-brand-accent" />
                      {series.warranty}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-5">
                  {isPediatric ? (
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={series.image}
                        alt="Çocuk işitme cihazı uygulaması — Hacettepe İşitme Samsun"
                        className="w-full h-64 md:h-80 object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <img
                        src={series.image}
                        alt={`${series.brand} ${series.seriesName}`}
                        className="max-h-48 md:max-h-56 object-contain drop-shadow-lg"
                      />
                    </div>
                  )}
                  <ShowcaseVideo videoId={series.videoId} title={`${series.brand} ${series.seriesName} tanıtım`} />
                </div>
              </div>

              {/* Model tipleri */}
              <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {series.modelTypes.map((mt) => (
                  <div
                    key={mt.label}
                    className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 shadow-sm"
                  >
                    <img src={mt.image} alt={mt.label} className="w-20 h-20 object-contain shrink-0" loading="lazy" />
                    <div>
                      <p className="text-xs font-bold text-brand-accent uppercase tracking-wide">{mt.label}</p>
                      <p className="text-sm font-semibold text-brand-dark">{mt.sublabel}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ürün listesi */}
              <div className="mt-10">
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-4">
                  {series.brand} Modelleri
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {series.products.map((product) => (
                    <div
                      key={product.name}
                      className="bg-white/80 backdrop-blur rounded-xl border border-gray-100 p-5 hover:border-brand-accent/40 transition-colors"
                    >
                      <p className="font-bold text-brand-dark mb-1">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.specs}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/randevu"
                  className="inline-flex justify-center items-center gap-2 bg-brand-accent text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#008f7f] transition-all"
                  onClick={() => trackCTAClick(`${series.brand} Deneme`, 'showcase_series', '/randevu')}
                >
                  Deneme Randevusu Al
                  <i className="ri-arrow-right-line" />
                </Link>
                <Link
                  to={`/katalog/${series.catalogSlug}`}
                  className="inline-flex justify-center items-center gap-2 border-2 border-brand-accent text-brand-accent font-semibold px-8 py-3.5 rounded-full hover:bg-brand-light transition-all"
                >
                  {series.brand} Kataloğu
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* Kulağımda nasıl gözükür — video grid */}
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3">
            Cihazlar Kulağımda Nasıl Görünür?
          </h2>
          <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
            Kulak içi, kulak arkası ve şarjlı modellerin takım ve bakım videoları
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FIT_VIDEOS.map((fv) => (
              <div key={fv.title}>
                <p className="text-brand-accent text-xs font-bold uppercase mb-2">{fv.category}</p>
                <p className="text-white font-semibold mb-3 text-sm">{fv.title}</p>
                <ShowcaseVideo videoId={fv.videoId} title={fv.title} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teknik servis + iletişim */}
      <section className="py-16 md:py-20 bg-brand-cream">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-4">Teknik Servis Desteği</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              2 yıl cihaz garantisi ile birlikte periyodik bakım, kulak kalıbı yenileme ve yazılım güncellemesi
              hizmeti sunuyoruz. Phonak, Signia, Oticon ve ReSound dahil çok markalı servis desteği.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2"><i className="ri-tools-line text-brand-accent" /> Kulak kalıbı üretim ve onarım</li>
              <li className="flex items-center gap-2"><i className="ri-settings-3-line text-brand-accent" /> Uzaktan ve yüz yüze uyarlama</li>
              <li className="flex items-center gap-2"><i className="ri-home-heart-line text-brand-accent" /> Evde destek danışmanlığı</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold text-brand-dark text-lg mb-4">Hacettepe İşitme Merkezi</h3>
            <p className="text-sm text-gray-600 mb-2">
              <AddressLink className="text-brand-accent hover:underline" />
            </p>
            <p className="text-sm text-gray-600 mb-4">Telefon: {SITE_PHONE_DISPLAY}</p>
            <p className="text-xs text-gray-400 mb-6">Pzt–Cmt 09:00–18:00 · Pazar kapalı</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <PhoneCallButton
                label="Bizi Ara"
                trackingLabel="showcase_contact_call"
                className="inline-flex justify-center items-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3 rounded-full"
              />
              <Link to="/iletisim" className="inline-flex justify-center text-brand-accent font-semibold px-6 py-3">
                İletişim →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <p className="text-center text-xs text-gray-400 px-6 py-8 max-w-3xl mx-auto">
        * Özellikler modele göre değişebilir. Kesin bilgi ve fiyat için merkezimizde ücretsiz işitme testi sonrası
        uzman danışmanlığı alınız. Video içerikleri ilgili üretici kanallarından alınmıştır.
      </p>
    </div>
  );
}
