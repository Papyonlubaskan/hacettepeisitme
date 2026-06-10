import { useState } from 'react';

interface ShowcaseVideoProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function ShowcaseVideo({ videoId, title, className = '' }: ShowcaseVideoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-brand-dark shadow-xl aspect-video ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/90">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="flex flex-col items-center gap-3 text-white group"
            aria-label={`${title} videosunu oynat`}
          >
            <span className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-accent group-hover:scale-110 transition-transform">
              <i className="ri-play-fill text-3xl ml-1" />
            </span>
            <span className="text-sm font-medium text-white/80">Videoyu Oynat</span>
          </button>
        </div>
      )}
      {loaded ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : null}
    </div>
  );
}
