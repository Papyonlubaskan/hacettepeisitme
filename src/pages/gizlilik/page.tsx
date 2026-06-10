import { useEffect } from 'react';
import { trackPageView } from '@/lib/tracking';
import PageHeroBanner from '@/components/feature/PageHeroBanner';
import AddressLink from '@/components/feature/AddressLink';
import { PAGE_IMAGES } from '@/lib/pageImages';
import { SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '@/lib/siteContact';

export default function PrivacyPolicy() {
  useEffect(() => {
    trackPageView('Gizlilik Politikası | Hacettepe İşitme Cihazları Samsun', '/gizlilik-politikasi');
  }, []);

  return (
    <div className="pt-[72px] animate-fadeInUp">
      <PageHeroBanner
        title="Gizlilik Politikası"
        subtitle="Kişisel verilerinizin korunması ve güvenliği en öncelikli konumuzdur."
        imageSrc={PAGE_IMAGES.privacy}
      />

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Genel Bilgilendirme</h2>
              <p className="text-gray-500 leading-relaxed">
                Hacettepe İşitme Cihazları olarak, ziyaretçilerimizin ve müşterilerimizin gizliliğini en üst düzeyde korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde ve hizmetlerimizden yararlandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını, saklandığını ve korunduğunu açıklamaktadır. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuat hükümlerine tam uyum sağlamaktayız.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Toplanan Kişisel Veriler</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Web sitemiz üzerinden aşağıdaki kişisel verileri toplayabiliriz:
              </p>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Ad ve soyad bilgileri</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Telefon numarası</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>E-posta adresi</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Yaş ve demografik bilgiler (isteğe bağlı)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Randevu ve hizmet tercihleri</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>IP adresi, tarayıcı bilgisi ve çerez verileri</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Veri Kullanım Amaçları</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Topladığımız kişisel verileri aşağıdaki amaçlarla kullanıyoruz:
              </p>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Randevu taleplerinizi işleme almak ve onaylamak</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>İşitme testi ve danışmanlık hizmetleri sunmak</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Kampanya, indirim ve hizmet duyuruları göndermek (izninizle)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Web sitesi deneyimini iyileştirmek ve analiz yapmak</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Yasal yükümlülüklerimizi yerine getirmek</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Çerezler (Cookies)</h2>
              <p className="text-gray-500 leading-relaxed">
                Web sitemiz, kullanıcı deneyimini geliştirmek ve site trafiğini analiz etmek amacıyla çerezler kullanmaktadır. Çerezler, tarayıcınız aracılığıyla cihazınıza yerleştirilen küçük metin dosyalarıdır. Ziyaretçilerimiz tarayıcı ayarlarından çerez kullanımını engelleyebilir veya mevcut çerezleri silebilir. Ancak çerezlerin devre dışı bırakılması, web sitesinin bazı özelliklerinin düzgün çalışmamasına neden olabilir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Veri Güvenliği</h2>
              <p className="text-gray-500 leading-relaxed">
                Kişisel verilerinizin güvenliği bizim için kritik öneme sahiptir. Verileriniz, yetkisiz erişime, değişikliğe, açıklamaya veya imhaya karşı korumak için teknik ve idari tedbirler almaktayız. SSL şifreleme teknolojisi kullanarak veri iletimini güvence altına alıyoruz. Verilerinize yalnızca yetkili personelimiz erişebilmektedir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Üçüncü Taraflarla Paylaşım</h2>
              <p className="text-gray-500 leading-relaxed">
                Kişisel verilerinizi hiçbir şekilde üçüncü taraflarla ticari amaçla paylaşmıyoruz. Verileriniz yalnızca yasal zorunluluklar gerektirdiğinde veya size daha iyi hizmet sunmak için iş ortaklarımızla (örneğin randevu yönetim sistemleri) sınırlı ve güvenli şekilde paylaşılabilir. Bu paylaşımlar KVKK hükümlerine uygun olarak gerçekleştirilir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Haklarınız</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Verileriniz düzeltilmesini, silinmesini veya anonim hale getirilmesini isteme</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>İşlenen verilerinizin aktarıldığı üçüncü kişileri öğrenme</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Veri işlemeye itiraz etme ve zararın giderilmesini talep etme</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">İletişim</h2>
              <p className="text-gray-500 leading-relaxed">
                Gizlilik politikamız ve kişisel verileriniz hakkında herhangi bir sorunuz veya talebiniz varsa, aşağıdaki kanallardan bizimle iletişime geçebilirsiniz:
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
                  <strong className="text-brand-dark">Adres:</strong>{' '}
                  <AddressLink showHint={false} className="text-gray-600" />
                </p>
              </div>
            </div>

            <div className="bg-brand-cream rounded-2xl p-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                <strong className="text-brand-dark">Son Güncelleme:</strong> Bu Gizlilik Politikası son olarak 6 Mayıs 2026 tarihinde güncellenmiştir. Politikada değişiklik yapılması durumunda, web sitemiz üzerinden bilgilendirme yapılacaktır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}