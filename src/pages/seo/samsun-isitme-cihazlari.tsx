import { Link } from 'react-router-dom';
import AddressLink from '@/components/feature/AddressLink';
import PhoneCallButton from '@/components/feature/PhoneCallButton';
import PageHeroBanner from '@/components/feature/PageHeroBanner';
import { PAGE_IMAGES } from '@/lib/pageImages';
import { SAMSUN_CIHAZLARI_FAQ } from '@/lib/schema';
import { SITE_PHONE_DISPLAY } from '@/lib/siteContact';

export default function SamsunIsitmeCihazlariPage() {
  return (
    <div className="pt-[72px] animate-fadeInUp bg-white">
      <PageHeroBanner
        title="Samsun İşitme Cihazları"
        subtitle="Samsun'da işitme cihazı arayanlar için İlkadım Tepecik merkezimizde ücretsiz test, Vista, A&M ve Nitro serileri, 30 gün deneme ve SGK danışmanlığı."
        imageSrc={PAGE_IMAGES.samsunDevice}
        align="left"
      />

      <section className="py-12 md:py-16">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto space-y-6 text-gray-600 leading-relaxed">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
            Samsun&apos;da İşitme Cihazı — Hacettepe İşitme Merkezi
          </h2>
          <p>
            <strong>Samsun işitme cihazları</strong> konusunda 15 yılı aşkın deneyime sahip Hacettepe İşitme
            Cihazları, İlkadım Tepecik&apos;te danışanlarına ücretsiz odyometri, işitme kaybı değerlendirmesi ve
            kişiye özel cihaz önerileri sunar. Samsun&apos;da işitme cihazı almak isteyenler için Vista, A&amp;M,
            Nitro ve Pediatrik Grup markaları tek çatı altında mevcuttur.
          </p>
          <p>
            İşitme cihazı seçimi işitme kaybı tipine, yaşam tarzına ve bütçeye göre yapılmalıdır. Uzman ekibimiz
            kulak içi, kulak arkası ve şarjlı modeller arasından size en uygun Samsun işitme cihazını önerir; 30 gün
            deneme garantisi ile risksiz deneme imkânı sağlar.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark pt-4">
            Samsun İşitme Cihazları Markaları
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Link to="/katalog/vista" className="text-brand-accent hover:underline">
                Vista işitme cihazları
              </Link>{' '}
              — şarjlı ve Bluetooth destekli modeller
            </li>
            <li>
              <Link to="/katalog/a-m" className="text-brand-accent hover:underline">
                A&amp;M işitme cihazları
              </Link>{' '}
              — ekonomik ve güvenilir seriler
            </li>
            <li>
              <Link to="/katalog/nitro" className="text-brand-accent hover:underline">
                Nitro işitme cihazları
              </Link>{' '}
              — yüksek performanslı çözümler
            </li>
            <li>
              <Link to="/katalog/pediatrik" className="text-brand-accent hover:underline">
                Pediatrik Grup
              </Link>{' '}
              — çocuklara özel işitme cihazları
            </li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark pt-4">
            Hizmet Verdiğimiz Bölgeler
          </h2>
          <p>
            İlkadım, Atakum, Canik, Tekkeköy, Bafra ve Samsun genelinde Samsun işitme cihazları danışmanlığı ve
            ücretsiz işitme testi hizmeti sunuyoruz.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark pt-4">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-4">
            {SAMSUN_CIHAZLARI_FAQ.map((item) => (
              <div key={item.question} className="bg-brand-cream rounded-2xl p-5">
                <h3 className="font-bold text-brand-dark mb-2">{item.question}</h3>
                <p className="text-sm">{item.answer}</p>
              </div>
            ))}
          </div>

          <p>
            Adres: <AddressLink className="text-brand-accent hover:underline" /> — Telefon: {SITE_PHONE_DISPLAY}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            <Link
              to="/randevu"
              className="inline-flex justify-center bg-brand-accent text-white px-6 py-3 rounded-full font-semibold"
            >
              Ücretsiz Test Randevusu
            </Link>
            <PhoneCallButton
              label="Bizi Ara"
              trackingLabel="samsun_isitme_cihazlari_call"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-accent text-brand-accent px-6 py-3 rounded-full font-semibold hover:bg-brand-light"
            />
            <Link
              to="/isitme-cihazi-fiyatlari"
              className="inline-flex justify-center text-brand-accent font-semibold px-6 py-3"
            >
              Fiyat Bilgisi →
            </Link>
            <Link to="/samsun-isitme-cihazi" className="inline-flex justify-center text-gray-500 text-sm px-6 py-3">
              Tekil: Samsun işitme cihazı →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
