import { useEffect, useRef, useState } from 'react';

interface ShowcaseVideoProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
}

export default function ShowcaseVideo({ src, poster, title, className = '' }: ShowcaseVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [active]);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden bg-brand-dark shadow-xl aspect-video ${className}`}
    >
      {active ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          title={title}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/90" aria-hidden>
          {poster ? (
            <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          ) : null}
          <span className="relative w-10 h-10 border-2 border-white/20 border-t-brand-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
