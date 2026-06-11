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
 * 1537. Sokak 1B Tepecik — OpenStreetMap geocode (eski işletme pininden ayrı).
 * Harita linkleri koordinat yerine tam adres kullanır; yanlış POI'ye gitmeyi önler.
 */
export const SITE_MAP_LAT = 41.2693501;
export const SITE_MAP_LNG = 36.2966171;

const MAP_QUERY = encodeURIComponent(SITE_ADDRESS_SINGLE);

/** Google Haritalar — işletme konumu (tam adres araması) */
export const SITE_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

/** Google Haritalar yol tarifi (doğrudan navigasyon) */
export const SITE_MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}&travelmode=driving`;

/** Embed: tam adres (API anahtarı gerektirmez) */
export const SITE_MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&hl=tr&z=17&output=embed`;

/** Google İşletme profili — Tepecik merkez (Hacettepe İşitme Cihazları) */
export const SITE_GOOGLE_CID = '16601713861178672737';

/** Doğrudan Google İşletme kaydına gider (eski Gebi Cad. kaydına değil) */
export const SITE_GOOGLE_BUSINESS_URL = `https://www.google.com/maps?cid=${SITE_GOOGLE_CID}`;
