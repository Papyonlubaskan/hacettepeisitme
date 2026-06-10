import { useEffect, useRef, useState } from 'react';

interface ShowcaseVideoProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  aspectRatio?: string;
  cropWatermark?: boolean;
}

function parseAspectRatio(ratio: string): number {
  const [w, h] = ratio.split('/').map((part) => Number(part.trim()));
  if (!w || !h) return 9 / 16;
  return w / h;
}

export default function ShowcaseVideo({
  src,
  poster,
  title,
  className = '',
  aspectRatio = '9 / 16',
  cropWatermark = false,
}: ShowcaseVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [ratio, setRatio] = useState(aspectRatio);

  const aspect = parseAspectRatio(ratio);
  const isPortrait = aspect < 0.95;

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

  const frameStyle = isPortrait
    ? {
        aspectRatio: ratio,
        width: `min(100%, calc(min(72vh, 560px) * ${aspect}))`,
        maxHeight: 'min(72vh, 560px)',
      }
    : {
        aspectRatio: ratio,
        width: '100%',
        maxWidth: '42rem',
      };

  return (
    <div className={`flex w-full justify-center ${className}`}>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-[#071525] shadow-xl"
        style={frameStyle}
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
          <div className="absolute inset-0 flex items-center justify-center bg-[#071525]" aria-hidden>
            {poster ? (
              <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain opacity-60" />
            ) : null}
            <span className="relative h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-brand-accent" />
          </div>
        )}
      </div>
    </div>
  );
}
