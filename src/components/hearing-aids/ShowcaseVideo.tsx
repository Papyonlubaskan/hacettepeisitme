import { useEffect, useRef, useState } from 'react';
import { getSiteUrl } from '@/lib/siteUrl';

interface ShowcaseVideoProps {
  videoId: string;
  title: string;
  className?: string;
}

function buildEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    origin: getSiteUrl(),
  });
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export default function ShowcaseVideo({ videoId, title, className = '' }: ShowcaseVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden bg-brand-dark shadow-xl aspect-video ${className}`}
    >
      {active ? (
        <iframe
          src={buildEmbedUrl(videoId)}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/90" aria-hidden>
          <span className="w-10 h-10 border-2 border-white/20 border-t-brand-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
