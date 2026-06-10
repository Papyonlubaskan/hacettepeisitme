import { Link } from 'react-router-dom';
import HearingAidShell from '@/components/hearing-aids/HearingAidShell';
import { CATALOGS } from '@/mocks/hearingAids';

export default function CatalogIndexPage() {
  return (
    <HearingAidShell
      title="İşitme Cihazı Katalogları"
      subtitle="Vista, A&M, Nitro ve Pediatrik Grup serilerinin modellerini merkezimizde inceleyebilir, uzman danışmanlık alabilirsiniz."
    >
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed">
          Aşağıdaki ürün katalogları bilgilendirme amaçlıdır. Güncel model listesi, fiyat ve stok durumu için
          merkezimize başvurmanızı öneririz. Tüm modellerde ücretsiz işitme testi sonrası deneme imkânı sunulmaktadır.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATALOGS.map((cat) => (
            <Link
              key={cat.slug}
              to={`/katalog/${cat.slug}`}
              className="group border border-gray-100 rounded-2xl p-8 hover:border-brand-accent/50 hover:shadow-lg transition-all"
            >
              <p className="text-sm font-semibold text-brand-accent uppercase tracking-wide mb-2">{cat.lineName}</p>
              <h2 className="font-serif text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-accent transition-colors">
                {cat.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{cat.subtitle}</p>
              <p className="text-sm text-gray-600 line-clamp-3">{cat.summary}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand-accent">
                Kataloğu İncele
                <i className="ri-arrow-right-line" />
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center pt-4">
          <Link to="/isitme-cihazlari" className="text-sm font-semibold text-brand-accent">
            ← Cihaz tiplerine göre incele
          </Link>
        </div>
      </div>
    </HearingAidShell>
  );
}
