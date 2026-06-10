import { PAGE_IMAGES } from '@/lib/pageImages';
import { SITE_DEFAULT_OG_IMAGE } from '@/lib/siteSeo';

export interface RouteSeo {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

const DEFAULT_DESCRIPTION =
  "Samsun İlkadım'da işitme cihazları satışı, ücretsiz işitme testi, Vista, A&M ve Nitro serileri. Hacettepe İşitme Cihazları — 15 yıllık uzman destek.";

const ROUTE_IMAGES: Record<string, string> = {
  '/': SITE_DEFAULT_OG_IMAGE,
  '/hakkimizda': PAGE_IMAGES.about,
  '/randevu': PAGE_IMAGES.appointment,
  '/iletisim': PAGE_IMAGES.contact,
  '/ucretsiz-isitme-testi': PAGE_IMAGES.landing,
  '/online-isitme-testi': PAGE_IMAGES.onlineTest,
  '/isitme-cihazlari': PAGE_IMAGES.hearingAids,
  '/katalog': PAGE_IMAGES.catalog,
  '/isitme-cihazi-fiyatlari': PAGE_IMAGES.pricing,
  '/samsun-isitme-cihazi': PAGE_IMAGES.samsunDevice,
  '/samsun-isitme-testi': PAGE_IMAGES.samsunTest,
  '/sgk-odeme-tutarlari': PAGE_IMAGES.sgk,
  '/blog': PAGE_IMAGES.blog,
  '/gizlilik-politikasi': PAGE_IMAGES.privacy,
  '/kullanim-kosullari': PAGE_IMAGES.terms,
  '/kvkk-aydinlatma-metni': PAGE_IMAGES.kvkk,
};

function withImage(path: string, seo: Omit<RouteSeo, 'image'>): RouteSeo {
  return { ...seo, image: ROUTE_IMAGES[path] || SITE_DEFAULT_OG_IMAGE };
}

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': withImage('/', {
    title: 'Samsun İşitme Cihazları | Ücretsiz Test — Hacettepe İşitme Merkezi',
    description:
      "Samsun İlkadım'da işitme cihazı satışı ve ücretsiz işitme testi. Vista, A&M, Nitro serileri, SGK desteği, 30 gün deneme. Tepecik merkez — aynı gün randevu: +90 533 474 58 06.",
    keywords:
      'hacettepe işitme cihazları, işitme cihazı Samsun, Samsun işitme cihazı, Samsun işitme merkezi, ücretsiz işitme testi Samsun, işitme testi Samsun, Vista işitme cihazı Samsun, İlkadım işitme merkezi, Hacettepe İşitme Merkezi',
  }),
  '/hakkimizda': withImage('/hakkimizda', {
    title: 'Hakkımızda | Hacettepe İşitme Cihazları Samsun',
    description:
      '15 yıllık deneyimle Samsun İlkadım merkezinde işitme sağlığı hizmeti. Uzman odyoloji ekibi, kişiye özel cihaz uygulaması ve satış sonrası destek.',
    keywords:
      'Hacettepe İşitme hakkında, Samsun odyoloji merkezi, işitme uzmanı Samsun, işitme cihazı danışmanlığı',
  }),
  '/randevu': withImage('/randevu', {
    title: 'Online Randevu | Ücretsiz İşitme Testi Samsun',
    description:
      'Samsun Hacettepe İşitme Merkezi online randevu formu. Ücretsiz işitme testi, cihaz danışmanlığı ve aynı gün randevu imkanı. Tepecik, İlkadım.',
    keywords:
      'işitme testi randevu Samsun, online randevu işitme, ücretsiz odyometri Samsun, işitme merkezi randevu',
  }),
  '/iletisim': withImage('/iletisim', {
    title: 'İletişim | Hacettepe İşitme Cihazları Samsun — Adres & Telefon',
    description:
      'Adres: Tepecik İlkadım Samsun. Telefon +90 533 474 58 06, WhatsApp ve iletişim formu. Google Haritalar yol tarifi ve çalışma saatleri.',
    keywords:
      'Hacettepe İşitme iletişim, Samsun işitme merkezi adres, işitme cihazı telefon Samsun, Tepecik işitme merkezi',
  }),
  '/ucretsiz-isitme-testi': withImage('/ucretsiz-isitme-testi', {
    title: 'Ücretsiz İşitme Testi Samsun | Hacettepe İşitme Merkezi',
    description:
      "Samsun İlkadım'da ücretsiz işitme testi ve uzman odyolog değerlendirmesi. Kişiye özel işitme cihazı önerileri, SGK bilgilendirmesi ve 30 gün deneme.",
    keywords:
      'ücretsiz işitme testi Samsun, işitme testi İlkadım, odyometri testi Samsun, ücretsiz odyoloji Samsun',
  }),
  '/online-isitme-testi': withImage('/online-isitme-testi', {
    title: 'Online İşitme Testi | Ön Değerlendirme — Samsun',
    description:
      'Evden online işitme testi ile ön değerlendirme yapın. Sonuçlar bilgilendirme amaçlıdır; kesin tanı için Samsun merkezimizde ücretsiz klinik test önerilir.',
    keywords:
      'online işitme testi, internet işitme testi Türkçe, işitme kaybı testi, evde işitme testi',
  }),
  '/isitme-cihazlari': withImage('/isitme-cihazlari', {
    title: 'İşitme Cihazları Samsun | Vista, A&M, Nitro — Hacettepe',
    description:
      "Vista, A&M, Nitro ve Pediatrik Grup işitme cihazları. Samsun İlkadım'da ücretsiz test, deneme ve SGK danışmanlığı.",
    keywords:
      'işitme cihazları Samsun, Vista işitme cihazı, A&M işitme cihazı, Nitro işitme cihazı, pediatrik işitme cihazı',
  }),
  '/katalog': withImage('/katalog', {
    title: 'İşitme Cihazı Katalogları Samsun | Vista, A&M, Nitro',
    description:
      "Vista, A&M, Nitro ve Pediatrik Grup işitme cihazı katalogları. Samsun Hacettepe İşitme Merkezi'nde danışmanlık ve deneme.",
    keywords:
      'işitme cihazı katalog, Vista katalog Samsun, A&M işitme cihazı, Nitro katalog',
  }),
  '/isitme-cihazi-fiyatlari': withImage('/isitme-cihazi-fiyatlari', {
    title: 'İşitme Cihazı Fiyatları 2025 | Samsun — Vista, A&M, Nitro',
    description:
      'İşitme cihazı fiyatlarını etkileyen faktörler, Vista, A&M, Nitro ve Pediatrik Grup modelleri ile SGK ödeme desteği. Ücretsiz fiyat danışmanlığı.',
    keywords:
      'işitme cihazı fiyatları, işitme cihazı fiyat Samsun, SGK işitme cihazı fiyat, Vista fiyat, Nitro işitme cihazı fiyat',
  }),
  '/samsun-isitme-cihazi': withImage('/samsun-isitme-cihazi', {
    title: 'Samsun İşitme Cihazı | Vista, A&M, Nitro — Hacettepe',
    description:
      "Samsun'da işitme cihazı satışı, ücretsiz test ve SGK danışmanlığı. İlkadım Tepecik merkez, Vista, A&M, Nitro serileri, 30 gün deneme garantisi.",
    keywords:
      'Samsun işitme cihazı, işitme cihazı Samsun, işitme merkezi Samsun, Vista Samsun, Nitro işitme cihazı Samsun, hacettepe işitme cihazları',
  }),
  '/samsun-isitme-testi': withImage('/samsun-isitme-testi', {
    title: 'Samsun İşitme Testi | Ücretsiz Odyometri — Hacettepe İşitme',
    description:
      "Samsun'da ücretsiz işitme testi, odyometri ve işitme cihazı danışmanlığı. Hacettepe İşitme Merkezi randevu, adres, çalışma saatleri ve yol tarifi.",
    keywords:
      'Samsun işitme testi, işitme testi Samsun ücretsiz, Samsun odyoloji, Samsun işitme merkezi, odyometri Samsun',
  }),
  '/sgk-odeme-tutarlari': withImage('/sgk-odeme-tutarlari', {
    title: 'SGK İşitme Cihazı Ödeme Tutarları 2025 | Samsun',
    description:
      "SGK işitme cihazı ödeme tutarları, başvuru belgeleri ve süreç. Samsun Hacettepe İşitme Merkezi'nde SGK danışmanlığı ve cihaz uygulaması.",
    keywords:
      'SGK işitme cihazı ödeme, SGK işitme cihazı tutarları, işitme cihazı SGK Samsun, SGK işitme cihazı başvuru',
  }),
  '/blog': withImage('/blog', {
    title: 'İşitme Sağlığı Blogu | Hacettepe İşitme Samsun',
    description:
      'İşitme kaybı, cihaz teknolojileri, bakım ipuçları ve SGK süreçleri hakkında uzman blog yazıları. Samsun işitme merkezi rehberleri.',
    keywords:
      'işitme sağlığı blog, işitme cihazı bakımı, işitme kaybı belirtileri, işitme rehberi Samsun',
  }),
  '/gizlilik-politikasi': withImage('/gizlilik-politikasi', {
    title: 'Gizlilik Politikası | Hacettepe İşitme Cihazları',
    description: 'Kişisel verilerin korunması, çerez kullanımı ve gizlilik politikamız.',
    keywords: 'gizlilik politikası',
  }),
  '/kullanim-kosullari': withImage('/kullanim-kosullari', {
    title: 'Kullanım Koşulları | Hacettepe İşitme Cihazları',
    description: 'Web sitesi kullanım koşulları, sorumluluk reddi ve yasal bilgilendirme.',
    keywords: 'kullanım koşulları',
  }),
  '/kvkk-aydinlatma-metni': withImage('/kvkk-aydinlatma-metni', {
    title: 'KVKK Aydınlatma Metni | Hacettepe İşitme Cihazları',
    description: '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.',
    keywords: 'KVKK aydınlatma metni, kişisel veri',
  }),
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
