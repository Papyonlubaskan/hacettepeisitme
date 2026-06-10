import { useEffect, useState } from 'react';
import type { HomeFlowSlide } from '@/lib/homeFlowImages';

interface ImageFlowBackgroundProps {
  slides: HomeFlowSlide[];
  intervalMs?: number;
  overlayClassName?: string;
  imageClassName?: string;
  className?: string;
  /** Hero gibi kritik alanlarda tüm slaytları önceden yükle */
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

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
      setCycle((current) => current + 1);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [slides.length, intervalMs]);

  if (!slides.length) return null;

  return (
    <div className={className} aria-hidden>
      {slides.map((slide, slideIndex) => {
        const active = slideIndex === index;
        return (
          <img
            key={active ? `${slide.src}-${cycle}` : slide.src}
            src={slide.src}
            alt=""
            loading={eagerLoad || slideIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={eagerLoad && slideIndex === 0 ? 'high' : undefined}
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
