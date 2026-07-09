import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

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
      <Suspense fallback={null}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/hakkimizda",
    element: (
      <Suspense fallback={null}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "/randevu",
    element: (
      <Suspense fallback={null}>
        <Appointment />
      </Suspense>
    ),
  },
  {
    path: "/iletisim",
    element: (
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    ),
  },
  {
    path: "/ucretsiz-isitme-testi",
    element: (
      <Suspense fallback={null}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/online-isitme-testi",
    element: (
      <Suspense fallback={null}>
        <OnlineHearingTest />
      </Suspense>
    ),
  },
  {
    path: "/isitme-cihazlari",
    element: (
      <Suspense fallback={null}>
        <HearingAidsIndex />
      </Suspense>
    ),
  },
  {
    path: "/isitme-cihazlari/:slug",
    element: (
      <Suspense fallback={null}>
        <HearingAidCategory />
      </Suspense>
    ),
  },
  {
    path: "/katalog",
    element: (
      <Suspense fallback={null}>
        <CatalogIndex />
      </Suspense>
    ),
  },
  {
    path: "/katalog/:slug",
    element: (
      <Suspense fallback={null}>
        <CatalogDetail />
      </Suspense>
    ),
  },
  {
    path: "/isitme-cihazi-fiyatlari",
    element: (
      <Suspense fallback={null}>
        <IsitmeCihaziFiyatlariPage />
      </Suspense>
    ),
  },
  {
    path: "/samsun-isitme-testi",
    element: (
      <Suspense fallback={null}>
        <SamsunIsitmeTestiPage />
      </Suspense>
    ),
  },
  {
    path: "/samsun-isitme-cihazi",
    element: (
      <Suspense fallback={null}>
        <SamsunIsitmeCihaziPage />
      </Suspense>
    ),
  },
  {
    path: "/samsun-isitme-cihazlari",
    element: (
      <Suspense fallback={null}>
        <SamsunIsitmeCihazlariPage />
      </Suspense>
    ),
  },
  {
    path: "/sgk-odeme-tutarlari",
    element: (
      <Suspense fallback={null}>
        <SgkOdemeTutarlariPage />
      </Suspense>
    ),
  },
  {
    path: "/blog",
    element: (
      <Suspense fallback={null}>
        <BlogList />
      </Suspense>
    ),
  },
  {
    path: "/blog/:slug",
    element: (
      <Suspense fallback={null}>
        <BlogDetail />
      </Suspense>
    ),
  },
  {
    path: "/gizlilik-politikasi",
    element: (
      <Suspense fallback={null}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: "/kullanim-kosullari",
    element: (
      <Suspense fallback={null}>
        <TermsOfService />
      </Suspense>
    ),
  },
  {
    path: "/kvkk-aydinlatma-metni",
    element: (
      <Suspense fallback={null}>
        <KvkkNotice />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
