import { Link } from 'react-router-dom';
import AddressLink from '@/components/feature/AddressLink';
import { SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '@/lib/siteContact';

export default function LocalSeoSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto text-gray-600 leading-relaxed">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-4">
          Samsun&apos;da İşitme Cihazı ve Ücretsiz İşitme Testi
        </h2>
        <p className="mb-4">
          <strong>Hacettepe İşitme Cihazları</strong>, Samsun İlkadım Tepecik&apos;te işitme sağlığı alanında 15 yılı
          aşkın deneyimle hizmet veren yerel bir işitme merkezidir. Ücretsiz işitme testi, odyometri değerlendirmesi,
          Phonak, Siemens ve Oticon marka cihaz satışı ile SGK süreç danışmanlığı tek çatı altında sunulur.
        </p>
        <p className="mb-6">
          Samsun ve çevre ilçelerden gelen danışanlarımız için aynı gün randevu, 30 gün deneme garantisi ve ömür boyu
          teknik destek sağlıyoruz. Merkez adresimiz: <AddressLink className="text-brand-accent hover:underline" />.
          Telefon: <a href={`tel:${SITE_PHONE_E164}`} className="text-brand-accent hover:underline">{SITE_PHONE_DISPLAY}</a>.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/samsun-isitme-cihazi" className="px-4 py-2 rounded-full bg-brand-cream text-brand-dark font-medium hover:bg-brand-light">
            Samsun İşitme Cihazı
          </Link>
          <Link to="/samsun-isitme-testi" className="px-4 py-2 rounded-full bg-brand-cream text-brand-dark font-medium hover:bg-brand-light">
            Samsun İşitme Testi
          </Link>
          <Link to="/ucretsiz-isitme-testi" className="px-4 py-2 rounded-full bg-brand-cream text-brand-dark font-medium hover:bg-brand-light">
            Ücretsiz İşitme Testi
          </Link>
          <Link to="/isitme-cihazi-fiyatlari" className="px-4 py-2 rounded-full bg-brand-cream text-brand-dark font-medium hover:bg-brand-light">
            İşitme Cihazı Fiyatları
          </Link>
        </div>
      </div>
    </section>
  );
}
