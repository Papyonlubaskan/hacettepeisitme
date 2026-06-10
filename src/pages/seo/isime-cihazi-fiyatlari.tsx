import { Link } from 'react-router-dom';
import { serviceJsonLd } from '@/lib/schema';

const PRICE_LINES = [
  {
    name: 'Vista',
    note: 'Premium şarjlı RIC ve güçlü BTE modelleri. Teknoloji seviyesi ve kanal sayısına göre değişir.',
  },
  {
    name: 'A&M',
    note: 'Kişisel ses dengeleme ve mobil kontrol sunan orta–üst segment modeller.',
  },
  {
    name: 'Nitro',
    note: 'Gelişmiş ses işleme ve özel kalıp seçenekleri. RIC ve BTE formları mevcuttur.',
  },
  {
    name: 'Pediatrik Grup',
    note: 'Çocuklara özel dayanıklı modeller. SGK destek süreçlerinde danışmanlık verilir.',
  },
];

export default function IsitmeCihaziFiyatlariPage() {
  const jsonLd = serviceJsonLd(
    'İşitme Cihazı Fiyatları Samsun',
    'Vista, A&M, Nitro ve Pediatrik Grup işitme cihazı fiyat danışmanlığı ve SGK bilgilendirmesi.',
    '/isitme-cihazi-fiyatlari',
  );

  return (
    <div className="pt-[72px] animate-fadeInUp bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="py-16 md:py-24 bg-brand-dark text-white">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">İşitme Cihazı Fiyatları Samsun</h1>
          <p className="text-white/80">
            Fiyatlar cihaz teknolojisi, kanal sayısı, bağlantı özellikleri ve kişiye özel ayarlara göre değişir.
            Ücretsiz test ile sizin için en uygun seçeneği belirliyoruz.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto space-y-8">
          <p className="text-gray-600">
            Web sitemizde sabit fiyat listesi yayınlamıyoruz; her danışanın işitme profili farklıdır. Randevu sonrası
            odyolojik ölçümlere göre Vista, A&M, Nitro veya Pediatrik Grup içinden bütçenize uygun alternatifler net
            olarak paylaşılır.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRICE_LINES.map((line) => (
              <div key={line.name} className="bg-brand-cream rounded-2xl p-6">
                <h2 className="font-bold text-brand-dark mb-2">{line.name}</h2>
                <p className="text-sm text-gray-600">{line.note}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            SGK destekli cihazlarda ödeme tutarları yıllık güncellenir. Güncel bilgi için merkezimizi arayabilir veya
            randevu oluşturabilirsiniz.
          </p>
          <Link to="/randevu" className="inline-flex mt-2 bg-brand-accent text-white px-6 py-3 rounded-full font-semibold">
            Ücretsiz Danışmanlık Al
          </Link>
        </div>
      </section>
    </div>
  );
}
