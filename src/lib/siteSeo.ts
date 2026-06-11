import {
  SITE_GOOGLE_BUSINESS_URL,
  SITE_MAP_LAT,
  SITE_MAP_LNG,
  SITE_MAP_URL,
} from '@/lib/siteContact';
import { absoluteUrl } from '@/lib/siteUrl';

export const SITE_NAME = 'Hacettepe İşitme Cihazları';
export const SITE_TAGLINE = 'Samsun İşitme Merkezi';
export const SITE_LOCALE = 'tr_TR';
export const SITE_LANGUAGE = 'tr-TR';
export const SITE_CANONICAL_HOST = 'hacettepeisitme.com.tr';

export const SITE_DEFAULT_KEYWORDS =
  'hacettepe işitme cihazları, işitme cihazı Samsun, işitme testi Samsun, ücretsiz işitme testi, Vista, A&M, Nitro, SGK işitme cihazı, Hacettepe İşitme, Samsun Hacettepe İşitme Merkezi';

export const SITE_DEFAULT_OG_IMAGE = '/local-images/home-flow/flow-reception.webp';

export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/hacettepeisitmecihazlari55/';
/** Tam adres araması — yol tarifi ve konum için birincil link */
export const SITE_GOOGLE_MAPS_URL = SITE_MAP_URL;
/** Google İşletme profili (Tepecik CID) */
export const SITE_GOOGLE_MAPS_URL_ALT = SITE_GOOGLE_BUSINESS_URL;
export const SITE_GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi+Yorumlar&hl=tr';

/** Google İşletme profili — schema sameAs ve yerel SEO için */
export const SITE_SAME_AS = [
  absoluteUrl('/'),
  SITE_GOOGLE_MAPS_URL,
  SITE_GOOGLE_MAPS_URL_ALT,
  SITE_GOOGLE_REVIEWS_URL,
  SITE_INSTAGRAM_URL,
] as const;

export const SITE_GOOGLE_RATING = 4.9;
export const SITE_GOOGLE_REVIEW_COUNT = 37;

export function defaultOgImageUrl(): string {
  return absoluteUrl(SITE_DEFAULT_OG_IMAGE);
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: SITE_NAME,
    alternateName: [
      'Samsun Hacettepe İşitme Merkezi',
      'Hacettepe İşitme Merkezi',
      'Hacettepe İşitme Cihazları Samsun',
    ],
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
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+905334745806',
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: ['Turkish'],
    },
    sameAs: [...SITE_SAME_AS],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl('/')}#website`,
    name: SITE_NAME,
    alternateName: ['Samsun Hacettepe İşitme Merkezi', 'Hacettepe İşitme Cihazları'],
    url: absoluteUrl('/'),
    inLanguage: SITE_LANGUAGE,
    description:
      "Samsun'da ücretsiz işitme testi, işitme cihazı satışı ve SGK danışmanlığı. Vista, A&M ve Nitro serileri ile uzman danışmanlık.",
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
    about: { '@id': `${absoluteUrl('/')}#business` },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${absoluteUrl('/blog')}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      {
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
    ],
  };
}

export function geoMetaContent(): string {
  return `${SITE_MAP_LAT};${SITE_MAP_LNG}`;
}
