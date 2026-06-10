import { Link, useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import Seo from '@/components/Seo';
import SeoBreadcrumbJsonLd from '@/components/SeoBreadcrumbJsonLd';
import HearingAidShell from '@/components/hearing-aids/HearingAidShell';
import { getBreadcrumbs } from '@/lib/breadcrumbs';
import { getCatalog } from '@/mocks/hearingAids';

export default function CatalogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const catalog = slug ? getCatalog(slug) : undefined;

  if (!catalog) {
    return <NotFound />;
  }

  const path = `/katalog/${catalog.slug}`;

  return (
    <>
      <Seo
        title={catalog.seoTitle}
        description={catalog.seoDescription}
        path={path}
        keywords={catalog.keywords}
      />
      <SeoBreadcrumbJsonLd items={getBreadcrumbs(path, catalog.lineName)} />
      <HearingAidShell title={catalog.title} subtitle={catalog.subtitle}>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <Link to="/katalog" className="inline-flex items-center gap-1 text-sm text-brand-accent font-medium">
            <i className="ri-arrow-left-line" />
            Tüm Kataloglar
          </Link>

          <p className="text-brand-dark font-medium">{catalog.summary}</p>

          {catalog.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}

          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-dark mb-6">{catalog.lineName} Modelleri</h2>
            <div className="space-y-4">
              {catalog.series.map((series) => (
                <div key={series.name} className="bg-brand-cream rounded-2xl p-5 md:p-6">
                  <h3 className="font-bold text-brand-dark mb-2">{series.name}</h3>
                  <p className="text-sm">{series.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-dashed border-brand-accent/40 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              {catalog.lineName} modellerini merkezimizde denemek ve güncel fiyat bilgisi almak için randevu oluşturun.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/randevu" className="inline-flex justify-center bg-brand-accent text-white px-6 py-3 rounded-full font-semibold text-sm">
                Deneme Randevusu
              </Link>
              <Link to="/isitme-cihazlari" className="inline-flex justify-center border border-brand-accent text-brand-accent px-6 py-3 rounded-full font-semibold text-sm">
                Diğer Seriler
              </Link>
            </div>
          </div>
        </div>
      </HearingAidShell>
    </>
  );
}
