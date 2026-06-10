import PageHeroBanner from '@/components/feature/PageHeroBanner';
import { PAGE_IMAGES } from '@/lib/pageImages';
import { SITE_FAQ } from '@/lib/schema';

export default function About() {
  return (
    <div className="pt-[72px] animate-fadeInUp">
      <PageHeroBanner
        title="Hakkımızda"
        subtitle="Samsun'da işitme sağlığı alanında 15 yılı aşkın süredir hizmet veren güvenilir adresiniz."
        imageSrc={PAGE_IMAGES.about}
      />

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-accent/10 rounded-full px-4 py-2 mb-4">
                <span className="text-sm font-semibold text-brand-accent uppercase tracking-wider">Hikayemiz</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                15 Yıllık Deneyim ile Samsun&apos;da Hizmetinizdeyiz
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  Hacettepe İşitme Cihazları olarak, 2009 yılından bu yana Samsun ve çevresinde işitme
                  sağlığı alanında lider hizmet vermekteyiz. Kuruluşumuzdan bu yana binlerce hastamıza
                  umut olduk ve onların yaşam kalitesini artırmaya yardımcı olduk.
                </p>
                <p>
                  Kliniğimizde Vista, A&M, Nitro ve Pediatrik Grup serilerinin en güncel modellerini
                  bulabilirsiniz. Uzman odyometristlerimiz,
                  her hastamıza özel kapsamlı işitme testi yaparak en doğru çözümü sunmaktadır.
                </p>
                <p>
                  Müşteri memnuniyetini her zaman ön planda tutarak, ücretsiz danışmanlık, cihaz
                  uyarlama ve ömür boyu teknik destek hizmetleri sunmaktayız. Amacımız, herkesin
                  sağlıklı bir şekilde duymasını sağlamaktır.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-10">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-accent">15+</p>
                  <p className="text-sm text-gray-400 mt-1">Yıl Deneyim</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-accent">5000+</p>
                  <p className="text-sm text-gray-400 mt-1">Mutlu Müşteri</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-accent">3</p>
                  <p className="text-sm text-gray-400 mt-1">Dünya Markası</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={PAGE_IMAGES.aboutSecondary}
                alt="Hacettepe İşitme Ekibi"
                loading="lazy"
                className="w-full h-[500px] md:h-[560px] object-cover object-top rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-5 max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
                    <i className="ri-award-line text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-dark">Sertifikalı Uzmanlar</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Tüm ekibimiz Türkiye Odyometristler ve Konuşma Terapistleri Derneği üyesidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-3">
              Değerlerimiz
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Her kararımızda önceliğimiz hastalarımızın sağlığı ve memnuniyetidir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: 'ri-heart-3-line',
                title: 'Empati',
                desc: 'Her hastamızın durumunu anlayarak, onlara en uygun ve en şefkatli hizmeti sunuyoruz.',
              },
              {
                icon: 'ri-lightbulb-line',
                title: 'İnovasyon',
                desc: 'Sürekli gelişen teknolojiyi takip ederek en güncel işitme çözümlerini sunuyoruz.',
              },
              {
                icon: 'ri-shield-check-line',
                title: 'Güvenilirlik',
                desc: 'Şeffaf fiyatlandırma ve dürüst danışmanlık ile güven inşa ediyoruz.',
              },
              {
                icon: 'ri-user-star-line',
                title: 'Uzmanlık',
                desc: 'Deneyimli ekibimiz ve sertifikalı ürünlerimizle en iyi sonuçları hedefliyoruz.',
              },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-accent/10 mb-4">
                  <i className={`${v.icon} text-xl text-brand-accent`} />
                </div>
                <h3 className="text-base font-bold text-brand-dark mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-3">
                Sıkça Sorulan Sorular
              </h2>
              <p className="text-gray-500">
                Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
              </p>
            </div>

            <div itemScope itemType="https://schema.org/FAQPage" className="space-y-4">
              {SITE_FAQ.map((faq, i) => (
                <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="bg-brand-cream rounded-2xl p-6">
                  <h3 itemProp="name" className="text-base font-bold text-brand-dark mb-2 flex items-start gap-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0 mt-0.5">
                      <i className="ri-question-line text-brand-accent text-xs" />
                    </span>
                    {faq.question}
                  </h3>
                  <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p itemProp="text" className="text-sm text-gray-500 leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
