import { useEffect } from 'react';
import { trackPageView } from '@/lib/tracking';
import PageHeroBanner from '@/components/feature/PageHeroBanner';
import AddressLink from '@/components/feature/AddressLink';
import { PAGE_IMAGES } from '@/lib/pageImages';
import { SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '@/lib/siteContact';

export default function KvkkNotice() {
  useEffect(() => {
    trackPageView('KVKK Aydınlatma Metni | Hacettepe İşitme Cihazları Samsun', '/kvkk-aydinlatma-metni');
  }, []);

  return (
    <div className="pt-[72px] animate-fadeInUp">
      <PageHeroBanner
        title="KVKK Aydınlatma Metni"
        subtitle="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma yükümlülüğümüz."
        imageSrc={PAGE_IMAGES.kvkk}
      />

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="max-w-3xl mx-auto space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Veri Sorumlusu</h2>
              <p className="text-gray-500 leading-relaxed">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, kişisel verilerinizin veri sorumlusu olarak Hacettepe İşitme Cihazları tarafından işlenmekte olduğunu bilginize sunarız. Şirketimiz, kişisel verilerin korunması ve işlenmesine ilişkin yasal düzenlemelere tam uyum sağlamaktadır.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">İşlenen Kişisel Veriler</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Şirketimiz tarafından aşağıdaki kategorilerdeki kişisel veriler işlenmektedir:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-brand-cream rounded-xl p-4">
                  <h3 className="text-sm font-bold text-brand-dark mb-2">Kimlik Bilgileri</h3>
                  <p className="text-sm text-gray-500">Ad, soyad, T.C. kimlik numarası (gerekli durumlarda)</p>
                </div>
                <div className="bg-brand-cream rounded-xl p-4">
                  <h3 className="text-sm font-bold text-brand-dark mb-2">İletişim Bilgileri</h3>
                  <p className="text-sm text-gray-500">Telefon numarası, e-posta adresi, adres bilgisi</p>
                </div>
                <div className="bg-brand-cream rounded-xl p-4">
                  <h3 className="text-sm font-bold text-brand-dark mb-2">Sağlık Bilgileri</h3>
                  <p className="text-sm text-gray-500">İşitme test sonuçları, odyogram verileri, cihaz kullanım geçmişi</p>
                </div>
                <div className="bg-brand-cream rounded-xl p-4">
                  <h3 className="text-sm font-bold text-brand-dark mb-2">Finansal Bilgiler</h3>
                  <p className="text-sm text-gray-500">Fatura bilgileri, ödeme kayıtları, SGK takip bilgileri</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Veri İşleme Amaçları ve Hukuki Sebepler</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki amaçlarla ve hukuki sebeplerle işlenmektedir:
              </p>
              <ul className="space-y-3 text-gray-500">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0 mt-0.5">
                    <i className="ri-file-text-line text-brand-accent text-xs" />
                  </span>
                  <span>
                    <strong className="text-brand-dark">Randevu ve hizmet sunumu:</strong> KVKK m.5/2(a) — açık rızanız ile
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0 mt-0.5">
                    <i className="ri-shield-check-line text-brand-accent text-xs" />
                  </span>
                  <span>
                    <strong className="text-brand-dark">SGK ve sigorta işlemleri:</strong> KVKK m.5/2(c) — bir sözleşmenin ifası için gerekli olması
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0 mt-0.5">
                    <i className="ri-mail-send-line text-brand-accent text-xs" />
                  </span>
                  <span>
                    <strong className="text-brand-dark">Yasal yükümlülüklerin yerine getirilmesi:</strong> KVKK m.5/2(c) — ilgili mevzuat hükümleri
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0 mt-0.5">
                    <i className="ri-mail-send-line text-brand-accent text-xs" />
                  </span>
                  <span>
                    <strong className="text-brand-dark">Kampanya ve bilgilendirmeler:</strong> KVKK m.5/1 — açık rızanız ile
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Veri Aktarımı</h2>
              <p className="text-gray-500 leading-relaxed">
                Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi kapsamında ve KVKK hükümlerine uygun olarak aşağıdaki alıcı gruplarına aktarılabilir: SGK ve kamu kurumları (yasal zorunluluk kapsamında), sigorta şirketleri (anlaşmalı kurumlar), işitme cihazı üretici firmaları (garanti ve teknik servis işlemleri için), bulut hizmet sağlayıcıları (veri depolama güvenliği çerçevesinde). Veri aktarımları, gerektiğinde ilgili kişinin açık rızası alınarak veya mevzuatta öngörülen istisna halleri kapsamında gerçekleştirilir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Veri Saklama Süreleri</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Kişisel verileriniz, ilgili mevzuatta öngörülen asgari saklama süreleri ve işleme amacının gerektirdiği süre
                kadar saklanır. Süre dolduğunda veriler otomatik olarak silinir veya anonim hale getirilir.
              </p>
              <ul className="space-y-2 text-gray-500 mb-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <strong className="text-brand-dark">Web form kayıtları</strong> (randevu, iletişim, landing formları):
                    en fazla <strong>2 yıl</strong> — sunucuda yedek log olarak tutulur, e-posta bildirimi iletilir
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <strong className="text-brand-dark">Form güvenlik kayıtları</strong> (IP, tarih, istek özeti):
                    en fazla <strong>90 gün</strong> — spam ve kötüye kullanım denetimi için
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>
                    <strong className="text-brand-dark">Bülten abonelik verileri</strong>: abonelik süresince; iptal
                    sonrası en fazla <strong>1 yıl</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Hasta dosyaları ve sağlık kayıtları: Tedavi süresi + 15 yıl (Hasta Hakları Yönetmeliği)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
                  <span>Mali kayıtlar ve fatura bilgileri: 10 yıl (Vergi Usul Kanunu)</span>
                </li>
              </ul>
              <p className="text-gray-500 leading-relaxed">
                Sunucu tarafında saklanan form verileri yalnızca yetkili personel erişimine açık dizinlerde tutulur; süresi
                dolan kayıtlar günlük otomatik temizlik ile silinir. Form içeriğinde yer alan ad, telefon, e-posta ve mesaj
                bilgileri KVKK kapsamında işlenir; üçüncü taraflarla ticari amaçla paylaşılmaz.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Veri Silme Talebi</h2>
              <p className="text-gray-500 leading-relaxed">
                KVKK&apos;nın 11. maddesi kapsamında silme talebinizi{' '}
                <a href="mailto:hacettepeisitme55@gmail.com" className="text-brand-accent hover:underline">
                  hacettepeisitme55@gmail.com
                </a>{' '}
                adresine veya merkezimize yazılı başvuru ile iletebilirsiniz. Talebiniz en geç{' '}
                <strong>30 gün</strong> içinde sonuçlandırılır; web form yedek kayıtları ve bülten aboneliğiniz (varsa)
                silinir. Yasal zorunluluk gereği saklanması gereken mali ve sağlık kayıtları bu kapsam dışındadır.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">İlgili Kişi Hakları</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
                  'Kişisel verileriniz işlenmişse bilgi talep etme',
                  'İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme',
                  'Yurt içinde / yurt dışında aktarıldığı üçüncü kişileri bilme',
                  'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
                  'KVKK 7. maddede öngörülen şartlar çerçevesinde silinmesini isteme',
                  'Aktarılan verilerin düzeltilmesi, silinmesi veya yok edilmesini isteme',
                  'İtiraz etme ve zarara uğramanız halinde tazminat talep etme',
                ].map((right, i) => (
                  <div key={i} className="flex items-start gap-3 bg-brand-cream rounded-xl p-4">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-brand-accent text-white text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-500">{right}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Haklarınızı Nasıl Kullanabilirsiniz?</h2>
              <p className="text-gray-500 leading-relaxed">
                KVKK kapsamındaki haklarınızı kullanmak için, aşağıdaki yöntemlerden biriyle başvuruda bulunabilirsiniz. Başvurunuz, talebin niteliğine göre en kısa sürede ve en geç 30 gün içinde sonuçlandırılacaktır. Başvurunuzu yazılı olarak yapmanız gerekmektedir.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Başvuru Kanalları</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-brand-cream rounded-xl p-5">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0">
                    <i className="ri-mail-line text-brand-accent" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-brand-dark mb-1">E-posta</h3>
                    <p className="text-sm text-gray-500">
                      <a href="mailto:hacettepeisitme55@gmail.com" className="text-brand-accent hover:underline">
                        hacettepeisitme55@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-brand-cream rounded-xl p-5">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0">
                    <i className="ri-mail-send-line text-brand-accent" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-brand-dark mb-1">Posta</h3>
                    <AddressLink showHint={false} className="text-sm text-gray-500 text-pretty" />
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-brand-cream rounded-xl p-5">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10 shrink-0">
                    <i className="ri-phone-line text-brand-accent" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-brand-dark mb-1">Telefon</h3>
                    <p className="text-sm text-gray-500">
                      <a href={`tel:${SITE_PHONE_E164}`} className="text-brand-accent hover:underline">
                        {SITE_PHONE_DISPLAY}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-4">Veri Güvenliği Önlemleri</h2>
              <p className="text-gray-500 leading-relaxed">
                Kişisel verilerinizin güvenliğini sağlamak amacıyla teknik ve idari tedbirler almaktayız: SSL şifreleme ile veri iletimi güvenliği, fiziksel ve elektronik erişim kontrol sistemleri, düzenli güvenlik denetimleri ve personel eğitimleri. Veri ihlali durumunda, 72 saat içinde Kişisel Verileri Koruma Kurumu&apos;na ve ilgili kişilere bildirim yapılacaktır.
              </p>
            </div>

            <div className="bg-brand-cream rounded-2xl p-6">
              <p className="text-sm text-gray-500 leading-relaxed">
                <strong className="text-brand-dark">Son Güncelleme:</strong> Bu KVKK Aydınlatma Metni son olarak 6 Mayıs 2026 tarihinde güncellenmiştir. Politikamızda değişiklik yapılması durumunda, web sitemiz üzerinden ve kayıtlı iletişim bilgileriniz aracılığıyla bilgilendirme yapılacaktır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}