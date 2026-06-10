import { useEffect, useRef, useState } from 'react';

interface ShowcaseVideoProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  maxWidthClass?: string;
}

export default function ShowcaseVideo({
  src,
  poster,
  title,
  className = '',
  maxWidthClass = 'max-w-md',
}: ShowcaseVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [ratio, setRatio] = useState<string | null>(null);

  useEffect(() => {
    if (!poster) return;
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
      }
    };
    img.src = poster;
  }, [poster]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { rootMargin: '120px', threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!active || !video) return;
    video.play().catch(() => {});
  }, [active]);

  const handleMetadata = () => {
    const video = videoRef.current;
    if (!video?.videoWidth || !video?.videoHeight) return;
    setRatio(`${video.videoWidth} / ${video.videoHeight}`);
  };

  const frameStyle = ratio
    ? { aspectRatio: ratio }
    : { aspectRatio: '4 / 3' as const };

  return (
    <div className={`flex w-full justify-center ${className}`}>
      <div
        ref={containerRef}
        className={`relative mx-auto w-full overflow-hidden rounded-2xl bg-gray-100 shadow-xl ${maxWidthClass}`}
        style={frameStyle}
      >
        {active ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            title={title}
            className="absolute inset-0 h-full w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedMetadata={handleMetadata}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100" aria-hidden>
            {poster ? (
              <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain" loading="lazy" />
            ) : null}
            <span className="relative h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-brand-accent" />
          </div>
        )}
      </div>
    </div>
  );
}
