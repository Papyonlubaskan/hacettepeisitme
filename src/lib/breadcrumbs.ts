const ROUTE_LABELS: Record<string, string> = {
  '/': 'Ana Sayfa',
  '/hakkimizda': 'Hakkımızda',
  '/randevu': 'Randevu',
  '/iletisim': 'İletişim',
  '/ucretsiz-isitme-testi': 'Ücretsiz İşitme Testi',
  '/online-isitme-testi': 'Online İşitme Testi',
  '/isitme-cihazi-fiyatlari': 'İşitme Cihazı Fiyatları',
  '/samsun-isitme-testi': 'Samsun İşitme Testi',
  '/samsun-isitme-cihazi': 'Samsun İşitme Cihazı',
  '/samsun-isitme-cihazlari': 'Samsun İşitme Cihazları',
  '/sgk-odeme-tutarlari': 'SGK Ödeme Tutarları',
  '/isitme-cihazlari': 'İşitme Cihazları',
  '/katalog': 'Katalog',
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

  if (pathname.startsWith('/isitme-cihazlari/')) {
    items.push({ name: 'İşitme Cihazları', path: '/isitme-cihazlari' });
    items.push({ name: pageTitle || 'Kategori', path: pathname });
    return items;
  }

  if (pathname.startsWith('/katalog/')) {
    items.push({ name: 'Katalog', path: '/katalog' });
    items.push({ name: pageTitle || 'Marka', path: pathname });
    return items;
  }

  const label = ROUTE_LABELS[pathname];
  if (label) {
    items.push({ name: label, path: pathname });
  }

  return items;
}
