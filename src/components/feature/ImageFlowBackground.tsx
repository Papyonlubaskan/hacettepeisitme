import { useEffect, useState } from 'react';
import type { HomeFlowSlide } from '@/lib/homeFlowImages';

interface ImageFlowBackgroundProps {
  slides: HomeFlowSlide[];
  intervalMs?: number;
  overlayClassName?: string;
  imageClassName?: string;
  className?: string;
}

export default function ImageFlowBackground({
  slides,
  intervalMs = 7000,
  overlayClassName = '',
  imageClassName = 'object-cover object-center',
  className = 'absolute inset-0',
}: ImageFlowBackgroundProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [slides.length, intervalMs, reduceMotion]);

  if (!slides.length) return null;

  const activeIndex = reduceMotion ? 0 : index;

  return (
    <div className={className} aria-hidden>
      {slides.map((slide, slideIndex) => {
        const active = slideIndex === activeIndex;
        return (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            loading={slideIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 h-full w-full transition-opacity duration-[1800ms] ease-in-out ${imageClassName} ${
              active ? `opacity-100${reduceMotion ? '' : ' ken-burns-active'}` : 'opacity-0'
            }`}
          />
        );
      })}
      {overlayClassName ? <div className={`absolute inset-0 ${overlayClassName}`} /> : null}
    </div>
  );
}
