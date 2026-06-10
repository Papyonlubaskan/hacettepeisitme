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

/** Google Haritalar konum / yol tarifi (mobilde Haritalar uygulamasını açar) */
export const SITE_MAP_LAT = 41.2694071;
export const SITE_MAP_LNG = 36.297792;
export const SITE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${SITE_MAP_LAT},${SITE_MAP_LNG}`;

/** Google Haritalar yol tarifi (doğrudan navigasyon) */
export const SITE_MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${SITE_MAP_LAT},${SITE_MAP_LNG}&travelmode=driving`;

/** Embed: adres araması (API anahtarı gerektirmez) */
export const SITE_MAP_EMBED_URL = `https://www.google.com/maps?q=${SITE_MAP_LAT},${SITE_MAP_LNG}&hl=tr&z=17&output=embed`;
