/** Tek yerden telefon / adres — SEO ve iletişim bileşenleri için */
export const SITE_PHONE_E164 = '+905334745806';
/** WhatsApp wa.me için ülke kodu + numara, + işareti olmadan */
export const SITE_PHONE_WA = '905334745806';
export const SITE_PHONE_DISPLAY = '+90 533 474 58 06';

export const SITE_ADDRESS_LINE1 = 'Eğitim Araştırma Karşısı Şok Market Üstü';
export const SITE_ADDRESS_LINE2 = 'Tepecik, 1537. Sokak 1B/b';
export const SITE_ADDRESS_LINE3 = '55020 İlkadım/Samsun';

export const SITE_ADDRESS_SINGLE = `${SITE_ADDRESS_LINE1}, ${SITE_ADDRESS_LINE2}, ${SITE_ADDRESS_LINE3}`;

/** Schema.org PostalAddress */
export const SITE_ADDRESS_SCHEMA = {
  streetAddress: `${SITE_ADDRESS_LINE1}, ${SITE_ADDRESS_LINE2}`,
  postalCode: '55020',
  addressLocality: 'İlkadım',
  addressRegion: 'Samsun',
  addressCountry: 'TR',
} as const;

/**
 * Google Haritalar yol tarifi hedefi — Şok Market Tepecik (1537. Sokak).
 * Doğrulanmış pin: 41.2695067, 36.2974595
 */
export const SITE_MAP_LAT = 41.2695067;
export const SITE_MAP_LNG = 36.2974595;

/** Google Maps landmark etiketi (yol tarifi ekranında görünür) */
export const SITE_MAP_PLACE_LABEL =
  'Şok Market, Tepecik Mahallesi 1537 Sokak No 3, İlkadım/Samsun';

/** Google Maps place CID — Şok Market Tepecik */
export const SITE_GOOGLE_CID = '3773788576008759636';

const MAP_COORDS = `${SITE_MAP_LAT},${SITE_MAP_LNG}`;

/** Google Haritalar — doğrulanmış işletme konumu */
export const SITE_MAP_URL = `https://www.google.com/maps?cid=${SITE_GOOGLE_CID}`;

/** Yol tarifi — Google Maps doğrulanmış pin (41.2695067, 36.2974595) */
export const SITE_MAP_DIRECTIONS_URL =
  `https://www.google.com/maps/dir/?api=1&destination=${MAP_COORDS}&travelmode=driving`;

/** Embed harita */
export const SITE_MAP_EMBED_URL =
  `https://www.google.com/maps?q=${MAP_COORDS}&hl=tr&z=19&output=embed`;

/** @deprecated SITE_MAP_URL ile aynı — schema sameAs uyumu */
export const SITE_GOOGLE_BUSINESS_URL = SITE_MAP_URL;
