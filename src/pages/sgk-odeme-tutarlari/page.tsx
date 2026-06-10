import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trackCTAClick, trackPageView } from '@/lib/tracking';
import PageHeroBanner from '@/components/feature/PageHeroBanner';
import { PAGE_IMAGES } from '@/lib/pageImages';
import { SITE_PHONE_WA } from '@/lib/siteContact';

const sgkRows = [
  {
    segment: '18 Yaş ve Üzeri - Emekli',
    sgkDestegi: '5.087,04 TL',
    hastaKatki: 'Cihaz bedeline göre değişir',
    uygunluk: '18 yaş ve üzeri emekli birey',
  },
  {
    segment: '18 Yaş ve Üzeri - Çalışan',
    sgkDestegi: '4.069,63 TL',
    hastaKatki: 'Cihaz bedeline göre değişir',
    uygunluk: '18 yaş ve üzeri çalışan birey',
  },
  {
    segment: '13-18 Yaş - Veli Emekli',
    sgkDestegi: '7.630,56 TL',
    hastaKatki: 'Cihaz bedeline göre değişir',
    uygunluk: '13-18 yaş arası çocuk/gençler',
  },
  {
    segment: '13-18 Yaş - Veli Çalışan',
    sgkDestegi: '6.104,45 TL',
    hastaKatki: 'Cihaz bedeline göre değişir',
    uygunluk: '13-18 yaş arası çocuk/gençler',
  },
  {
    segment: '5-12 Yaş - Veli Emekli',
    sgkDestegi: '8.139,26 TL',
    hastaKatki: 'Cihaz bedeline göre değişir',
    uygunluk: '5-12 yaş arası çocuklar',
  },
  {
    segment: '5-12 Yaş - Veli Çalışan',
    sgkDestegi: '6.511,40 TL',
    hastaKatki: 'Cihaz bedeline göre değişir',
    uygunluk: '5-12 yaş arası çocuklar',
  },
  {
    segment: '0-4 Yaş - Veli Emekli',
    sgkDestegi: '9.156,60 TL',
    hastaKatki: 'Cihaz bedeline göre değişir',
    uygunluk: '0-4 yaş arası çocuklar',
  },
  {
    segment: '0-4 Yaş - Veli Çalışan',
    sgkDestegi: '7.325,33 TL',
    hastaKatki: 'Cihaz bedeline göre değişir',
    uygunluk: '0-4 yaş arası çocuklar',
  },
];

const neededDocs = [
  'Üniversite veya devlet hastanesinden KBB uzman hekim raporu',
  'Odyometri (işitme testi) sonuçları',
  'SGK provizyon ve reçete işlemleri',
  'Kimlik ve varsa emekli / çalışan bilgileri',
];

export default function SgkOdemeTutarlariPage() {
  useEffect(() => {
    trackPageView('SGK Ödeme Tutarları | Hacettepe İşitme Cihazları Samsun', '/sgk-odeme-tutarlari');
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SGK Ödeme Tutarları - Hacettepe İşitme',
    description: '17.01.2026 itibariyle işitme cihazı SGK ödeme tutarları ve şartları.',
  };

  return (
    <div className="pt-[72px] animate-fadeInUp">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeroBanner
        title="İşitme Cihazları İçin SGK Ödeme Tutarları ve Şartları (17.01.2026)"
        subtitle="2026 güncel SUT verilerine göre SGK destek tutarları, yaş grupları ve çalışma durumuna göre ödeme detayları."
        imageSrc={PAGE_IMAGES.sgk}
      >
        <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2">
          <span className="inline-flex items-center gap-1 bg-white/15 border border-white/25 rounded-full px-3 py-1 text-xs text-white">
            <i className="ri-time-line" />
            Son güncelleme: 17.01.2026
          </span>
          <span className="inline-flex items-center gap-1 bg-white/15 border border-white/25 rounded-full px-3 py-1 text-xs text-white">
            <i className="ri-file-list-3-line" />
            Kaynak: SUT
          </span>
        </div>
      </PageHeroBanner>

      <section className="py-14 md:py-20 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="bg-brand-cream rounded-2xl p-5 md:p-6 mb-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong className="text-brand-dark">17.01.2026 Bilgilendirmesi:</strong> Emeklilere işitme
                cihazı SGK ödemesi kulak başına 5.087,04 TL&apos;dir. Cihaz bedeli ne olursa olsun bu tutarda
                ödeme yapılır. Merkezimizde bu ödeme tutarı cihaz bedelinden düşülür.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                Emeklilerde SGK geri ödeme hakkı 5 yılda bir kezdir. İşitme cihazı ödemesi için
                500/1000/2000/4000 Hz frekans ortalamasının her bir kulakta en az 26 dB olması gerekir.
              </p>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="p-4 font-semibold text-brand-dark">Cihaz Segmenti</th>
                    <th className="p-4 font-semibold text-brand-dark">SGK Desteği</th>
                    <th className="p-4 font-semibold text-brand-dark">Hasta Katkı Durumu</th>
                    <th className="p-4 font-semibold text-brand-dark">Genel Uygunluk</th>
                  </tr>
                </thead>
                <tbody>
                  {sgkRows.map((row) => (
                    <tr key={row.segment} className="border-t border-gray-100">
                      <td className="p-4 text-gray-700 font-medium">{row.segment}</td>
                      <td className="p-4 text-brand-accent font-semibold">{row.sgkDestegi}</td>
                      <td className="p-4 text-gray-700">{row.hastaKatki}</td>
                      <td className="p-4 text-gray-500">{row.uygunluk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-brand-cream rounded-2xl p-6">
                <h2 className="font-serif text-2xl font-bold text-brand-dark mb-3">
                  SGK Ödeme Şartları ve Evraklar
                </h2>
                <ul className="space-y-2">
                  {neededDocs.map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-sm text-gray-600">
                      <i className="ri-check-line text-brand-accent mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-brand-dark rounded-2xl p-6 text-white">
                <h2 className="font-serif text-2xl font-bold mb-3">Net Tutar Hesaplama</h2>
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  Yaş, sigorta durumu ve odyolojik sonuçlara göre kesin ödeme tutarınızı 5-10 dakikada
                  netleştirelim.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/randevu"
                    className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-5 py-3 rounded-full"
                    onClick={() => trackCTAClick('SGK Hesaplama Randevu', 'sgk_page', '/randevu')}
                  >
                    <span>Randevu Al</span>
                    <i className="ri-arrow-right-line" />
                  </Link>
                  <a
                    href={`https://wa.me/${SITE_PHONE_WA}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-semibold px-5 py-3 rounded-full"
                    onClick={() => trackCTAClick('SGK WhatsApp', 'sgk_page', `https://wa.me/${SITE_PHONE_WA}`)}
                  >
                    <i className="ri-whatsapp-line" />
                    <span>WhatsApp Sor</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
