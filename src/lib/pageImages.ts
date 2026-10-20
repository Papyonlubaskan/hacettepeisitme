/** Ana sayfa hariç sayfa hero görselleri */
export const PAGE_IMAGES = {
  about: '/local-images/pages/hero-about.webp',
  aboutSecondary: '/local-images/pages/about-secondary.webp',
  contact: '/local-images/pages/hero-contact.webp',
  appointment: '/local-images/pages/hero-appointment.webp',
  landing: '/local-images/pages/hero-landing.webp',
  onlineTest: '/local-images/pages/hero-online-test.webp',
  privacy: '/local-images/pages/hero-privacy.webp',
  terms: '/local-images/pages/hero-terms.webp',
  kvkk: '/local-images/pages/hero-kvkk.webp',
  sgk: '/local-images/pages/hero-sgk.webp',
  blog: '/local-images/pages/hero-blog.webp',
  catalog: '/local-images/pages/hero-catalog.webp',
  hearingAids: '/local-images/showcase/hearing-aids-hero.webp',
  pricing: '/local-images/pages/hero-pricing.webp',
  samsunDevice: '/local-images/pages/hero-samsun-device.webp',
  samsunTest: '/local-images/pages/hero-samsun-test.webp',
} as const;

const HERO_ORIGINAL_WIDTH = 1536;
const HAS_MOBILE_VARIANT = /\/(pages\/hero-[\w-]+|showcase\/hearing-aids-hero)\.webp$/;

/** PAGE_IMAGES hero'ları için 828w mobil varyant + orijinal (scripts ile üretilen *-828.webp) */
export function pageHeroSrcSet(src: string): string | undefined {
  if (!HAS_MOBILE_VARIANT.test(src)) return undefined;
  return `${src.replace(/\.webp$/, '-828.webp')} 828w, ${src} ${HERO_ORIGINAL_WIDTH}w`;
}

/** img src'si: React src'yi srcset'ten önce yazdığından mobil varyant verilir */
export function pageHeroSrc(src: string): string {
  return HAS_MOBILE_VARIANT.test(src) ? src.replace(/\.webp$/, '-828.webp') : src;
}
