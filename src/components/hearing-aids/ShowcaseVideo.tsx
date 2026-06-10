import { useEffect, useRef, useState } from 'react';

interface ShowcaseVideoProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  aspectRatio?: string;
  /** Alt banttaki site URL watermark'ını kırpar */
  cropWatermark?: boolean;
}

export default function ShowcaseVideo({
  src,
  poster,
  title,
  className = '',
  aspectRatio = '9 / 16',
  cropWatermark = true,
}: ShowcaseVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [ratio, setRatio] = useState(aspectRatio);

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

  const handleMetadata = () => {
    const video = videoRef.current;
    if (!video?.videoWidth || !video?.videoHeight) return;
    setRatio(`${video.videoWidth} / ${video.videoHeight}`);
  };

  const videoClass = cropWatermark
    ? 'absolute left-1/2 top-1/2 min-h-[112%] min-w-[112%] -translate-x-1/2 -translate-y-[46%] object-cover'
    : 'absolute inset-0 h-full w-full object-contain';

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-black shadow-xl ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {active ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          title={title}
          className={videoClass}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={handleMetadata}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black" aria-hidden>
          {poster ? (
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain opacity-60" />
          ) : null}
          <span className="relative h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-brand-accent" />
        </div>
      )}
    </div>
  );
}
