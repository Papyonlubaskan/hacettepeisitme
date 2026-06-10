import { Link } from 'react-router-dom';
import AddressLink from '@/components/feature/AddressLink';
import { SITE_MAP_URL, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '@/lib/siteContact';
import { SITE_CANONICAL_HOST, SITE_GOOGLE_MAPS_URL, SITE_NAME } from '@/lib/siteSeo';

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
          Vista, A&M ve Nitro serileri ile SGK süreç danışmanlığı tek çatı altında sunulur.
        </p>
        <p className="mb-6">
          Samsun ve çevre ilçelerden gelen danışanlarımız için aynı gün randevu, 30 gün deneme garantisi ve ömür boyu
          teknik destek sağlıyoruz. Resmi web sitemiz:{' '}
          <a href={`https://${SITE_CANONICAL_HOST}/`} className="text-brand-accent hover:underline">
            {SITE_CANONICAL_HOST}
          </a>
          . Merkez adresimiz: <AddressLink className="text-brand-accent hover:underline" />.
          Telefon: <a href={`tel:${SITE_PHONE_E164}`} className="text-brand-accent hover:underline">{SITE_PHONE_DISPLAY}</a>.
          {' '}Google İşletme profilimiz:{' '}
          <a href={SITE_GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">
            {SITE_NAME} Haritalar
          </a>
          {' '}·{' '}
          <a href={SITE_MAP_URL} target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:underline">
            Konum
          </a>
          .
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
