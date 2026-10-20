import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';

/** Build-time SSG: lazy route'lar dahil tüm Suspense sınırları çözülene kadar bekler */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </StrictMode>,
    // Büyük Suspense içeriği script ile sonradan yerleştirilmesin; HTML'de satır içi kalsın
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  return new Response(prelude).text();
}
