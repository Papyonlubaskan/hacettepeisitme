/** Tek yerden telefon / adres — SEO ve iletişim bileşenleri için */
export const SITE_PHONE_E164 = '+905334745806';
/** WhatsApp wa.me için ülke kodu + numara, + işareti olmadan */
export const SITE_PHONE_WA = '905334745806';
export const SITE_PHONE_DISPLAY = '0 (533) 474 58 06';

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

/** Embed: adres araması (API anahtarı gerektirmez) */
export const SITE_MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(SITE_ADDRESS_SINGLE)}&hl=tr&z=17&output=embed`;
