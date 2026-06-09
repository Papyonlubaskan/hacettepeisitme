import { SITE_PHONE_E164 } from '@/lib/siteContact';
import { trackPhoneClick } from '@/lib/tracking';

interface PhoneCallButtonProps {
  label?: string;
  className?: string;
  showIcon?: boolean;
  trackingLabel?: string;
}

export default function PhoneCallButton({
  label = 'Bizi Ara',
  className = '',
  showIcon = true,
  trackingLabel = 'phone_call_cta',
}: PhoneCallButtonProps) {
  return (
    <a
      href={`tel:${SITE_PHONE_E164}`}
      className={className}
      aria-label={`${label} - ${SITE_PHONE_E164}`}
      onClick={() => trackPhoneClick(SITE_PHONE_E164)}
      data-tracking-label={trackingLabel}
    >
      {showIcon ? <i className="ri-phone-line text-base" /> : null}
      <span>{label}</span>
    </a>
  );
}
