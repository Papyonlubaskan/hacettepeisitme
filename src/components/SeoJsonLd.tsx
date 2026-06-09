import { localBusinessJsonLd, faqPageJsonLd, SITE_FAQ } from '@/lib/schema';
import { organizationJsonLd, websiteJsonLd } from '@/lib/siteSeo';

export default function SeoJsonLd() {
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
