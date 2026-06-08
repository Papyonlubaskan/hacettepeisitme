import { SITE_PHONE_E164, SITE_PHONE_WA } from '@/lib/siteContact';
import { trackWhatsAppClick } from '@/lib/tracking';

const FIELD_LABELS: Record<string, string> = {
  name: 'Ad Soyad',
  phone: 'Telefon',
  email: 'E-posta',
  subject: 'Konu',
  message: 'Mesaj',
  service: 'Hizmet',
  date: 'Tarih',
  time: 'Saat',
  age: 'Yaş',
};

const FORM_TITLES: Record<string, string> = {
  contact: 'İLETİŞİM',
  appointment: 'RANDEVU',
  landing: 'ÜCRETSİZ TEST',
};

export function buildFormWhatsAppMessage(
  formType: string,
  data: Record<string, string | undefined>,
  intro?: string
) {
  const title = FORM_TITLES[formType] || formType.toUpperCase();
  const lines = [
    intro || `*Hacettepe İşitme — ${title}*`,
    'Kaynak: hacettepeisitme.com.tr',
  ];

  for (const [key, label] of Object.entries(FIELD_LABELS)) {
    const value = data[key]?.trim();
    if (value) lines.push(`${label}: ${value}`);
  }

  return lines.join('\n');
}

export function getFormWhatsAppUrl(formType: string, data: Record<string, string | undefined>, intro?: string) {
  const text = buildFormWhatsAppMessage(formType, data, intro);
  return `https://wa.me/${SITE_PHONE_WA}?text=${encodeURIComponent(text)}`;
}

export function openFormWhatsApp(formType: string, data: Record<string, string | undefined>, intro?: string) {
  if (typeof window === 'undefined') return;
  trackWhatsAppClick(SITE_PHONE_E164);
  window.open(getFormWhatsAppUrl(formType, data, intro), '_blank', 'noopener,noreferrer');
}

/** Form API başarılı olduktan sonra — CallMeBot yerine güvenilir yol */
export function offerFormWhatsAppHandoff(formType: string, data: Record<string, string | undefined>) {
  if (typeof window === 'undefined') return;
  const go = window.confirm(
    'Formunuz alındı. Detayları WhatsApp üzerinden de iletmek ister misiniz?\n\nAçılan sohbette yalnızca "Gönder"e basmanız yeterli.'
  );
  if (go) openFormWhatsApp(formType, data);
}
