import { Link } from 'react-router-dom';
import { serviceJsonLd } from '@/lib/schema';

export default function SamsunIsitmeTestiPage() {
  const jsonLd = serviceJsonLd(
    'Samsun İşitme Testi',
    'Samsun İlkadım merkezimizde ücretsiz odyometri ve işitme testi hizmeti.',
    '/samsun-isitme-testi',
  );

  return (
    <div className="pt-[72px] animate-fadeInUp bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Samsun İşitme Testi</h1>
          <p className="text-white/80">
            Uzman odyometristler tarafından uygulanan kapsamlı işitme testi ile işitme profiliniz
            detaylı şekilde analiz edilir.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto space-y-4 text-gray-600">
          <p>Test süreci ortalama 30-45 dakika sürer ve tamamen ücretsizdir.</p>
          <p>Sonuç raporu ile birlikte uygun cihaz ve takip planı aynı gün sunulur.</p>
          <Link to="/randevu" className="inline-flex mt-4 bg-brand-accent text-white px-6 py-3 rounded-full font-semibold">
            İşitme Testi Randevusu Al
          </Link>
        </div>
      </section>
    </div>
  );
}
