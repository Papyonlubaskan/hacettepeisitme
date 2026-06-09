import { Link } from 'react-router-dom';
import { serviceJsonLd } from '@/lib/schema';

export default function IsitmeCihaziFiyatlariPage() {
  const jsonLd = serviceJsonLd(
    'İşitme Cihazı Fiyatları Samsun',
    'Phonak, Siemens ve Oticon işitme cihazı fiyat danışmanlığı ve SGK bilgilendirmesi.',
    '/isitme-cihazi-fiyatlari',
  );

  return (
    <div className="pt-[72px] animate-fadeInUp bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">İşitme Cihazı Fiyatları Samsun</h1>
          <p className="text-white/80">
            Fiyatlar cihaz teknolojisi, kanal sayısı, bağlantı özellikleri ve kişiye özel
            ayarlara göre değişir. Ücretsiz test ile sizin için en uygun seçeneği belirliyoruz.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto space-y-4 text-gray-600">
          <p>Temel seviyeden premium seviyeye kadar farklı segmentlerde cihaz seçenekleri sunuyoruz.</p>
          <p>
            Randevu sonrasında odyolojik ölçümlere göre cihaz önerisi yapılır, bütçeye uygun alternatifler
            net olarak paylaşılır.
          </p>
          <Link to="/randevu" className="inline-flex mt-4 bg-brand-accent text-white px-6 py-3 rounded-full font-semibold">
            Ücretsiz Danışmanlık Al
          </Link>
        </div>
      </section>
    </div>
  );
}
