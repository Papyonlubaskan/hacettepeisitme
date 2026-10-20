import { useEffect } from 'react';

// Modül, createRoot().render'dan önce değerlendirilir; sunucunun #root'a gömdüğü içerik burada yakalanır.
const rootEl = typeof document !== 'undefined' ? document.getElementById('root') : null;
let serverShellHtml = rootEl?.querySelector('.seo-shell') ? rootEl.innerHTML : '';

/**
 * Lazy sayfa yüklenirken gösterilir. İlk açılışta sunucu içeriğini korur (boş ekran / düzen kayması olmaz),
 * sonraki geçişlerde footer'ı ekran dışında tutan bir yer tutucu render eder.
 */
export default function PageFallback() {
  const html = serverShellHtml;

  useEffect(
    () => () => {
      serverShellHtml = '';
    },
    [],
  );

  if (html) return <div dangerouslySetInnerHTML={{ __html: html }} />;
  return <div className="min-h-screen" aria-hidden />;
}
