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
  brand: string;
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
  brand: string;
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
      'Kulak arkası (BTE) işitme cihazları, elektronik üniteyi kulak kepçesinin arkasında taşır; ses kulak kanalına özel hortum veya kulak kalıbı ile iletilir. Hacettepe İşitme Merkezi olarak Samsun’da Phonak, Signia ve Oticon markalarının kulak arkası serilerini test ederek size en uygun modeli belirliyoruz.',
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
      'Samsun’da kulak arkası işitme cihazı modelleri, Phonak, Signia ve Oticon seçenekleri. Ücretsiz test, uyarlama ve SGK danışmanlığı.',
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
      'Tüm marka işitme cihazlarında bakım, onarım, kulak kalıbı yenileme ve yazılım güncellemesi.',
    paragraphs: [
      'Hacettepe İşitme Merkezi teknik servis biriminde kulak kalıbı tamiri, hoparlör değişimi, gövde temizliği ve yazılım güncellemeleri yapılır. Satış sonrası periyodik kontroller cihaz ömrünü uzatır.',
      'Samsun içi danışanlarımız için hızlı servis randevusu; il dışından gelen cihazlarda ön inceleme sonrası işlem planı paylaşılır.',
    ],
    highlights: [
      'Çok markalı servis desteği',
      'Kulak kalıbı üretim ve yenileme',
      'Yazılım güncelleme ve uyarlama',
      'Periyodik bakım hatırlatması',
    ],
    seoTitle: 'İşitme Cihazı Teknik Servis Samsun | Bakım Onarım',
    seoDescription:
      'Samsun’da işitme cihazı teknik servis, bakım ve onarım. Phonak, Signia, Oticon ve diğer markalar için uzman servis.',
    keywords: 'işitme cihazı tamiri Samsun, teknik servis işitme cihazı, işitme cihazı bakım',
  },
];

export const BRAND_GROUPS: BrandGroup[] = [
  {
    slug: 'isvicre',
    title: 'İsviçre Markaları',
    origin: 'İsviçre',
    icon: 'ri-flag-line',
    summary: 'Phonak (Sonova) liderliğinde gelişmiş ses işleme ve kablosuz ekosistem.',
    brands: [
      { name: 'Phonak', note: 'Audéo, Naída ve Lumity serileri — merkezimizde aktif satış' },
    ],
  },
  {
    slug: 'almanya',
    title: 'Almanya Markaları',
    origin: 'Almanya',
    icon: 'ri-building-2-line',
    summary: 'Signia (eski Siemens) ve Audifon ile güçlü Alman mühendisliği.',
    brands: [
      { name: 'Signia (Siemens)', note: 'Pure, Motion ve IX platformu' },
      { name: 'Audifon', note: 'Kanal içi ve kulak arkası çözümler' },
    ],
  },
  {
    slug: 'danimarka',
    title: 'Danimarka Markaları',
    origin: 'Danimarka',
    icon: 'ri-global-line',
    summary: 'Oticon, ReSound ve Widex ile doğal ses odaklı teknolojiler.',
    brands: [
      { name: 'Oticon', note: 'Real ve Intent serileri — BrainHearing yaklaşımı' },
      { name: 'ReSound', note: 'GN işitme grubu, iPhone uyumlu modeller' },
      { name: 'Widex', note: 'Çınlama yönetimi ve doğal ses profilleri' },
    ],
  },
  {
    slug: 'amerika',
    title: 'Amerika Markaları',
    origin: 'Amerika Birleşik Devletleri',
    icon: 'ri-earth-line',
    summary: 'Starkey ve NuEar ile yapay zeka destekli ortam analizi.',
    brands: [
      { name: 'Starkey', note: 'Genesis AI ve Edge serileri' },
      { name: 'NuEar', note: 'Starkey grubu, kişiselleştirilmiş deneyim' },
    ],
  },
];

export const CATALOGS: CatalogEntry[] = [
  {
    slug: 'phonak',
    brand: 'Phonak',
    title: 'Phonak İşitme Cihazları Kataloğu',
    subtitle: 'Sonova teknolojisi ile her ortamda net duyma',
    summary:
      'Phonak, dünya genelinde en çok tercih edilen işitme cihazı markalarından biridir. Hacettepe İşitme Merkezi Samsun’da Phonak Audéo, Naída ve Lumity ailelerini stoklu ve siparişle sunmaktadır.',
    intro: [
      'Phonak cihazları AutoSense ve Dynamic Noise Cancellation gibi özelliklerle ortam değişimlerine otomatik uyum sağlar. Bluetooth bağlantı ile akıllı telefon, televizyon ve toplantı uygulamalarına doğrudan ses aktarımı mümkündür.',
      'Merkezimizde Phonak katalog modellerini deneyebilir; işitme testi sonuçlarınıza göre en uygun seriyi uzman odyologlarımızla birlikte seçebilirsiniz.',
    ],
    series: [
      { name: 'Phonak Audéo Lumity', description: 'Şarjlı RIC tasarım, sosyal ortamlarda konuşma netliği odaklı premium seri.' },
      { name: 'Phonak Naída', description: 'İleri ve profund işitme kayıpları için güçlü amplifikasyon ve dayanıklı gövde.' },
      { name: 'Phonak Virto', description: 'Kulak içi özel kalıp ile üretilen estetik modeller.' },
      { name: 'Phonak Slim', description: 'Ultra ince kulak arkası formu ile modern ve hafif kullanım.' },
    ],
    seoTitle: 'Phonak İşitme Cihazı Kataloğu Samsun | Hacettepe İşitme',
    seoDescription:
      'Phonak işitme cihazı modelleri ve katalog bilgisi Samsun’da. Lumity, Audéo, Naída serileri — ücretsiz test ve deneme.',
    keywords: 'Phonak katalog, Phonak işitme cihazı Samsun, Phonak Lumity, Phonak fiyat',
  },
  {
    slug: 'signia',
    brand: 'Signia',
    title: 'Signia (Siemens) İşitme Cihazları Kataloğu',
    subtitle: 'Alman mühendisliği ile net ve doğal ses',
    summary:
      'Signia, Siemens işitme mirasını taşıyan global bir markadır. Pure, Motion ve yeni nesil IX platformu ile farklı işitme profillerine özel çözümler sunar.',
    intro: [
      'Signia cihazları Own Voice Processing teknolojisi ile kullanıcının kendi sesini daha doğal algılamasına yardımcı olur. Şarjlı ve pil ile çalışan geniş model yelpazesi mevcuttur.',
      'Samsun merkezimizde Signia katalog ürünlerini işitme testi sonrası deneme imkânıyla sunuyor; SGK destekli modeller hakkında bilgi veriyoruz.',
    ],
    series: [
      { name: 'Signia Pure Charge&Go', description: 'Şarjlı RIC, Bluetooth ve el hareketi kontrolü ile günlük kullanım.' },
      { name: 'Signia Motion', description: 'Kulak arkası formunda güvenilir ve ekonomik çözümler.' },
      { name: 'Signia Silk', description: 'Hazır kanal içi modeller ile hızlı uygulama.' },
      { name: 'Signia Styletto', description: 'İnce ve şık tasarımıyla öne çıkan kulak arkası seri.' },
    ],
    seoTitle: 'Signia Siemens İşitme Cihazı Kataloğu Samsun',
    seoDescription:
      'Signia (Siemens) işitme cihazı kataloğu ve modelleri Samsun Hacettepe İşitme’de. Pure, Motion, IX serileri danışmanlığı.',
    keywords: 'Signia katalog, Siemens işitme cihazı Samsun, Signia Pure, Signia fiyat',
  },
  {
    slug: 'oticon',
    brand: 'Oticon',
    title: 'Oticon İşitme Cihazları Kataloğu',
    subtitle: 'BrainHearing ile beyin odaklı işitme deneyimi',
    summary:
      'Oticon, Danimarka merkezli bir marka olarak doğal ses işlemeye odaklanır. Real ve Intent serileri merkezimizde danışmanlık ve satış kapsamındadır.',
    intro: [
      'Oticon More ve Real platformları, çevredeki tüm sesleri dengeleyerek beyinin işitsel bilgiyi işlemesine destek olur. Çoklu cihaz bağlantısı ve şarjlı seçenekler sunulur.',
      'Katalogtaki Oticon modellerini merkezimizde deneyerek günlük rutininize en uygun cihazı seçmenize yardımcı oluyoruz.',
    ],
    series: [
      { name: 'Oticon Real', description: 'Gürültülü ortamlarda konuşma odaklı gelişmiş ses işleme.' },
      { name: 'Oticon Intent', description: 'Yeni nesil platform, kişiselleştirilmiş dinleme niyeti algılama.' },
      { name: 'Oticon Own', description: 'Tamamen kişiye özel üretilen kulak içi modeller.' },
      { name: 'Oticon Xceed', description: 'İleri derece işitme kaybı için güçlü kulak arkası çözümler.' },
    ],
    seoTitle: 'Oticon İşitme Cihazı Kataloğu Samsun | Hacettepe',
    seoDescription:
      'Oticon işitme cihazı modelleri Samsun’da. Real, Intent ve Xceed serileri — ücretsiz işitme testi ve uyarlama.',
    keywords: 'Oticon katalog, Oticon işitme cihazı Samsun, Oticon Real, Oticon fiyat',
  },
  {
    slug: 'resound',
    brand: 'ReSound',
    title: 'ReSound İşitme Cihazları Kataloğu',
    subtitle: 'GN işitme teknolojisi ile bağlantılı dinleme',
    summary:
      'ReSound (GN Hearing), iPhone ve Android uyumlu kablosuz bağlantısıyla bilinen Danimarka kökenli bir markadır. Merkezimizde ReSound modelleri için katalog danışmanlığı verilmektedir.',
    intro: [
      'ReSound OMNIA ve Key serileri, konuşma anlaşılırlığını artırmaya yönelik algoritmalar içerir. Şarjlı kulak arkası ve RIC modelleri aktif yaşam tarzına uygundur.',
      'Katalog bilgisi ve fiyat danışmanlığı için merkezimize randevu alabilirsiniz.',
    ],
    series: [
      { name: 'ReSound OMNIA', description: 'Gürültülü ortamda konuşma netliği için geliştirilmiş flagship seri.' },
      { name: 'ReSound Key', description: 'Erişilebilir fiyat segmentinde güvenilir performans.' },
      { name: 'ReSound LiNX Quattro', description: 'Kablosuz streaming ve uzaktan ayar desteği.' },
      { name: 'ReSound ENZO', description: 'Profund işitme kaybı için güçlü BTE modeller.' },
    ],
    seoTitle: 'ReSound İşitme Cihazı Kataloğu Samsun',
    seoDescription:
      'ReSound işitme cihazı kataloğu ve modelleri Samsun Hacettepe İşitme Merkezi’nde. OMNIA, Key serileri danışmanlığı.',
    keywords: 'ReSound katalog, ReSound işitme cihazı Samsun, GN ReSound',
  },
  {
    slug: 'starkey',
    brand: 'Starkey',
    title: 'Starkey İşitme Cihazları Kataloğu',
    subtitle: 'Yapay zeka destekli Amerikan teknolojisi',
    summary:
      'Starkey, Genesis AI platformu ile ortamı analiz eden ve dinleme deneyimini kişiselleştiren Amerikan menşeli bir markadır. NuEar markası da aynı gruba bağlıdır.',
    intro: [
      'Starkey cihazları sağlık takibi, düşme algılama ve gelişmiş gürültü yönetimi gibi özellikler sunabilir. Merkezimizde Starkey katalog modelleri için bilgi ve sipariş desteği sağlanır.',
      'İşitme testi sonrası Starkey ve NuEar serilerini karşılaştırmalı olarak değerlendirebilirsiniz.',
    ],
    series: [
      { name: 'Starkey Genesis AI', description: 'Yapay zeka ile ortam tanıma ve otomatik program geçişi.' },
      { name: 'Starkey Edge', description: 'Premium kulak içi ve RIC modeller.' },
      { name: 'NuEar Intrigue', description: 'Kişiselleştirilmiş ses profili ve şık tasarım.' },
      { name: 'Starkey Picasso', description: 'Tamamen özel üretim kulak içi çözümler.' },
    ],
    seoTitle: 'Starkey İşitme Cihazı Kataloğu Samsun | NuEar',
    seoDescription:
      'Starkey ve NuEar işitme cihazı kataloğu Samsun’da. Genesis AI serisi danışmanlık ve deneme randevusu.',
    keywords: 'Starkey katalog, Starkey işitme cihazı Samsun, NuEar, Genesis AI',
  },
];

export const FEATURED_PRODUCTS: HearingAidProduct[] = [
  {
    slug: 'phonak-audeo-lumity',
    brand: 'Phonak',
    name: 'Audéo Lumity',
    categorySlug: 'kulak-ici-hoparlorlu',
    type: 'Şarjlı RIC',
    description: 'Sosyal ortamlarda konuşma netliğini öne çıkaran, şarjlı ve Bluetooth destekli premium model.',
    features: ['AutoSense OS', 'Bluetooth bağlantı', 'Şarjlı gövde', 'IP68 koruma'],
    image: '/local-images/readdy-products-prod1opt.webp',
  },
  {
    slug: 'signia-pure-chargego',
    brand: 'Signia',
    name: 'Pure Charge&Go IX',
    categorySlug: 'kulak-ici-hoparlorlu',
    type: 'Şarjlı RIC',
    description: 'Kendi sesinizi doğal duymanızı hedefleyen IX platformlu Signia kulak içi hoparlörlü seri.',
    features: ['Own Voice Processing', 'Şarj istasyonu', 'Uygulama kontrolü', 'Gürültü yönetimi'],
    image: '/local-images/readdy-products-prod2opt.webp',
  },
  {
    slug: 'oticon-real',
    brand: 'Oticon',
    name: 'Oticon Real',
    categorySlug: 'kulak-arkasi-cihaz',
    type: 'RIC / BTE',
    description: 'BrainHearing yaklaşımıyla çevresel sesleri dengeleyen, doğal dinleme sunan Oticon serisi.',
    features: ['Deep Neural Network', 'Çoklu cihaz bağlantısı', 'Şarjlı seçenek', 'Tinnitus desteği'],
    image: '/local-images/readdy-products-prod3opt.webp',
  },
  {
    slug: 'phonak-naida',
    brand: 'Phonak',
    name: 'Naída Lumity',
    categorySlug: 'kulak-arkasi-cihaz',
    type: 'Güçlü BTE',
    description: 'İleri ve profund işitme kayıpları için tasarlanmış yüksek güçlü kulak arkası model.',
    features: ['Ultra güçlü amplifikasyon', 'Dayanıklı gövde', 'Roger uyumu', 'Su tozu direnci'],
    image: '/local-images/readdy-products-prod4opt.webp',
  },
  {
    slug: 'oticon-own',
    brand: 'Oticon',
    name: 'Oticon Own',
    categorySlug: 'kanal-ici-cihaz',
    type: 'Özel IIC',
    description: 'Kulak anatomisine göre 3D üretilen, neredeyse görünmez kanal içi işitme cihazı.',
    features: ['Özel 3D kalıp', 'Minimal görünüm', 'Doğal ses', 'Mobil ayar'],
    image: '/local-images/readdy-products-prod1opt.webp',
  },
  {
    slug: 'signia-motion',
    brand: 'Signia',
    name: 'Motion X',
    categorySlug: 'kulak-arkasi-cihaz',
    type: 'BTE',
    description: 'Günlük kullanımda güvenilir performans sunan, ekonomik segment kulak arkası model.',
    features: ['Kolay kullanım', 'Pil ve şarjlı versiyon', 'Bluetooth opsiyon', 'SGK uyumlu seçenekler'],
    image: '/local-images/readdy-products-prod2opt.webp',
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
