const DEFAULT_SITE_URL = 'https://hacettepeisitme.com.tr';

/**
 * Kanonik site kökü. window.location kullanılmaz: canonical/schema URL'leri her ortamda ana alan adı olmalı
 * ve build-time SSR çıktısı ile istemci hydration'ı aynı metni üretmeli.
 */
export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim()) {
    return fromEnv.trim().replace(/\/$/, '');
  }
  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
