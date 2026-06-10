import { SITE_MAP_DIRECTIONS_URL } from '@/lib/siteContact';
import { trackCTAClick } from '@/lib/tracking';

type MapDirectionsCTAProps = {
  variant: 'hero' | 'floating' | 'chat-header';
  trackingLabel: string;
  className?: string;
};

export default function MapDirectionsCTA({
  variant,
  trackingLabel,
  className = '',
}: MapDirectionsCTAProps) {
  const handleClick = () => {
    trackCTAClick('Yol Tarifi Al', trackingLabel, SITE_MAP_DIRECTIONS_URL);
  };

  if (variant === 'hero') {
    return (
      <a
        href={SITE_MAP_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 bg-white text-brand-dark font-semibold px-8 py-3.5 rounded-full hover:bg-brand-light transition-all hover:scale-105 whitespace-nowrap shadow-sm ${className}`}
        aria-label="Google Haritalar'da yol tarifi al"
      >
        <i className="ri-map-pin-2-line text-lg text-brand-accent" aria-hidden />
        <span>Yol Tarifi Al</span>
      </a>
    );
  }

  if (variant === 'floating') {
    return (
      <a
        href={SITE_MAP_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`fixed bottom-[5.75rem] right-6 z-40 inline-flex items-center gap-2 bg-white text-brand-dark text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg border border-gray-100 hover:border-brand-accent hover:text-brand-accent transition-all hover:scale-105 ${className}`}
        aria-label="Merkeze yol tarifi al"
      >
        <i className="ri-map-pin-2-line text-brand-accent text-base" aria-hidden />
        <span>Konuma Git</span>
      </a>
    );
  }

  return (
    <a
      href={SITE_MAP_DIRECTIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 w-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-semibold px-3 py-2 rounded-xl hover:bg-brand-accent/25 transition-colors ${className}`}
      aria-label="Google Haritalar'da yol tarifi al"
    >
      <i className="ri-map-pin-2-line" aria-hidden />
      <span>Konuma Git · Yol Tarifi</span>
      <i className="ri-external-link-line text-[10px] opacity-70" aria-hidden />
    </a>
  );
}
