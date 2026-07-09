import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { localBusinessJsonLd, faqPageJsonLd, SITE_FAQ } from '@/lib/schema';
import { organizationJsonLd, websiteJsonLd } from '@/lib/siteSeo';

/**
 * Ana sayfa JSON-LD — yalnızca client navigasyonunda.
 * Production ilk yüklemede server/seo-inject zaten enjekte eder (çift schema önlenir).
 */
export default function SeoJsonLd() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== '/') {
      setVisible(false);
      return;
    }
    const serverInjected = document.querySelector('script[data-seo-inject="page"]');
    setVisible(!serverInjected);
  }, [pathname]);

  if (!visible) return null;

  const payload = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationJsonLd(),
      websiteJsonLd(),
      localBusinessJsonLd(),
      faqPageJsonLd(SITE_FAQ),
    ],
  };

  return (
    <script
      type="application/ld+json"
      data-seo-client="home"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
