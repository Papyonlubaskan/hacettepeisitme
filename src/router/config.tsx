import { Suspense, lazy, type ReactElement } from "react";
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
const BlogDetail = lazy(() => import("../pages/blog/page"));
const IsitmeCihaziFiyatlariPage = lazy(() => import("../pages/seo/isime-cihazi-fiyatlari"));
const SamsunIsitmeTestiPage = lazy(() => import("../pages/seo/samsun-isitme-testi"));
const SgkOdemeTutarlariPage = lazy(() => import("../pages/sgk-odeme-tutarlari/page"));

function withSuspense(element: ReactElement) {
  return <Suspense fallback={null}>{element}</Suspense>;
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: withSuspense(<Home />),
  },
  {
    path: "/hakkimizda",
    element: withSuspense(<About />),
  },
  {
    path: "/randevu",
    element: withSuspense(<Appointment />),
  },
  {
    path: "/iletisim",
    element: withSuspense(<Contact />),
  },
  {
    path: "/ucretsiz-isitme-testi",
    element: withSuspense(<LandingPage />),
  },
  {
    path: "/online-isitme-testi",
    element: withSuspense(<OnlineHearingTest />),
  },
  {
    path: "/isitme-cihazi-fiyatlari",
    element: withSuspense(<IsitmeCihaziFiyatlariPage />),
  },
  {
    path: "/samsun-isitme-testi",
    element: withSuspense(<SamsunIsitmeTestiPage />),
  },
  {
    path: "/sgk-odeme-tutarlari",
    element: withSuspense(<SgkOdemeTutarlariPage />),
  },
  {
    path: "/blog/:slug",
    element: withSuspense(<BlogDetail />),
  },
  {
    path: "/gizlilik-politikasi",
    element: withSuspense(<PrivacyPolicy />),
  },
  {
    path: "/kullanim-kosullari",
    element: withSuspense(<TermsOfService />),
  },
  {
    path: "/kvkk-aydinlatma-metni",
    element: withSuspense(<KvkkNotice />),
  },
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
];

export default routes;