import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '@/components/Seo';
import SeoBreadcrumbJsonLd from '@/components/SeoBreadcrumbJsonLd';
import { getBreadcrumbs } from '@/lib/breadcrumbs';
import { getRouteSeo } from '@/lib/routeSeo';
import { trackPageView } from '@/lib/tracking';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const seo = getRouteSeo(pathname);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!seo) return;
    trackPageView(seo.title, pathname);
  }, [pathname, seo]);

  if (!seo) return null;

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={pathname}
        keywords={seo.keywords}
        image={seo.image}
      />
      <SeoBreadcrumbJsonLd items={breadcrumbs} />
    </>
  );
}
