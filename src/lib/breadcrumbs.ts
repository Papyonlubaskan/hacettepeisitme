const ROUTE_LABELS: Record<string, string> = {
  '/': 'Ana Sayfa',
  '/hakkimizda': 'Hakkımızda',
  '/randevu': 'Randevu',
  '/iletisim': 'İletişim',
  '/ucretsiz-isitme-testi': 'Ücretsiz İşitme Testi',
  '/online-isitme-testi': 'Online İşitme Testi',
  '/isitme-cihazi-fiyatlari': 'İşitme Cihazı Fiyatları',
  '/samsun-isitme-testi': 'Samsun İşitme Testi',
  '/sgk-odeme-tutarlari': 'SGK Ödeme Tutarları',
  '/blog': 'Blog',
  '/gizlilik-politikasi': 'Gizlilik Politikası',
  '/kullanim-kosullari': 'Kullanım Koşulları',
  '/kvkk-aydinlatma-metni': 'KVKK Aydınlatma Metni',
};

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbs(pathname: string, pageTitle?: string): BreadcrumbItem[] {
  if (pathname === '/') return [{ name: 'Ana Sayfa', path: '/' }];

  const items: BreadcrumbItem[] = [{ name: 'Ana Sayfa', path: '/' }];

  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    items.push({ name: 'Blog', path: '/blog' });
    items.push({ name: pageTitle || 'Yazı', path: pathname });
    return items;
  }

  const label = ROUTE_LABELS[pathname];
  if (label) {
    items.push({ name: label, path: pathname });
  }

  return items;
}
