export interface RouteSeo {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

const DEFAULT_DESCRIPTION =
  "Samsun İlkadım'da işitme cihazları satışı, ücretsiz işitme testi, Phonak, Siemens ve Oticon markaları. Hacettepe İşitme Cihazları — 15 yıllık uzman destek.";

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Samsun İşitme Cihazları | Ücretsiz Test — Hacettepe İşitme Merkezi',
    description:
      "Samsun İlkadım'da işitme cihazı satışı ve ücretsiz işitme testi. Phonak, Siemens, Oticon, SGK desteği, 30 gün deneme. Tepecik merkez — aynı gün randevu: +90 533 474 58 06.",
    keywords:
      'işitme cihazı Samsun, Samsun işitme cihazı, Samsun işitme merkezi, ücretsiz işitme testi Samsun, işitme testi Samsun, Phonak Samsun, İlkadım işitme merkezi',
    image: '/local-images/pro-hero-main.webp',
  },
  '/hakkimizda': {
    title: 'Hakkımızda | Hacettepe İşitme Cihazları Samsun',
    description:
      '15 yıllık deneyimle Samsun İlkadım merkezinde işitme sağlığı hizmeti. Uzman odyoloji ekibi, kişiye özel cihaz uygulaması ve satış sonrası destek.',
    keywords:
      'Hacettepe İşitme hakkında, Samsun odyoloji merkezi, işitme uzmanı Samsun, işitme cihazı danışmanlığı',
    image: '/local-images/pro-hero-main.webp',
  },
  '/randevu': {
    title: 'Online Randevu | Ücretsiz İşitme Testi Samsun',
    description:
      'Samsun Hacettepe İşitme Merkezi online randevu formu. Ücretsiz işitme testi, cihaz danışmanlığı ve aynı gün randevu imkanı. Tepecik, İlkadım.',
    keywords:
      'işitme testi randevu Samsun, online randevu işitme, ücretsiz odyometri Samsun, işitme merkezi randevu',
    image: '/local-images/pro-hero-main.webp',
  },
  '/iletisim': {
    title: 'İletişim | Hacettepe İşitme Cihazları Samsun — Adres & Telefon',
    description:
      'Adres: Tepecik İlkadım Samsun. Telefon +90 533 474 58 06, WhatsApp ve iletişim formu. Google Haritalar yol tarifi ve çalışma saatleri.',
    keywords:
      'Hacettepe İşitme iletişim, Samsun işitme merkezi adres, işitme cihazı telefon Samsun, Tepecik işitme merkezi',
    image: '/local-images/pro-hero-main.webp',
  },
  '/ucretsiz-isitme-testi': {
    title: 'Ücretsiz İşitme Testi Samsun | Hacettepe İşitme Merkezi',
    description:
      'Samsun İlkadım’da ücretsiz işitme testi ve uzman odyolog değerlendirmesi. Kişiye özel işitme cihazı önerileri, SGK bilgilendirmesi ve 30 gün deneme.',
    keywords:
      'ücretsiz işitme testi Samsun, işitme testi İlkadım, odyometri testi Samsun, ücretsiz odyoloji Samsun',
    image: '/local-images/pro-hero-main.webp',
  },
  '/online-isitme-testi': {
    title: 'Online İşitme Testi | Ön Değerlendirme — Samsun',
    description:
      'Evden online işitme testi ile ön değerlendirme yapın. Sonuçlar bilgilendirme amaçlıdır; kesin tanı için Samsun merkezimizde ücretsiz klinik test önerilir.',
    keywords:
      'online işitme testi, internet işitme testi Türkçe, işitme kaybı testi, evde işitme testi',
    image: '/local-images/pro-hero-main.webp',
  },
  '/isitme-cihazlari': {
    title: 'İşitme Cihazları Samsun | Phonak, Signia, Oticon — Hacettepe',
    description:
      'Kulak arkası, kulak içi, RIC ve çocuk işitme cihazları. Samsun İlkadım’da ücretsiz test, marka katalogları ve SGK danışmanlığı.',
    keywords:
      'işitme cihazları Samsun, Phonak Samsun, Signia Siemens, Oticon, işitme cihazı modelleri',
    image: '/local-images/pro-hero-main.webp',
  },
  '/katalog': {
    title: 'İşitme Cihazı Katalogları Samsun | Phonak, Signia, Oticon',
    description:
      'Phonak, Signia, Oticon, ReSound ve Starkey işitme cihazı katalogları. Samsun Hacettepe İşitme Merkezi’nde katalog danışmanlığı ve deneme.',
    keywords:
      'işitme cihazı katalog, Phonak katalog Samsun, Signia katalog, Oticon katalog',
    image: '/local-images/pro-hero-main.webp',
  },
  '/isitme-cihazi-fiyatlari': {
    title: 'İşitme Cihazı Fiyatları 2025 | Samsun — Phonak, Siemens, Oticon',
    description:
      'İşitme cihazı fiyatlarını etkileyen faktörler, Phonak, Siemens, Oticon modelleri ve SGK ödeme desteği. Samsun merkezimizde ücretsiz fiyat danışmanlığı.',
    keywords:
      'işitme cihazı fiyatları, işitme cihazı fiyat Samsun, SGK işitme cihazı fiyat, Phonak fiyat, Siemens işitme cihazı fiyat',
    image: '/local-images/pro-hero-main.webp',
  },
  '/samsun-isitme-cihazi': {
    title: 'Samsun İşitme Cihazı | Phonak, Siemens, Oticon — Hacettepe',
    description:
      'Samsun’da işitme cihazı satışı, ücretsiz test ve SGK danışmanlığı. İlkadım Tepecik merkez, Phonak, Siemens, Oticon, 30 gün deneme garantisi.',
    keywords:
      'Samsun işitme cihazı, işitme cihazı Samsun, işitme merkezi Samsun, Phonak Samsun, Siemens Samsun, Oticon Samsun',
    image: '/local-images/pro-hero-main.webp',
  },
  '/samsun-isitme-testi': {
    title: 'Samsun İşitme Testi | Ücretsiz Odyometri — Hacettepe İşitme',
    description:
      'Samsun’da ücretsiz işitme testi, odyometri ve işitme cihazı danışmanlığı. Hacettepe İşitme Merkezi randevu, adres, çalışma saatleri ve yol tarifi.',
    keywords:
      'Samsun işitme testi, işitme testi Samsun ücretsiz, Samsun odyoloji, Samsun işitme merkezi, odyometri Samsun',
    image: '/local-images/pro-hero-main.webp',
  },
  '/sgk-odeme-tutarlari': {
    title: 'SGK İşitme Cihazı Ödeme Tutarları 2025 | Samsun',
    description:
      'SGK işitme cihazı ödeme tutarları, başvuru belgeleri ve süreç. Samsun Hacettepe İşitme Merkezi’nde SGK danışmanlığı ve cihaz uygulaması.',
    keywords:
      'SGK işitme cihazı ödeme, SGK işitme cihazı tutarları, işitme cihazı SGK Samsun, SGK işitme cihazı başvuru',
    image: '/local-images/pro-hero-main.webp',
  },
  '/blog': {
    title: 'İşitme Sağlığı Blogu | Hacettepe İşitme Samsun',
    description:
      'İşitme kaybı, cihaz teknolojileri, bakım ipuçları ve SGK süreçleri hakkında uzman blog yazıları. Samsun işitme merkezi rehberleri.',
    keywords:
      'işitme sağlığı blog, işitme cihazı bakımı, işitme kaybı belirtileri, işitme rehberi Samsun',
    image: '/local-images/pro-hero-main.webp',
  },
  '/gizlilik-politikasi': {
    title: 'Gizlilik Politikası | Hacettepe İşitme Cihazları',
    description: 'Kişisel verilerin korunması, çerez kullanımı ve gizlilik politikamız.',
    keywords: 'gizlilik politikası',
  },
  '/kullanim-kosullari': {
    title: 'Kullanım Koşulları | Hacettepe İşitme Cihazları',
    description: 'Web sitesi kullanım koşulları, sorumluluk reddi ve yasal bilgilendirme.',
    keywords: 'kullanım koşulları',
  },
  '/kvkk-aydinlatma-metni': {
    title: 'KVKK Aydınlatma Metni | Hacettepe İşitme Cihazları',
    description: '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
    keywords: 'KVKK aydınlatma metni, kişisel veri',
  },
};

export function getRouteSeo(pathname: string): RouteSeo | null {
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    return null;
  }
  if (pathname.startsWith('/isitme-cihazlari/')) {
    return null;
  }
  if (pathname.startsWith('/katalog/')) {
    return null;
  }
  return ROUTE_SEO[pathname] ?? null;
}

export function getDefaultDescription(): string {
  return DEFAULT_DESCRIPTION;
}
