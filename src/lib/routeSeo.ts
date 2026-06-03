export interface RouteSeo {
  title: string;
  description: string;
}

const DEFAULT_DESCRIPTION =
  "Samsun'da işitme cihazları satışı, ücretsiz işitme testi ve uzman odyoloji desteği. Hacettepe İşitme Cihazları.";

export const ROUTE_SEO: Record<string, RouteSeo> = {
  '/': {
    title: 'Hacettepe İşitme Cihazları | Samsun İşitme Merkezi',
    description:
      "Samsun'da işitme cihazları satışı ve ücretsiz işitme testi hizmeti. Siemens, Phonak ve Oticon markalarıyla 15 yıllık deneyim.",
  },
  '/hakkimizda': {
    title: 'Hakkımızda | Hacettepe İşitme Cihazları Samsun',
    description:
      'Hacettepe İşitme Cihazları ekibi, değerlerimiz ve Samsun merkezimizde sunduğumuz işitme sağlığı hizmetleri.',
  },
  '/randevu': {
    title: 'Online Randevu | Hacettepe İşitme Cihazları Samsun',
    description:
      'Ücretsiz işitme testi ve cihaz danışmanlığı için online randevu formu. Samsun İlkadım merkezimiz.',
  },
  '/iletisim': {
    title: 'İletişim | Hacettepe İşitme Cihazları Samsun',
    description:
      'Adres, telefon, WhatsApp ve iletişim formu ile Hacettepe İşitme Cihazları Samsun merkezine ulaşın.',
  },
  '/ucretsiz-isitme-testi': {
    title: 'Ücretsiz İşitme Testi | Hacettepe İşitme Cihazları Samsun',
    description:
      'Samsun’da ücretsiz işitme testi randevusu alın. Uzman değerlendirme ve kişiye özel cihaz önerileri.',
  },
  '/online-isitme-testi': {
    title: 'Online İşitme Testi | Hacettepe İşitme Cihazları Samsun',
    description:
      'Evden ön değerlendirme için online işitme testi. Sonuçlar bilgilendirme amaçlıdır; klinik test önerilir.',
  },
  '/isitme-cihazi-fiyatlari': {
    title: 'İşitme Cihazı Fiyatları | Hacettepe İşitme Cihazları Samsun',
    description:
      'İşitme cihazı fiyatlarını etkileyen faktörler, markalar ve SGK desteği hakkında güncel bilgiler.',
  },
  '/samsun-isitme-testi': {
    title: 'Samsun İşitme Testi | Hacettepe İşitme Cihazları',
    description:
      'Samsun’da ücretsiz işitme testi, odyometri ve işitme cihazı danışmanlığı. Randevu ve merkez bilgileri.',
  },
  '/sgk-odeme-tutarlari': {
    title: 'SGK Ödeme Tutarları | Hacettepe İşitme Cihazları Samsun',
    description:
      'İşitme cihazlarında SGK ödeme tutarları, başvuru süreci ve merkezimizdeki danışmanlık hizmeti.',
  },
  '/blog': {
    title: 'Blog | Hacettepe İşitme Cihazları Samsun',
    description:
      'İşitme sağlığı, cihaz teknolojileri, bakım ve SGK süreçleri hakkında uzman blog yazıları.',
  },
  '/gizlilik-politikasi': {
    title: 'Gizlilik Politikası | Hacettepe İşitme Cihazları Samsun',
    description: 'Kişisel verilerin korunması ve gizlilik politikamız.',
  },
  '/kullanim-kosullari': {
    title: 'Kullanım Koşulları | Hacettepe İşitme Cihazları Samsun',
    description: 'Web sitesi kullanım koşulları ve yasal bilgilendirme.',
  },
  '/kvkk-aydinlatma-metni': {
    title: 'KVKK Aydınlatma Metni | Hacettepe İşitme Cihazları Samsun',
    description: '6698 sayılı KVKK kapsamında aydınlatma metni.',
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
