export interface RouteSeo {
  title: string;
  description: string;
  keywords?: string;
}

const DEFAULT_DESCRIPTION =
  "Samsun İlkadım'da işitme cihazları satışı, ücretsiz işitme testi, Phonak, Siemens ve Oticon markaları. Hacettepe İşitme Cihazları — 15 yıllık uzman destek.";

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Hacettepe İşitme Cihazları | Samsun İşitme Merkezi',
    description:
      "Samsun'da işitme cihazları satışı ve ücretsiz işitme testi. Phonak, Siemens, Oticon markaları, SGK desteği ve 30 gün deneme garantisi. İlkadım merkez.",
    keywords: 'işitme cihazı Samsun, Samsun işitme merkezi, ücretsiz işitme testi, Phonak Samsun, Siemens işitme cihazı',
  },
  '/hakkimizda': {
    title: 'Hakkımızda | Hacettepe İşitme Cihazları Samsun',
    description:
      '15 yıllık deneyimle Samsun İlkadım merkezinde işitme sağlığı hizmeti. Uzman odyoloji ekibi, kişiye özel cihaz uygulaması ve satış sonrası destek.',
    keywords: 'Hacettepe İşitme hakkında, Samsun odyoloji merkezi, işitme uzmanı Samsun',
  },
  '/randevu': {
    title: 'Online Randevu | Ücretsiz İşitme Testi Samsun',
    description:
      'Samsun Hacettepe İşitme Merkezi online randevu formu. Ücretsiz işitme testi, cihaz danışmanlığı ve aynı gün randevu imkanı.',
    keywords: 'işitme testi randevu Samsun, online randevu işitme, ücretsiz odyometri Samsun',
  },
  '/iletisim': {
    title: 'İletişim | Hacettepe İşitme Cihazları Samsun',
    description:
      'Adres: Tepecik İlkadım Samsun. Telefon +90 533 474 58 06, WhatsApp ve iletişim formu. Google Haritalar yol tarifi.',
    keywords: 'Hacettepe İşitme iletişim, Samsun işitme merkezi adres, işitme cihazı telefon Samsun',
  },
  '/ucretsiz-isitme-testi': {
    title: 'Ücretsiz İşitme Testi Samsun | Hacettepe İşitme',
    description:
      'Samsun İlkadım’da ücretsiz işitme testi ve uzman odyolog değerlendirmesi. Kişiye özel işitme cihazı önerileri ve SGK bilgilendirmesi.',
    keywords: 'ücretsiz işitme testi Samsun, işitme testi İlkadım, odyometri testi Samsun',
  },
  '/online-isitme-testi': {
    title: 'Online İşitme Testi | Ön Değerlendirme — Samsun',
    description:
      'Evden online işitme testi ile ön değerlendirme yapın. Sonuçlar bilgilendirme amaçlıdır; kesin tanı için Samsun merkezimizde ücretsiz klinik test önerilir.',
    keywords: 'online işitme testi, internet işitme testi Türkçe, işitme kaybı testi',
  },
  '/isitme-cihazi-fiyatlari': {
    title: 'İşitme Cihazı Fiyatları 2024-2025 | Samsun',
    description:
      'İşitme cihazı fiyatlarını etkileyen faktörler, Phonak, Siemens, Oticon modelleri ve SGK ödeme desteği. Samsun merkezimizde ücretsiz fiyat danışmanlığı.',
    keywords: 'işitme cihazı fiyatları, işitme cihazı fiyat Samsun, SGK işitme cihazı fiyat',
  },
  '/samsun-isitme-testi': {
    title: 'Samsun İşitme Testi | Ücretsiz Odyometri',
    description:
      'Samsun’da ücretsiz işitme testi, odyometri ve işitme cihazı danışmanlığı. Hacettepe İşitme Merkezi randevu, adres ve çalışma saatleri.',
    keywords: 'Samsun işitme testi, işitme testi Samsun ücretsiz, Samsun odyoloji',
  },
  '/sgk-odeme-tutarlari': {
    title: 'SGK İşitme Cihazı Ödeme Tutarları | Samsun',
    description:
      'SGK işitme cihazı ödeme tutarları, başvuru belgeleri ve süreç. Samsun Hacettepe İşitme Merkezi’nde SGK danışmanlığı ve cihaz uygulaması.',
    keywords: 'SGK işitme cihazı ödeme, SGK işitme cihazı tutarları, işitme cihazı SGK Samsun',
  },
  '/blog': {
    title: 'İşitme Sağlığı Blogu | Hacettepe İşitme Samsun',
    description:
      'İşitme kaybı, cihaz teknolojileri, bakım ipuçları ve SGK süreçleri hakkında uzman blog yazıları. Samsun işitme merkezi rehberleri.',
    keywords: 'işitme sağlığı blog, işitme cihazı bakımı, işitme kaybı belirtileri',
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
  return ROUTE_SEO[pathname] ?? null;
}

export function getDefaultDescription(): string {
  return DEFAULT_DESCRIPTION;
}
