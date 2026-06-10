import { Link } from 'react-router-dom';
import ProductCard from '@/components/hearing-aids/ProductCard';
import { DEVICE_CATEGORIES, FEATURED_PRODUCTS } from '@/mocks/hearingAids';
import { trackCTAClick } from '@/lib/tracking';

export default function HearingAidsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-accent/10 rounded-full px-4 py-2 mb-4">
              <i className="ri-headphone-line text-brand-accent" />
              <span className="text-sm font-semibold text-brand-accent uppercase tracking-wider">İşitme Cihazları</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-2">
              Satışını Yaptığımız Cihazlar
            </h2>
            <p className="text-gray-500 max-w-xl">
              Vista, A&M, Nitro ve Pediatrik Grup serilerinin güncel modellerini merkezimizde deneyebilirsiniz.
            </p>
          </div>
          <Link
            to="/isitme-cihazlari"
            className="text-sm font-semibold text-brand-accent hover:text-[#008f7f]"
            onClick={() => trackCTAClick('Tüm Cihazlar', 'home_hearing_aids', '/isitme-cihazlari')}
          >
            Tümünü Gör →
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {DEVICE_CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.slug}
              to={`/isitme-cihazlari/${cat.slug}`}
              className="inline-flex items-center gap-2 bg-brand-cream hover:bg-brand-accent/10 text-sm text-brand-dark px-4 py-2 rounded-full transition-colors"
              onClick={() => trackCTAClick(cat.title, 'home_hearing_category', `/isitme-cihazlari/${cat.slug}`)}
            >
              <i className={`${cat.icon} text-brand-accent`} />
              {cat.title.replace(' İşitme Cihazları', '').replace(' (RIC) Cihazlar', '')}
            </Link>
          ))}
          <Link
            to="/katalog"
            className="inline-flex items-center gap-2 border border-brand-accent/30 text-sm text-brand-accent px-4 py-2 rounded-full hover:bg-brand-light transition-colors"
          >
            <i className="ri-book-open-line" />
            Ürün Katalogları
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.slice(0, 3).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
