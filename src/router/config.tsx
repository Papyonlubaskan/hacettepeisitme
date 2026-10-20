import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import PageFallback from "../components/PageFallback";

const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/home/page"));
const About = lazy(() => import("../pages/about/page"));
const Appointment = lazy(() => import("../pages/appointment/page"));
const Contact = lazy(() => import("../pages/contact/page"));
const LandingPage = lazy(() => import("../pages/landing/page"));
const OnlineHearingTest = lazy(() => import("../pages/online-test/page"));
const PrivacyPolicy = lazy(() => import("../pages/gizlilik/page"));
const TermsOfService = lazy(() => import("../pages/kullanim-kosullari/page"));
const KvkkNotice = lazy(() => import("../pages/kvkk/page"));
const BlogList = lazy(() => import("../pages/blog/list"));
const BlogDetail = lazy(() => import("../pages/blog/page"));
const IsitmeCihaziFiyatlariPage = lazy(() => import("../pages/seo/isime-cihazi-fiyatlari"));
const SamsunIsitmeTestiPage = lazy(() => import("../pages/seo/samsun-isitme-testi"));
const SamsunIsitmeCihaziPage = lazy(() => import("../pages/seo/samsun-isitme-cihazi"));
const SamsunIsitmeCihazlariPage = lazy(() => import("../pages/seo/samsun-isitme-cihazlari"));
const SgkOdemeTutarlariPage = lazy(() => import("../pages/sgk-odeme-tutarlari/page"));
const HearingAidsIndex = lazy(() => import("../pages/hearing-aids/index"));
const HearingAidCategory = lazy(() => import("../pages/hearing-aids/category"));
const CatalogIndex = lazy(() => import("../pages/catalog/index"));
const CatalogDetail = lazy(() => import("../pages/catalog/detail"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<PageFallback />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/hakkimizda",
    element: (
      <Suspense fallback={<PageFallback />}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/randevu",
    element: (
      <Suspense fallback={<PageFallback />}>
        <Appointment />
      </Suspense>
    ),
  },
  {
    path: "/iletisim",
    element: (
      <Suspense fallback={<PageFallback />}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: "/ucretsiz-isitme-testi",
    element: (
      <Suspense fallback={<PageFallback />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/online-isitme-testi",
    element: (
      <Suspense fallback={<PageFallback />}>
        <OnlineHearingTest />
      </Suspense>
    ),
  },
  {
    path: "/isitme-cihazlari",
    element: (
      <Suspense fallback={<PageFallback />}>
        <HearingAidsIndex />
      </Suspense>
    ),
  },
  {
    path: "/isitme-cihazlari/:slug",
    element: (
      <Suspense fallback={<PageFallback />}>
        <HearingAidCategory />
      </Suspense>
    ),
  },
  {
    path: "/katalog",
    element: (
      <Suspense fallback={<PageFallback />}>
        <CatalogIndex />
      </Suspense>
    ),
  },
  {
    path: "/katalog/:slug",
    element: (
      <Suspense fallback={<PageFallback />}>
        <CatalogDetail />
      </Suspense>
    ),
  },
  {
    path: "/isitme-cihazi-fiyatlari",
    element: (
      <Suspense fallback={<PageFallback />}>
        <IsitmeCihaziFiyatlariPage />
      </Suspense>
    ),
  },
  {
    path: "/samsun-isitme-testi",
    element: (
      <Suspense fallback={<PageFallback />}>
        <SamsunIsitmeTestiPage />
      </Suspense>
    ),
  },
  {
    path: "/samsun-isitme-cihazi",
    element: (
      <Suspense fallback={<PageFallback />}>
        <SamsunIsitmeCihaziPage />
      </Suspense>
    ),
  },
  {
    path: "/samsun-isitme-cihazlari",
    element: (
      <Suspense fallback={<PageFallback />}>
        <SamsunIsitmeCihazlariPage />
      </Suspense>
    ),
  },
  {
    path: "/sgk-odeme-tutarlari",
    element: (
      <Suspense fallback={<PageFallback />}>
        <SgkOdemeTutarlariPage />
      </Suspense>
    ),
  },
  {
    path: "/blog",
    element: (
      <Suspense fallback={<PageFallback />}>
        <BlogList />
      </Suspense>
    ),
  },
  {
    path: "/blog/:slug",
    element: (
      <Suspense fallback={<PageFallback />}>
        <BlogDetail />
      </Suspense>
    ),
  },
  {
    path: "/gizlilik-politikasi",
    element: (
      <Suspense fallback={<PageFallback />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: "/kullanim-kosullari",
    element: (
      <Suspense fallback={<PageFallback />}>
        <TermsOfService />
      </Suspense>
    ),
  },
  {
    path: "/kvkk-aydinlatma-metni",
    element: (
      <Suspense fallback={<PageFallback />}>
        <KvkkNotice />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
