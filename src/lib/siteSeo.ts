import { absoluteUrl } from '@/lib/siteUrl';

export const SITE_NAME = 'Hacettepe İşitme Cihazları';
export const SITE_TAGLINE = 'Samsun İşitme Merkezi';
export const SITE_LOCALE = 'tr_TR';
export const SITE_LANGUAGE = 'tr-TR';

export const SITE_DEFAULT_KEYWORDS =
  'işitme cihazı Samsun, işitme testi Samsun, ücretsiz işitme testi, Phonak, Siemens, Oticon, SGK işitme cihazı, Hacettepe İşitme';

export const SITE_DEFAULT_OG_IMAGE = '/local-images/pro-hero-main.webp';

export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/hacettepeisitmecihazlari55/';
export const SITE_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi/@41.2694071,36.297792,17z';

export function defaultOgImageUrl(): string {
  return absoluteUrl(SITE_DEFAULT_OG_IMAGE);
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/local-images/brand-favicon.webp'),
    image: defaultOgImageUrl(),
    telephone: '+905334745806',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Eğitim Araştırma Karşısı Şok Market Üstü, Tepecik, 1537. Sokak 1B/b',
      postalCode: '55020',
      addressLocality: 'İlkadım',
      addressRegion: 'Samsun',
      addressCountry: 'TR',
    },
    sameAs: [SITE_INSTAGRAM_URL, SITE_GOOGLE_MAPS_URL],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    name: SITE_NAME,
    url: absoluteUrl('/'),
    inLanguage: SITE_LANGUAGE,
    description:
      "Samsun'da ücretsiz işitme testi, işitme cihazı satışı ve SGK danışmanlığı. Phonak, Siemens, Oticon yetkili merkez.",
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl('/'),
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: absoluteUrl('/randevu'),
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      name: 'Ücretsiz İşitme Testi Randevusu',
    },
  };
}
