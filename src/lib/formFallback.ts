import { getFormWhatsAppUrl } from '@/lib/formWhatsApp';
import { SITE_PHONE_E164 } from '@/lib/siteContact';

export function triggerContactFallback(
  source: string,
  formType = 'contact',
  data: Record<string, string | undefined> = {}
) {
  const phone = SITE_PHONE_E164;
  const whatsappUrl = getFormWhatsAppUrl(formType, data, `Merhaba, ${source} formu teknik hata nedeniyle iletilemedi.`);
  const telUrl = `tel:${phone}`;

  if (typeof window === 'undefined') return;

  const goWhatsApp = window.confirm(
    'Form şu anda teknik nedenle gönderilemedi. Hemen WhatsApp üzerinden randevu oluşturmak ister misiniz?'
  );

  if (goWhatsApp) {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  window.location.href = telUrl;
}
