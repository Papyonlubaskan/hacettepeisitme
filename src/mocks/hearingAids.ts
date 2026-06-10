export interface DeviceCategory {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  paragraphs: string[];
  highlights: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

export interface BrandGroup {
  slug: string;
  title: string;
  origin: string;
  icon: string;
  summary: string;
  brands: { name: string; note: string }[];
}

export interface CatalogEntry {
  slug: string;
  lineName: string;
  title: string;
  subtitle: string;
  summary: string;
  intro: string[];
  series: { name: string; description: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

export interface HearingAidProduct {
  slug: string;
  lineName: string;
  name: string;
  categorySlug: string;
  type: string;
  description: string;
  features: string[];
  image: string;
}

export const DEVICE_CATEGORIES: DeviceCategory[] = [
  {
    slug: 'kulak-arkasi-cihaz',
    title: 'Kulak Arkası İşitme Cihazları',
    icon: 'ri-ear-line',
    summary:
      'Güçlü amplifikasyon sunan, bakımı kolay ve uzun pil ömrüyle özellikle orta-ileri işitme kayıplarında tercih edilen modeller.',
    paragraphs: [
      'Kulak arkası (BTE) işitme cihazları, elektronik üniteyi kulak kepçesinin arkasında taşır; ses kulak kanalına özel hortum veya kulak kalıbı ile iletilir. Hacettepe İşitme Merkezi olarak Samsun’da Vista, A&M ve Nitro serilerinin kulak arkası modellerini test ederek size en uygun seçeneği belirliyoruz.',
      'Yaşlı danışanlarımızda kolay tak-çıkar ergonomisi, çocuklarda ise büyüme dönemine uygun yeniden ayar imkânı nedeniyle sıkça önerdiğimiz bir form faktörüdür. Bluetooth ve şarjlı seçeneklerle günlük kullanımda konfor artırılabilir.',
    ],
    highlights: [
      'Orta ve ileri derece işitme kayıplarına uygun',
      'Kolay pil değişimi ve dayanıklı gövde',
      'Kablosuz bağlantı ve uzaktan ayar seçenekleri',
      'SGK destekli modeller mevcuttur',
    ],
    seoTitle: 'Kulak Arkası İşitme Cihazları Samsun | Hacettepe İşitme',
    seoDescription:
      'Samsun’da kulak arkası işitme cihazı modelleri. Vista, A&M ve Nitro seçenekleri — ücretsiz test, uyarlama ve SGK danışmanlığı.',
    keywords: 'kulak arkası işitme cihazı, BTE işitme cihazı Samsun, kulak arkası cihaz fiyat',
  },
  {
    slug: 'kulak-ici-hoparlorlu',
    title: 'Kulak İçi Hoparlörlü (RIC) Cihazlar',
    icon: 'ri-bluetooth-line',
    summary:
      'İnce gövde, doğal ses hissi ve modern bağlantı özellikleriyle aktif yaşam tarzına uygun premium çözümler.',
    paragraphs: [
      'Kulak içi hoparlörlü (RIC/RITE) tasarımda hoparlör kulak kanalına yerleştirilir; cihaz gövdesi ise kulak arkasında minimal bir profille durur. Bu yapı hem estetik hem de yüksek frekans iletiminde avantaj sağlar.',
      'Merkezimizde RIC modelleri odyometri sonuçlarınıza göre programlanır; telefon, televizyon ve toplantı ortamları için ayrı dinleme profilleri oluşturulabilir.',
    ],
    highlights: [
      'Estetik ve hafif tasarım',
      'Doğal ses kalitesi ve gürültü yönetimi',
      'Akıllı telefon uygulaması ile kontrol',
      'Şarjlı ve pil ile çalışan versiyonlar',
    ],
    seoTitle: 'Kulak İçi Hoparlörlü İşitme Cihazı Samsun | RIC Modeller',
    seoDescription:
      'RIC işitme cihazları Samsun Hacettepe İşitme Merkezi’nde. İnce tasarım, Bluetooth ve kişiye özel uyarlama ile deneme fırsatı.',
    keywords: 'RIC işitme cihazı, kulak içi hoparlörlü cihaz Samsun, RITE işitme cihazı',
  },
  {
    slug: 'kulak-ici-cihaz',
    title: 'Kulak İçi İşitme Cihazları',
    icon: 'ri-headphone-line',
    summary:
      'Kulak kanalına özel üretilen kalıpla tam oturan, göze çarpmayan ve günlük kullanımda pratik modeller.',
    paragraphs: [
      'Kulak içi (ITE) işitme cihazları, bireysel kulak ölçüsü alınarak üretilen kalıp üzerine yerleştirilir. Orta düzey işitme kayıplarında konforlu kullanım sunar; telefon tutma ve gözlük kullanımında kulak arkası modellere göre daha az engel oluşturabilir.',
      'Hacettepe İşitme’de kulak kalıbı alımı hijyenik ortamda yapılır; cihaz tesliminde kullanım, temizlik ve pil bakımı konusunda yüz yüze eğitim verilir.',
    ],
    highlights: [
      'Kişiye özel kulak kalıbı',
      'Kompakt ve göze batmayan görünüm',
      'Kolay kontrol düğmeleri',
      'Farklı renk ve boyut seçenekleri',
    ],
    seoTitle: 'Kulak İçi İşitme Cihazı Samsun | Özel Kalıp Uygulama',
    seoDescription:
      'Kulak içi işitme cihazı ölçüsü ve uygulaması Samsun İlkadım’da. ITE modeller, ücretsiz işitme testi ve 30 gün deneme.',
    keywords: 'kulak içi işitme cihazı, ITE cihaz Samsun, kulak kalıbı işitme cihazı',
  },
  {
    slug: 'kanal-ici-cihaz',
    title: 'Kanal İçi ve Görünmez Modeller',
    icon: 'ri-eye-off-line',
    summary:
      'CIC ve IIC formunda, estetik kaygısı olan danışanlar için neredeyse fark edilmeyen işitme çözümleri.',
    paragraphs: [
      'Kanal içi (CIC) ve tamamen kanal içi (IIC) modeller kulak kanalının derinliklerine yerleştirilir. İşitme kaybı derecesi ve kulak anatomisi uygun olduğunda maksimum gizlilik sağlar.',
      'Bu cihaz grubunda doğru seçim için detaylı odyometri şarttır. Uzmanlarımız kanal yapınızı değerlendirerek telefon kullanımı, konuşma anlaşılırlığı ve konfor dengesini gözeten bir model önerir.',
    ],
    highlights: [
      'Minimal görünürlük',
      'Doğal rüzgar ve geri bildirim yönetimi',
      'Telefon kullanımına uygun tasarımlar',
      'Kişisel kulak anatomisine göre üretim',
    ],
    seoTitle: 'Kanal İçi İşitme Cihazı Samsun | Görünmez Modeller',
    seoDescription:
      'CIC ve IIC kanal içi işitme cihazları Samsun’da. Estetik çözümler, uzman ölçü ve uyarlama ile Hacettepe İşitme Merkezi.',
    keywords: 'kanal içi işitme cihazı, CIC IIC Samsun, görünmez işitme cihazı',
  },
  {
    slug: 'cocuk-isitme-cihazlari',
    title: 'Çocuk İşitme Cihazları',
    icon: 'ri-emotion-happy-line',
    summary:
      'Pediatrik işitme kaybında erken müdahale, konuşma gelişimi ve okul başarısı için özelleştirilmiş cihaz programları.',
    paragraphs: [
      'Çocuklarda işitme cihazı seçimi yalnızca teknik özellik değil; aile eğitimi, okul uyumu ve düzenli takip gerektirir. Merkezimizde çocuk danışanlarımız için dayanıklı gövde, güvenli pil yuvası ve renkli aksesuar seçenekleri sunulur.',
      'Ailelerle birlikte cihaz takibi, bakım rutini ve konuşma terapisi yönlendirmesi konusunda rehberlik ediyoruz. SGK süreçlerinde gerekli evrak desteği sağlanır.',
    ],
    highlights: [
      'Pediatrik odyoloji danışmanlığı',
      'Dayanıklı ve güvenli tasarımlar',
      'Aile eğitimi ve kullanım takibi',
      'Okul ve sosyal ortam için özel programlar',
    ],
    seoTitle: 'Çocuk İşitme Cihazı Samsun | Pediatrik Odyoloji',
    seoDescription:
      'Samsun’da çocuk işitme cihazı uygulaması ve aile danışmanlığı. Erken teşhis, uyarlama ve SGK destek süreçleri.',
    keywords: 'çocuk işitme cihazı Samsun, pediatrik işitme cihazı, bebek işitme cihazı',
  },
  {
    slug: 'cinlama-baskilama',
    title: 'Çınlama Baskılama Teknolojileri',
    icon: 'ri-sound-module-line',
    summary:
      'Tinnitus yönetimi için beyaz gürültü, maskeleme ve kişiselleştirilmiş rahatlama programları sunan cihaz özellikleri.',
    paragraphs: [
      'Kulak çınlaması (tinnitus) birçok işitme cihazı kullanıcısının yaşadığı bir durumdur. Modern cihazlarda çınlama baskılama modülleri, rahatsız edici tona karşı dengeli bir arka plan sesi oluşturarak gün içi konforu artırabilir.',
      'Çınlama yönetimi kişiye özeldir; merkezimizde bu özelliği destekleyen modelleri deneyerek günlük rutininize en uygun programı birlikte belirliyoruz.',
    ],
    highlights: [
      'Kişiselleştirilmiş maskeleme programları',
      'Gece ve gündüz profilleri',
      'İşitme kaybı ile birlikte bütüncül yaklaşım',
      'Uzman takibi ile program güncellemesi',
    ],
    seoTitle: 'Çınlama Baskılama İşitme Cihazı Samsun | Tinnitus',
    seoDescription:
      'Tinnitus ve çınlama baskılama özellikli işitme cihazları Samsun Hacettepe İşitme’de. Uzman değerlendirme ve deneme.',
    keywords: 'çınlama baskılama, tinnitus işitme cihazı Samsun, kulak çınlaması cihaz',
  },
  {
    slug: 'pil-aksesuarlar',
    title: 'Pil ve Aksesuarlar',
    icon: 'ri-battery-2-charge-line',
    summary:
      'İşitme cihazı pilleri, şarj üniteleri, kurutma kutuları, filtreler ve kablosuz aksesuarlar.',
    paragraphs: [
      'Cihazınızın performansını korumak için doğru pil tipi ve düzenli bakım ürünleri önemlidir. Merkezimizde 10, 312 ve şarjlı modeller için yedek pil, şarj istasyonu ve nem alıcı aksesuarları bulabilirsiniz.',
      'Bluetooth adaptör, TV bağlantı üniteleri ve uzaktan kumanda gibi yardımcı ürünlerle günlük dinleme deneyimini genişletmenize yardımcı oluyoruz.',
    ],
    highlights: [
      'Orijinal ve uyumlu pil seçenekleri',
      'Şarj üniteleri ve taşınabilir powerbank',
      'Kurutma ve hijyen ürünleri',
      'Kablosuz bağlantı aksesuarları',
    ],
    seoTitle: 'İşitme Cihazı Pil ve Aksesuar Samsun | Hacettepe',
    seoDescription:
      'İşitme cihazı pili, şarj cihazı ve aksesuar satışı Samsun İlkadım. Orijinal ürünler ve kullanım danışmanlığı.',
    keywords: 'işitme cihazı pili Samsun, işitme cihazı aksesuar, şarjlı işitme cihazı şarj',
  },
  {
    slug: 'teknik-servis',
    title: 'Teknik Servis ve Bakım',
    icon: 'ri-tools-line',
    summary:
      'Tüm seri işitme cihazlarında bakım, onarım, kulak kalıbı yenileme ve yazılım güncellemesi.',
    paragraphs: [
      'Hacettepe İşitme Merkezi teknik servis biriminde kulak kalıbı tamiri, hoparlör değişimi, gövde temizliği ve yazılım güncellemeleri yapılır. Satış sonrası periyodik kontroller cihaz ömrünü uzatır.',
      'Samsun içi danışanlarımız için hızlı servis randevusu; il dışından gelen cihazlarda ön inceleme sonrası işlem planı paylaşılır.',
    ],
    highlights: [
      'Çok serili servis desteği',
      'Kulak kalıbı üretim ve yenileme',
      'Yazılım güncelleme ve uyarlama',
      'Periyodik bakım hatırlatması',
    ],
    seoTitle: 'İşitme Cihazı Teknik Servis Samsun | Bakım Onarım',
    seoDescription:
      'Samsun’da işitme cihazı teknik servis, bakım ve onarım. Vista, A&M, Nitro ve Pediatrik Grup dahil çok serili uzman servis.',
    keywords: 'işitme cihazı tamiri Samsun, teknik servis işitme cihazı, işitme cihazı bakım',
  },
];

export const BRAND_GROUPS: BrandGroup[] = [
  {
    slug: 'premium',
    title: 'Premium Seriler',
    origin: 'Hacettepe İşitme',
    icon: 'ri-award-line',
    summary: 'Vista ve A&M serileri ile gelişmiş ses işleme ve kablosuz bağlantı.',
    brands: [
      { name: 'Vista', note: 'Şarjlı RIC ve güçlü BTE modelleri' },
      { name: 'A&M', note: 'Kişisel ses dengeleme ve mobil kontrol' },
    ],
  },
  {
    slug: 'advanced',
    title: 'Gelişmiş Seriler',
    origin: 'Hacettepe İşitme',
    icon: 'ri-bluetooth-line',
    summary: 'Nitro serisi ile doğal ses ve yapay zeka destekli işleme.',
    brands: [{ name: 'Nitro', note: 'RIC, BTE ve özel kalıp seçenekleri' }],
  },
  {
    slug: 'pediatrik',
    title: 'Pediatrik Grup',
    origin: 'Samsun İlkadım',
    icon: 'ri-emotion-happy-line',
    summary: 'Çocuklara özel dayanıklı tasarım ve aile destek programları.',
    brands: [{ name: 'Pediatrik Grup', note: 'BTE ve güçlü pediatrik modeller' }],
  },
];

export const CATALOGS: CatalogEntry[] = [
  {
    slug: 'vista',
    lineName: 'Vista',
    title: 'Vista İşitme Cihazları Kataloğu',
    subtitle: 'Şarjlı ve suya dayanıklı premium seri',
    summary:
      'Vista serisi, şarjlı gövde, Bluetooth bağlantı ve gürültülü ortamda konuşma netliği odaklı premium işitme çözümleri sunar.',
    intro: [
      'Vista cihazları ortam değişimlerine otomatik uyum sağlar. Akıllı telefon, televizyon ve toplantı ortamları için ayrı dinleme profilleri oluşturulabilir.',
      'Merkezimizde Vista modellerini deneyebilir; işitme testi sonuçlarınıza göre en uygun seçeneği uzman odyologlarımızla belirleyebilirsiniz.',
    ],
    series: [
      { name: 'Vista Premium', description: 'Şarjlı RIC, sosyal ortamlarda konuşma netliği odaklı üst segment.' },
      { name: 'Vista Advanced', description: 'RIC ve BTE formlarında dengeli performans.' },
      { name: 'Vista Power', description: 'İleri işitme kayıpları için güçlü amplifikasyon.' },
      { name: 'Vista Slim', description: 'Ultra ince kulak arkası formu ile estetik kullanım.' },
    ],
    seoTitle: 'Vista İşitme Cihazı Kataloğu Samsun | Hacettepe İşitme',
    seoDescription: 'Vista işitme cihazı modelleri Samsun’da. Premium RIC ve BTE serileri — ücretsiz test ve deneme.',
    keywords: 'Vista işitme cihazı, Vista katalog Samsun, şarjlı işitme cihazı',
  },
  {
    slug: 'a-m',
    lineName: 'A&M',
    title: 'A&M İşitme Cihazları Kataloğu',
    subtitle: 'Doğal ses ve kişisel dengeleme',
    summary:
      'A&M serisi, kendi sesinizi doğal duymanızı hedefleyen gelişmiş ses işleme ve şarjlı kullanım seçenekleri sunar.',
    intro: [
      'A&M cihazları gürültülü ortamda konuşma odağı ve mobil uygulama kontrolü ile günlük kullanımda konfor sağlar.',
      'Samsun merkezimizde A&M modellerini işitme testi sonrası deneme imkânıyla sunuyoruz.',
    ],
    series: [
      { name: 'A&M Premium', description: 'Şarjlı RIC, kişisel ses dengeleme ve Bluetooth.' },
      { name: 'A&M Style', description: 'İnce tasarım, şarjlı kullanım.' },
      { name: 'A&M Classic', description: 'Kulak arkası formunda güvenilir çözümler.' },
      { name: 'A&M Canal', description: 'Hazır kanal içi hızlı uygulama modelleri.' },
    ],
    seoTitle: 'A&M İşitme Cihazı Kataloğu Samsun',
    seoDescription: 'A&M işitme cihazı kataloğu Samsun Hacettepe İşitme’de. RIC ve BTE modelleri danışmanlığı.',
    keywords: 'A&M işitme cihazı, A&M katalog Samsun, şarjlı RIC',
  },
  {
    slug: 'nitro',
    lineName: 'Nitro',
    title: 'Nitro İşitme Cihazları Kataloğu',
    subtitle: 'Doğal ve dengeli dinleme deneyimi',
    summary:
      'Nitro serisi, çevresel sesleri dengeleyen gelişmiş işlemci ve şarjlı seçeneklerle doğal dinleme sunar.',
    intro: [
      'Nitro modelleri çoklu cihaz bağlantısı, tinnitus desteği ve kişiye özel kulak içi üretim seçenekleri içerir.',
      'Katalogtaki Nitro modellerini merkezimizde deneyerek günlük rutininize en uygun cihazı seçmenize yardımcı oluyoruz.',
    ],
    series: [
      { name: 'Nitro Elite', description: 'Gürültülü ortamda konuşma odaklı gelişmiş ses işleme.' },
      { name: 'Nitro Plus', description: 'RIC, Bluetooth ve tinnitus desteği.' },
      { name: 'Nitro Custom', description: 'Kişiye özel üretilen kulak içi modeller.' },
      { name: 'Nitro Power', description: 'İleri derece işitme kaybı için güçlü BTE.' },
    ],
    seoTitle: 'Nitro İşitme Cihazı Kataloğu Samsun | Hacettepe',
    seoDescription: 'Nitro işitme cihazı modelleri Samsun’da. RIC ve güçlü BTE serileri — ücretsiz test.',
    keywords: 'Nitro işitme cihazı, Nitro katalog Samsun, RIC işitme cihazı',
  },
  {
    slug: 'pediatrik',
    lineName: 'Pediatrik Grup',
    title: 'Pediatrik Grup İşitme Cihazları Kataloğu',
    subtitle: 'Çocuklara özel işitme çözümleri',
    summary:
      'Pediatrik Grup serisi, çocuklarda erken müdahale, dayanıklı tasarım ve aile destek programlarıyla sunulur.',
    intro: [
      'Renkli kabuklar, güvenli pil yuvası ve okul ortamı profilleri ile çocuk danışanlarımıza özel programlar uygulanır.',
      'SGK süreçlerinde evrak desteği ve aile eğitimi merkezimizde sağlanır.',
    ],
    series: [
      { name: 'Pediatrik Grup RIC', description: 'Dayanıklı pediatrik RIC, LED durum göstergesi.' },
      { name: 'Pediatrik Grup BTE', description: 'Renkli kabuklu çocuk BTE modelleri.' },
      { name: 'Pediatrik Grup Active', description: 'Güvenli pil yuvası ve aktif kullanım.' },
      { name: 'Pediatrik Grup Power', description: 'İleri kayıp ve implant uyumlu güçlü modeller.' },
    ],
    seoTitle: 'Pediatrik Grup İşitme Cihazı Kataloğu Samsun',
    seoDescription: 'Pediatrik Grup işitme cihazları Samsun’da. Çocuk işitme cihazı danışmanlığı ve deneme.',
    keywords: 'pediatrik işitme cihazı Samsun, çocuk işitme cihazı katalog',
  },
];

const CATALOG_IMG = {
  vistaPremium: '/local-images/showcase/vista-showcase.png',
  amPremium: '/local-images/showcase/am-showcase.png',
  nitroElite: '/local-images/showcase/nitro-showcase.png',
  vistaPower: '/local-images/showcase/catalog-vista-power.png',
  nitroCustom: '/local-images/showcase/catalog-nitro-custom.png',
  pediatrik: '/local-images/pediatrik-isitme-cocuk.webp',
} as const;

export const FEATURED_PRODUCTS: HearingAidProduct[] = [
  {
    slug: 'vista-premium',
    lineName: 'Vista',
    name: 'Vista Premium',
    categorySlug: 'kulak-ici-hoparlorlu',
    type: 'Şarjlı RIC',
    description: 'Sosyal ortamlarda konuşma netliğini öne çıkaran, şarjlı ve Bluetooth destekli premium model.',
    features: ['Akıllı ortam algılama', 'Bluetooth bağlantı', 'Şarjlı gövde', 'IP68 koruma'],
    image: CATALOG_IMG.vistaPremium,
  },
  {
    slug: 'a-m-premium',
    lineName: 'A&M',
    name: 'A&M Premium',
    categorySlug: 'kulak-ici-hoparlorlu',
    type: 'Şarjlı RIC',
    description: 'Kişisel ses dengeleme ve gürültü yönetimi sunan şarjlı kulak içi hoparlörlü seri.',
    features: ['Kişisel ses dengeleme', 'Şarj istasyonu', 'Uygulama kontrolü', 'Gürültü yönetimi'],
    image: CATALOG_IMG.amPremium,
  },
  {
    slug: 'nitro-elite',
    lineName: 'Nitro',
    name: 'Nitro Elite',
    categorySlug: 'kulak-arkasi-cihaz',
    type: 'RIC / BTE',
    description: 'Çevresel sesleri dengeleyen, doğal dinleme sunan gelişmiş işlemci serisi.',
    features: ['Yapay zeka destekli işleme', 'Çoklu cihaz bağlantısı', 'Şarjlı seçenek', 'Tinnitus desteği'],
    image: CATALOG_IMG.nitroElite,
  },
  {
    slug: 'vista-power',
    lineName: 'Vista',
    name: 'Vista Power',
    categorySlug: 'kulak-arkasi-cihaz',
    type: 'Güçlü BTE',
    description: 'İleri ve profund işitme kayıpları için tasarlanmış yüksek güçlü kulak arkası model.',
    features: ['Güçlü amplifikasyon', 'Dayanıklı gövde', 'Uzaktan ayar', 'Su tozu direnci'],
    image: CATALOG_IMG.vistaPower,
  },
  {
    slug: 'nitro-custom',
    lineName: 'Nitro',
    name: 'Nitro Custom',
    categorySlug: 'kanal-ici-cihaz',
    type: 'Özel IIC',
    description: 'Kulak anatomisine göre üretilen, neredeyse görünmez kanal içi işitme cihazı.',
    features: ['Özel kalıp', 'Minimal görünüm', 'Doğal ses', 'Mobil ayar'],
    image: CATALOG_IMG.nitroCustom,
  },
  {
    slug: 'pediatrik-bte',
    lineName: 'Pediatrik Grup',
    name: 'Pediatrik Grup BTE',
    categorySlug: 'cocuk-isitme-cihazlari',
    type: 'BTE',
    description: 'Çocuklara özel dayanıklı gövde, renkli kabuk ve güvenli pil yuvası.',
    features: ['Dayanıklı tasarım', 'Renkli kabuk', 'Aile eğitimi', 'SGK uyumlu seçenekler'],
    image: CATALOG_IMG.pediatrik,
  },
];

export function getDeviceCategory(slug: string): DeviceCategory | undefined {
  return DEVICE_CATEGORIES.find((c) => c.slug === slug);
}

export function getCatalog(slug: string): CatalogEntry | undefined {
  return CATALOGS.find((c) => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string): HearingAidProduct[] {
  return FEATURED_PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}
