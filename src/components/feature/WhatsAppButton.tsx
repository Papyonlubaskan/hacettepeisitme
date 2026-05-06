import { trackPhoneClick, trackWhatsAppClick } from '@/lib/tracking';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      <a
        href="tel:+905380260564"
        className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-accent px-4 text-sm font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
        aria-label="Telefonla Randevu Al"
        onClick={() => trackPhoneClick('+905380260564')}
      >
        <i className="ri-phone-line text-base" />
        <span>Randevu Al</span>
      </a>
      <a
        href="https://wa.me/905380260564"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="WhatsApp Destek"
        onClick={() => trackWhatsAppClick('+905380260564')}
      >
        <i className="ri-whatsapp-line text-2xl" />
      </a>
    </div>
  );
}
