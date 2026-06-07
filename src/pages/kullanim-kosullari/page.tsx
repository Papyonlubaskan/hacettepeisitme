import { useEffect } from 'react';
import { trackPageView } from '@/lib/tracking';
import { SITE_ADDRESS_SINGLE, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '@/lib/siteContact';

export default function TermsOfService() {
  useEffect(() => {
    trackPageView('Kullanım Koşulları | Hacettepe İşitme Cihazları Samsun', '/kullanim-kosullari');
  }, []);

  return (
    <div className="pt-[72px] animate-fadeInUp">
      {/* Hero Banner */}
      <section className="relative py-16 md:py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/local-images/readdy-terms-terms2024v2k.webp"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="relative z-10 w-full px-6 lg:px-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Kullanım Koşulları
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Web sitemizi kullanmadan önce lütfen aşağıdaki koşulları dikkatlice okuyunuz.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Sözleşmenin Kabulü</h2>
              <p className="text-gray-500 leading-relaxed">
                Hacettepe İşitme Cihazları web sitesine (hacettepeisitme.com.tr) erişim sağlayarak ve kullanarak, aşağıda belirtilen kullanım koşullarını, şartlarını ve gizlilik politikasını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, lütfen web sitemizi kullanmayınız. Web sitesinin kullanımı, Türkiye Cumhuriyeti yasalarına tabidir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Hizmet Kapsamı</h2>
              <p className="text-gray-500 leading-relaxed">
                Web sitemiz üzerinden aşağıdaki hizmetlere erişebilirsiniz: randevu talebi oluşturma, ücretsiz online işitme testi, işitme cihazı ürün bilgileri, blog yazıları ve işitme sağlığı içerikleri, iletişim formu üzerinden mesaj gönderme ve bülten aboneliği. Tüm hizmetlerimiz, web sitesinde belirtilen şartlar çerçevesinde sunulmaktadır.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Hesap ve Kullanıcı Yükümlülükleri</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Web sitemizde bazı hizmetlerden yararlanmak için bilgi paylaşımı gerekebilir. Kullanıcı olarak aşağıdaki yükümlülüklere sahipsiniz:
              </p>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Paylaştığınız bilgilerin doğru, güncel ve eksiksiz olması</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Web sitesini yasalara aykırı faaliyetlerde kullanmamanız</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Site güvenliğini ihlal edici davranışlarda bulunmamanız</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Site içeriğini izinsiz kopyalamamanız, çoğaltmamanız veya dağıtmamanız</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Tıbbi Sorumluluk Sınırlaması</h2>
              <p className="text-gray-500 leading-relaxed">
                Web sitemizde sunulan online işitme testi ve sağlık içerikleri yalnızca bilgilendirme amaçlıdır ve profesyonel tıbbi teşhis, tedavi veya tavsiye yerine geçmez. İşitme sağlığı ile ilgili herhangi bir endişeniz varsa, lütfen yetkili bir sağlık profesyoneline veya kliniğimize danışınız. Hacettepe İşitme Cihazları, web sitesi içeriğinin kullanımından doğabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Fikri Mülkiyet Hakları</h2>
              <p className="text-gray-500 leading-relaxed">
                Web sitesinde yer alan tüm metin, görsel, logo, video, yazılım ve diğer içerikler Hacettepe İşitme Cihazları&apos;nın fikri mülkiyetindedir. Bu içerikler 5846 sayılı Fikir ve Sanat Eserleri Kanunu ve ilgili mevzuat ile korunmaktadır. Önceden yazılı izin alınmaksızın, site içeriğinin kısmen veya tamamen çoğaltılması, dağıtılması, değiştirilmesi veya ticari amaçla kullanılması yasaktır.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Bağlantılar ve Harici Siteler</h2>
              <p className="text-gray-500 leading-relaxed">
                Web sitemizde üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu bağlantılar size kolaylık sağlamak amacıyla sunulmaktadır. Harici sitelerin içeriği, gizlilik politikaları ve kullanım koşulları üzerinde hiçbir kontrolümüz yoktur. Bu siteleri ziyaret etmenizden ve onların içeriklerinden doğabilecek riskler tamamen sizin sorumluluğunuzdadır.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Randevu ve İptal Politikası</h2>
              <p className="text-gray-500 leading-relaxed">
                Web sitemiz üzerinden veya telefonla alınan randevular, belirtilen tarih ve saatte geçerlidir. Randevunuzu iptal etmek veya değiştirmek istemeniz durumunda, en az 24 saat önceden tarafımıza bildirimde bulunmanız gerekmektedir. Aynı gün yapılan randevu iptalleri, yoğunluk durumuna göre değerlendirilebilir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Garanti ve İade Koşulları</h2>
              <p className="text-gray-500 leading-relaxed">
                Satın alınan işitme cihazları için üretici firma garantisi geçerlidir. Ayrıca, cihaz uyarlama sürecinde 30 günlük memnuniyet garantisi sunuyoruz. Bu süre içinde cihazdan memnun kalmamanız durumunda, cihazın kullanılmamış ve hasarsız olması koşuluyla değişim veya iade talebinde bulunabilirsiniz. Detaylı bilgi için kliniğimizle iletişime geçiniz.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Koşullarda Değişiklik</h2>
              <p className="text-gray-500 leading-relaxed">
                Hacettepe İşitme Cihazları, bu kullanım koşullarını herhangi bir zamanda ve önceden haber vermeksizin güncelleme hakkını saklı tutar. Değişiklikler, web sitesinde yayınlandığı anda yürürlüğe girer. Sitenin kullanımına devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">İletişim</h2>
              <p className="text-gray-500 leading-relaxed">
                Kullanım koşulları hakkında sorularınız veya talepleriniz varsa, aşağıdaki kanallardan bizimle iletişime geçebilirsiniz:
              </p>
              <div className="mt-4 space-y-2 text-gray-500">
                <p>
                  <strong className="text-brand-dark">E-posta:</strong>{' '}
                  <a href="mailto:hacettepeisitme55@gmail.com" className="text-brand-accent hover:underline">
                    hacettepeisitme55@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-brand-dark">Telefon:</strong>{' '}
                  <a href={`tel:${SITE_PHONE_E164}`} className="text-brand-accent hover:underline">
                    {SITE_PHONE_DISPLAY}
                  </a>
                </p>
                <p>
                  <strong className="text-brand-dark">Adres:</strong> {SITE_ADDRESS_SINGLE}
                </p>
              </div>
            </div>

            <div className="bg-brand-cream rounded-2xl p-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                <strong className="text-brand-dark">Son Güncelleme:</strong> Bu Kullanım Koşulları son olarak 6 Mayıs 2026 tarihinde güncellenmiştir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}