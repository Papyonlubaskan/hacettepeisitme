import { useEffect, useState } from 'react';
import type { HomeFlowSlide } from '@/lib/homeFlowImages';
import { useAfterPageLoad } from '@/lib/useAfterPageLoad';

interface ImageFlowBackgroundProps {
  slides: HomeFlowSlide[];
  intervalMs?: number;
  overlayClassName?: string;
  imageClassName?: string;
  className?: string;
  /** Hero gibi kritik alanlarda ilk slaytı yüksek öncelikle yükle */
  eagerLoad?: boolean;
  /** Aktif slaytta yavaş zoom (statik + hafif hareket) */
  kenBurns?: boolean;
}

export default function ImageFlowBackground({
  slides,
  intervalMs = 7000,
  overlayClassName = '',
  imageClassName = 'object-cover object-center',
  className = 'absolute inset-0',
  eagerLoad = false,
  kenBurns = true,
}: ImageFlowBackgroundProps) {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  // Diğer slaytlar LCP ile yarışmasın diye sayfa yüklendikten sonra eklenir
  const restReady = useAfterPageLoad();

  useEffect(() => {
    if (slides.length < 2 || !restReady) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
      setCycle((current) => current + 1);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [slides.length, intervalMs, restReady]);

  if (!slides.length) return null;

  const visible = restReady ? slides : slides.slice(0, 1);

  return (
    <div className={className} aria-hidden>
      {visible.map((slide, slideIndex) => {
        const active = slideIndex === index;
        const first = slideIndex === 0;
        return (
          <img
            key={active ? `${slide.src}-${cycle}` : slide.src}
            srcSet={slide.srcSet}
            sizes="100vw"
            src={slide.src}
            alt=""
            loading={first && eagerLoad ? 'eager' : 'lazy'}
            decoding={first && eagerLoad ? 'sync' : 'async'}
            fetchPriority={first && eagerLoad ? 'high' : 'low'}
            className={`absolute inset-0 h-full w-full transition-opacity duration-[1800ms] ease-in-out ${imageClassName} ${
              active ? `opacity-100${kenBurns ? ' ken-burns-active' : ''}` : 'opacity-0'
            }`}
          />
        );
      })}
      {overlayClassName ? <div className={`absolute inset-0 ${overlayClassName}`} /> : null}
    </div>
  );
}
