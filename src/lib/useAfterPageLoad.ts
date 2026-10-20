import { useEffect, useState } from 'react';

/** window load olayından delayMs sonra true döner; kritik olmayan içeriği LCP'den sonraya iter */
export function useAfterPageLoad(delayMs = 1500) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let timer = 0;
    const arm = () => {
      timer = window.setTimeout(() => setReady(true), delayMs);
    };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
    return () => {
      window.removeEventListener('load', arm);
      window.clearTimeout(timer);
    };
  }, [delayMs]);
  return ready;
}
