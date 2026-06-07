const DEFAULT_SITE_URL = 'https://hacettepeisitme.com.tr';

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim()) {
    return fromEnv.trim().replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
