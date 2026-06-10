import { useEffect, useRef, useState } from 'react';

interface ShowcaseVideoProps {
  src: string;
  poster?: string;
  title: string;
  className?: string;
  /** Instagram reel varsayılanı 9:16; metadata yüklenince otomatik güncellenir */
  aspectRatio?: string;
}

export default function ShowcaseVideo({
  src,
  poster,
  title,
  className = '',
  aspectRatio = '9 / 16',
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

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto w-full max-w-md rounded-2xl overflow-hidden bg-black shadow-xl ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {active ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          title={title}
          className="absolute inset-0 w-full h-full object-contain bg-black"
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
            <img src={poster} alt="" className="absolute inset-0 w-full h-full object-contain opacity-60" />
          ) : null}
          <span className="relative w-10 h-10 border-2 border-white/20 border-t-brand-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
