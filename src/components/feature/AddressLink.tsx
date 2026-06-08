import {
  SITE_ADDRESS_LINE1,
  SITE_ADDRESS_LINE2,
  SITE_ADDRESS_LINE3,
  SITE_ADDRESS_SINGLE,
  SITE_MAP_URL,
} from '@/lib/siteContact';
import { trackCTAClick } from '@/lib/tracking';

type Props = {
  variant?: 'single' | 'multiline' | 'compact';
  className?: string;
  showIcon?: boolean;
  showHint?: boolean;
};

export default function AddressLink({
  variant = 'single',
  className = '',
  showIcon = false,
  showHint = true,
}: Props) {
  const handleClick = () => {
    trackCTAClick('Konum / Harita', 'address_link', SITE_MAP_URL);
  };

  const content =
    variant === 'multiline' ? (
      <>
        {SITE_ADDRESS_LINE1}
        <br />
        {SITE_ADDRESS_LINE2}
        <br />
        {SITE_ADDRESS_LINE3}
      </>
    ) : variant === 'compact' ? (
      <>
        {SITE_ADDRESS_LINE1}
        <br />
        <span className="text-inherit opacity-90">{SITE_ADDRESS_LINE3}</span>
      </>
    ) : (
      SITE_ADDRESS_SINGLE
    );

  return (
    <a
      href={SITE_MAP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-block hover:text-brand-accent transition-colors ${className}`}
      onClick={handleClick}
      aria-label={`Konum: ${SITE_ADDRESS_SINGLE}. Google Haritalar'da aç`}
    >
      {showIcon ? (
        <span className="inline-flex items-start gap-2">
          <i className="ri-map-pin-line text-brand-accent shrink-0 mt-0.5" aria-hidden />
          <span>{content}</span>
        </span>
      ) : (
        content
      )}
      {showHint ? (
        <span className="block text-xs text-brand-accent/80 group-hover:text-brand-accent mt-1 font-medium">
          Haritada aç / yol tarifi
        </span>
      ) : null}
    </a>
  );
}
