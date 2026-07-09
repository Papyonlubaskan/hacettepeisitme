import { Link } from 'react-router-dom';
import AddressLink from '@/components/feature/AddressLink';
import PhoneCallButton from '@/components/feature/PhoneCallButton';
import PageHeroBanner from '@/components/feature/PageHeroBanner';
import { PAGE_IMAGES } from '@/lib/pageImages';
import { faqPageJsonLd, serviceJsonLd } from '@/lib/schema';
import { SITE_PHONE_DISPLAY } from '@/lib/siteContact';

const PAGE_FAQ = [
  {
    question: 'Samsun’da işitme cihazı nereden alınır?',
    answer:
      'Hacettepe İşitme Cihazları İlkadım Tepecik merkezinde Vista, A&M ve Nitro serileri satışı, ücretsiz test ve SGK danışmanlığı sunmaktadır.',
  },
  {
    question: 'Samsun’da ücretsiz işitme testi var mı?',
    answer:
      'Evet. Merkezimizde ilk işitme testi ve danışmanlık ücretsizdir. Randevu için web sitemizden form bırakabilir veya telefonla arayabilirsiniz.',
  },
  {
    question: 'SGK işitme cihazı Samsun’da nasıl alınır?',
    answer:
      'SGK raporu ve gerekli belgelerle başvuru yapılır. Merkezimizde SGK ödeme tutarları ve süreç hakkında ücretsiz danışmanlık verilmektedir.',
  },
];

export default function SamsunIsitmeCihaziPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceJsonLd(
        'Samsun İşitme Cihazı Satışı',
        'Samsun İlkadım merkezinde işitme cihazı satışı, ücretsiz odyometri, cihaz uyarlama ve SGK danışmanlığı.',
        '/samsun-isitme-cihazi',
      ),
      faqPageJsonLd(PAGE_FAQ),
    ],
  };

  return (
    <div className="pt-[72px] animate-fadeInUp bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeroBanner
        title="Samsun İşitme Cihazı"
        subtitle="İlkadım Tepecik'te 15 yıllık deneyimle işitme cihazı satışı, ücretsiz işitme testi ve kişiye özel cihaz uyarlama. Vista, A&M ve Nitro serileri ile uzman danışmanlık."
        imageSrc={PAGE_IMAGES.samsunDevice}
        align="left"
      />

      <section className="py-12 md:py-16">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto space-y-6 text-gray-600 leading-relaxed">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
            Samsun&apos;da Güvenilir İşitme Merkezi
          </h2>
          <p>
            Hacettepe İşitme Cihazları, Samsun ve çevre ilçelerden gelen danışanlara ücretsiz odyometri testi,
            işitme kaybı değerlendirmesi ve bütçeye uygun cihaz önerileri sunar. Eğitim Araştırma Hastanesi karşısı
            Tepecik&apos;teki merkezimizde aynı gün randevu imkânı bulunmaktadır.
          </p>
          <p>
            İşitme cihazı seçimi yalnızca fiyata göre değil; işitme kaybı tipi, yaşam tarzı ve teknoloji ihtiyacına
            göre yapılmalıdır. Uzman ekibimiz test sonuçlarınıza göre kulak içi, kulak arkası ve şarjlı modeller
            arasından size en uygun çözümü önerir.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark pt-4">
            Hizmet Verdiğimiz Bölgeler
          </h2>
          <p>İlkadım, Atakum, Canik, Tekkeköy ve Samsun genelinde danışanlarımıza hizmet veriyoruz.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ücretsiz işitme testi ve odyometri</li>
            <li>Vista, A&M, Nitro ve Pediatrik Grup işitme cihazı satışı</li>
            <li>SGK işitme cihazı danışmanlığı</li>
            <li>30 gün deneme ve ömür boyu teknik destek</li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark pt-4">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {PAGE_FAQ.map((item) => (
              <div key={item.question} className="bg-brand-cream rounded-2xl p-5">
                <h3 className="font-bold text-brand-dark mb-2">{item.question}</h3>
                <p className="text-sm">{item.answer}</p>
              </div>
            ))}
          </div>

          <p>
            Adres: <AddressLink className="text-brand-accent hover:underline" /> — Telefon: {SITE_PHONE_DISPLAY}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/randevu" className="inline-flex justify-center bg-brand-accent text-white px-6 py-3 rounded-full font-semibold">
              Ücretsiz Test Randevusu
            </Link>
            <PhoneCallButton
              label="Bizi Ara"
              trackingLabel="samsun_isitme_cihazi_call"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-accent text-brand-accent px-6 py-3 rounded-full font-semibold hover:bg-brand-light"
            />
            <Link to="/isitme-cihazi-fiyatlari" className="inline-flex justify-center text-brand-accent font-semibold px-6 py-3">
              Fiyat Bilgisi →
            </Link>
            <Link to="/samsun-isitme-cihazlari" className="inline-flex justify-center text-gray-500 text-sm px-6 py-3">
              Samsun işitme cihazları →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
