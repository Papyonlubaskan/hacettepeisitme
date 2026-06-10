import { Link } from 'react-router-dom';
import HearingAidShell from '@/components/hearing-aids/HearingAidShell';
import ProductCard from '@/components/hearing-aids/ProductCard';
import {
  BRAND_GROUPS,
  CATALOGS,
  DEVICE_CATEGORIES,
  FEATURED_PRODUCTS,
} from '@/mocks/hearingAids';
import { serviceJsonLd } from '@/lib/schema';

export default function HearingAidsIndexPage() {
  const path = '/isitme-cihazlari';
  const jsonLd = serviceJsonLd(
    'İşitme Cihazları Satışı',
    'Samsun Hacettepe İşitme Merkezi’nde Phonak, Signia, Oticon ve dünya markaları işitme cihazı satışı, uyarlama ve teknik servis.',
    path,
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HearingAidShell
        title="İşitme Cihazları"
        subtitle="Phonak, Signia (Siemens), Oticon ve dünya markalarının güncel modellerini merkezimizde deneyin. Uzman odyolog eşliğinde kişiye özel seçim."
      >
        <div className="space-y-16">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-6">Cihaz Tipleri</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEVICE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/isitme-cihazlari/${cat.slug}`}
                  className="group bg-brand-cream rounded-2xl p-5 hover:bg-brand-accent/10 transition-colors"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-accent/15 mb-3">
                    <i className={`${cat.icon} text-xl text-brand-accent`} />
                  </span>
                  <h3 className="font-bold text-brand-dark text-sm mb-2 group-hover:text-brand-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{cat.summary}</p>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-2">Marka Grupları</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Dünya çapında güvenilen üreticilerin Samsun’daki yetkili satış ve uyarlama noktasıyız.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BRAND_GROUPS.map((group) => (
                <div key={group.slug} className="border border-gray-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-dark/5">
                      <i className={`${group.icon} text-brand-accent text-lg`} />
                    </span>
                    <div>
                      <h3 className="font-bold text-brand-dark">{group.title}</h3>
                      <p className="text-xs text-gray-400">{group.origin}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{group.summary}</p>
                  <ul className="space-y-2">
                    {group.brands.map((b) => (
                      <li key={b.name} className="text-sm">
                        <span className="font-semibold text-brand-dark">{b.name}</span>
                        <span className="text-gray-500"> — {b.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">Öne Çıkan Modeller</h2>
                <p className="text-gray-500 text-sm mt-1">Fiyat ve stok için merkezimizden güncel bilgi alın.</p>
              </div>
              <Link to="/katalog" className="text-sm font-semibold text-brand-accent hover:text-[#008f7f]">
                Tüm Kataloglar →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-6">Marka Katalogları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATALOGS.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/katalog/${cat.slug}`}
                  className="group border border-gray-100 rounded-2xl p-6 hover:border-brand-accent/40 hover:shadow-md transition-all"
                >
                  <p className="text-xs font-semibold text-brand-accent uppercase mb-1">{cat.brand}</p>
                  <h3 className="font-bold text-brand-dark mb-2 group-hover:text-brand-accent transition-colors">
                    {cat.title.replace(' Kataloğu', '')}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{cat.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </HearingAidShell>
    </>
  );
}
