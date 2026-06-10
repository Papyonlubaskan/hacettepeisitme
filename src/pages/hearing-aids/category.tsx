import { Link, useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import Seo from '@/components/Seo';
import SeoBreadcrumbJsonLd from '@/components/SeoBreadcrumbJsonLd';
import HearingAidShell from '@/components/hearing-aids/HearingAidShell';
import { getBreadcrumbs } from '@/lib/breadcrumbs';
import ProductCard from '@/components/hearing-aids/ProductCard';
import { PAGE_IMAGES } from '@/lib/pageImages';
import { getDeviceCategory, getProductsByCategory } from '@/mocks/hearingAids';

export default function HearingAidCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getDeviceCategory(slug) : undefined;

  if (!category) {
    return <NotFound />;
  }

  const path = `/isitme-cihazlari/${category.slug}`;
  const products = getProductsByCategory(category.slug);

  return (
    <>
      <Seo
        title={category.seoTitle}
        description={category.seoDescription}
        path={path}
        keywords={category.keywords}
      />
      <SeoBreadcrumbJsonLd items={getBreadcrumbs(path, category.title)} />
      <HearingAidShell title={category.title} subtitle={category.summary} heroImage={PAGE_IMAGES.hearingAids}>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <Link to="/isitme-cihazlari" className="inline-flex items-center gap-1 text-sm text-brand-accent font-medium">
            <i className="ri-arrow-left-line" />
            Tüm İşitme Cihazları
          </Link>

          {category.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}

          <div>
            <h2 className="font-serif text-xl font-bold text-brand-dark mb-4">Öne Çıkan Özellikler</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm bg-brand-cream rounded-xl p-4">
                  <i className="ri-check-double-line text-brand-accent mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {products.length > 0 ? (
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-dark mb-4">Bu Kategoride Önerilen Modeller</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="bg-brand-dark text-white rounded-2xl p-6 md:p-8">
            <h2 className="font-serif text-xl font-bold mb-2">Merkezimizde Deneyin</h2>
            <p className="text-white/80 text-sm mb-4">
              {category.title} hakkında detaylı bilgi, ücretsiz işitme testi ve cihaz denemesi için randevu alın.
            </p>
            <Link to="/randevu" className="inline-flex bg-brand-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold">
              Randevu Oluştur
            </Link>
          </div>
        </div>
      </HearingAidShell>
    </>
  );
}
