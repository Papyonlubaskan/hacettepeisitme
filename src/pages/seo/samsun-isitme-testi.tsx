import { Link } from 'react-router-dom';
import PhoneCallButton from '@/components/feature/PhoneCallButton';
import PageHeroBanner from '@/components/feature/PageHeroBanner';
import { PAGE_IMAGES } from '@/lib/pageImages';
import { SAMSUN_TESTI_FAQ } from '@/lib/schema';

export default function SamsunIsitmeTestiPage() {
  return (
    <div className="pt-[72px] animate-fadeInUp bg-white">
      <PageHeroBanner
        title="Samsun İşitme Testi"
        subtitle="Uzman odyometristler tarafından uygulanan kapsamlı işitme testi ile işitme profiliniz detaylı şekilde analiz edilir. İlkadım Tepecik merkez — ücretsiz test."
        imageSrc={PAGE_IMAGES.samsunTest}
        align="left"
      />
      <section className="py-12 md:py-16">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto space-y-6 text-gray-600 leading-relaxed">
          <h2 className="font-serif text-2xl font-bold text-brand-dark">Ücretsiz Odyometri ve İşitme Değerlendirmesi</h2>
          <p>
            Samsun&apos;da işitme kaybı şüphesi taşıyan veya rutin kontrol yaptırmak isteyen danışanlarımız için
            ücretsiz işitme testi hizmeti sunuyoruz. Test sonrası size özel işitme cihazı önerileri ve SGK süreçleri
            hakkında bilgi verilir.
          </p>
          <p>Test süreci ortalama 30-45 dakika sürer. Sonuç raporu ile birlikte uygun cihaz ve takip planı aynı gün sunulur.</p>

          <h2 className="font-serif text-2xl font-bold text-brand-dark pt-2">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            {SAMSUN_TESTI_FAQ.map((item) => (
              <div key={item.question} className="bg-brand-cream rounded-2xl p-5">
                <h3 className="font-bold text-brand-dark mb-2">{item.question}</h3>
                <p className="text-sm">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/randevu" className="inline-flex justify-center bg-brand-accent text-white px-6 py-3 rounded-full font-semibold">
              İşitme Testi Randevusu Al
            </Link>
            <PhoneCallButton
              label="Bizi Ara"
              trackingLabel="samsun_isitme_testi_call"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-accent text-brand-accent px-6 py-3 rounded-full font-semibold"
            />
            <Link to="/samsun-isitme-cihazlari" className="inline-flex justify-center text-brand-accent font-semibold px-6 py-3">
              Samsun İşitme Cihazları →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
