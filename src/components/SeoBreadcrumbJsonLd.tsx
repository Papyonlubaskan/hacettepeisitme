import { useEffect, useState } from 'react';
import { breadcrumbJsonLd } from '@/lib/schema';
import type { BreadcrumbItem } from '@/lib/breadcrumbs';

interface SeoBreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/** SSR data-seo-inject varsa çift BreadcrumbList üretme */
export default function SeoBreadcrumbJsonLd({ items }: SeoBreadcrumbJsonLdProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const serverInjected = document.querySelector('script[data-seo-inject="page"]');
    setVisible(!serverInjected && items.length >= 2);
  }, [items]);

  if (!visible || items.length < 2) return null;

  return (
    <script
      type="application/ld+json"
      data-seo-client="breadcrumb"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }}
    />
  );
}
