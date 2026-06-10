import { Link, useLocation } from 'react-router-dom';
import Seo from '@/components/Seo';
import PageHeroBanner from '@/components/feature/PageHeroBanner';
import { PAGE_IMAGES } from '@/lib/pageImages';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="pt-[72px] animate-fadeInUp">
      <Seo
        title="Sayfa Bulunamadı | Hacettepe İşitme Cihazları"
        description="Aradığınız sayfa mevcut değil. Samsun işitme merkezi ana sayfasına dönün."
        path={location.pathname}
        noindex
      />
      <PageHeroBanner
        title="Sayfa Bulunamadı"
        subtitle={`"${location.pathname}" adresi mevcut değil. Ana sayfaya dönebilir veya aşağıdaki bağlantıları kullanabilirsiniz.`}
        imageSrc={PAGE_IMAGES.contact}
        align="center"
        minHeight="min-h-[280px] md:min-h-[340px]"
      >
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-[#008f7f] transition-all"
          >
            <i className="ri-home-line" />
            Ana Sayfa
          </Link>
          <Link
            to="/iletisim"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all"
          >
            <i className="ri-phone-line" />
            İletişim
          </Link>
        </div>
      </PageHeroBanner>
      <section className="py-16 bg-white">
        <div className="w-full px-6 lg:px-12 max-w-3xl mx-auto text-center text-gray-500">
          <p className="text-8xl font-black text-gray-100 select-none mb-4">404</p>
          <p>Aradığınız içerik taşınmış veya kaldırılmış olabilir.</p>
        </div>
      </section>
    </div>
  );
}
