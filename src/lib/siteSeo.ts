import {
  SITE_ADDRESS_SCHEMA,
  SITE_ADDRESS_SINGLE,
  SITE_MAP_LAT,
  SITE_MAP_LNG,
  SITE_MAP_URL,
  SITE_PHONE_E164,
} from '@/lib/siteContact';
import { SITE_GOOGLE_RATING, SITE_GOOGLE_REVIEW_COUNT } from '@/lib/googleReviewsSeo';
import { absoluteUrl } from '@/lib/siteUrl';

export const SITE_NAME = 'Hacettepe İşitme Cihazları';
export const SITE_TAGLINE = 'Samsun İşitme Merkezi';
export const SITE_LOCALE = 'tr_TR';
export const SITE_LANGUAGE = 'tr-TR';
export const SITE_CANONICAL_HOST = 'hacettepeisitme.com.tr';

export const SITE_DEFAULT_KEYWORDS =
  'Hacettepe İşitme Merkezi, Hacettepe İşitme Samsun, ücretsiz işitme testi Samsun, işitme testi Samsun, Samsun işitme cihazları, işitme cihazı Samsun, Vista, A&M, Nitro, SGK işitme cihazı';

export const SITE_DEFAULT_OG_IMAGE = '/local-images/home-flow/flow-reception.webp';

export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/hacettepeisitmecihazlari55/';
export const SITE_GOOGLE_MAPS_URL = SITE_MAP_URL;
export const SITE_GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi+Yorumlar&hl=tr';

/** Google İşletme profili — schema sameAs ve yerel SEO için */
export const SITE_SAME_AS = [
  absoluteUrl('/'),
  SITE_GOOGLE_MAPS_URL,
  SITE_GOOGLE_REVIEWS_URL,
  SITE_INSTAGRAM_URL,
] as const;

export { SITE_GOOGLE_RATING, SITE_GOOGLE_REVIEW_COUNT };

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
    telephone: SITE_PHONE_E164,
    address: {
      '@type': 'PostalAddress',
      ...SITE_ADDRESS_SCHEMA,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_PHONE_E164,
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
      "Samsun işitme cihazları satışı, Samsun'da ücretsiz işitme testi ve SGK danışmanlığı. Vista, A&M ve Nitro serileri ile uzman danışmanlık.",
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
    about: { '@id': `${absoluteUrl('/')}#business` },
    potentialAction: [
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

export function localBusinessNapDescription(): string {
  return `${SITE_NAME} — Samsun işitme cihazları ve Samsun'da işitme cihazı satışı. ${SITE_ADDRESS_SINGLE}. Google Haritalar: Tepecik Şok Market (1537. Sokak).`;
}
