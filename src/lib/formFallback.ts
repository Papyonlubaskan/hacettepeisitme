export function triggerContactFallback(source: string) {
  const phone = '+905380260564';
  const whatsappMessage = encodeURIComponent(
    `Merhaba, ${source} formunu doldurdum ancak teknik bir hata nedeniyle iletilemedi. Randevu için destek rica ederim.`
  );
  const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${whatsappMessage}`;
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
