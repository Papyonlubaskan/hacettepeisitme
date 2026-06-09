import { trackPhoneClick, trackWhatsAppClick } from '@/lib/tracking';
import { SITE_PHONE_E164, SITE_PHONE_WA } from '@/lib/siteContact';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      <a
        href={`tel:${SITE_PHONE_E164}`}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-accent px-4 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
        aria-label="Bizi Ara"
        onClick={() => trackPhoneClick(SITE_PHONE_E164)}
      >
        <i className="ri-phone-line text-base" />
        <span>Bizi Ara</span>
      </a>
      <a
        href={`https://wa.me/${SITE_PHONE_WA}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="WhatsApp Destek"
        onClick={() => trackWhatsAppClick(SITE_PHONE_E164)}
      >
        <i className="ri-whatsapp-line text-2xl" />
      </a>
    </div>
  );
}
