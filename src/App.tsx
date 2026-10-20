import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import Navbar from "./components/feature/Navbar";
import Footer from "./components/feature/Footer";
import WhatsAppButton from "./components/feature/WhatsAppButton";
import ScrollToTop from "./components/feature/ScrollToTop";
import SeoJsonLd from "./components/SeoJsonLd";
import { useAfterPageLoad } from "./lib/useAfterPageLoad";

const ChatBot = lazy(() => import("./components/feature/ChatBot"));

function DeferredChatBot() {
  const ready = useAfterPageLoad(2500);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <ChatBot />
    </Suspense>
  );
}

/** Router dışındaki uygulama ağacı — istemcide BrowserRouter, build-time SSR'da StaticRouter ile sarılır */
export function AppContent() {
  return (
    <>
      <SeoJsonLd />
      <ScrollToTop />
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
      <WhatsAppButton />
      <DeferredChatBot />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
