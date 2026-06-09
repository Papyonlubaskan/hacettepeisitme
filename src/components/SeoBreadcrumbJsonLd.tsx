import { breadcrumbJsonLd } from '@/lib/schema';
import type { BreadcrumbItem } from '@/lib/breadcrumbs';

interface SeoBreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export default function SeoBreadcrumbJsonLd({ items }: SeoBreadcrumbJsonLdProps) {
  if (items.length < 2) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }}
    />
  );
}
