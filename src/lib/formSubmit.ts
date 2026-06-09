const FORM_ERROR_MESSAGES: Record<string, string> = {
  SMTP_NOT_CONFIGURED:
    'E-posta servisi henüz yapılandırılmadı. Lütfen bizi telefonla arayın veya WhatsApp kullanın.',
  SMTP_FAILED: 'E-posta gönderilemedi. Lütfen tekrar deneyin veya doğrudan bizi arayın.',
  INVALID_FORM_PAYLOAD: 'Lütfen zorunlu alanları kontrol edip tekrar deneyin.',
  FORM_SUBMIT_FAILED: 'Form gönderilemedi. Lütfen tekrar deneyin.',
};

export function getFormErrorMessage(code?: string): string {
  if (!code) return FORM_ERROR_MESSAGES.FORM_SUBMIT_FAILED;
  return FORM_ERROR_MESSAGES[code] || FORM_ERROR_MESSAGES.FORM_SUBMIT_FAILED;
}

export async function submitForm(endpoint: string, form: HTMLFormElement): Promise<void> {
  const data = new FormData(form);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data as never).toString(),
  });

  let payload: { ok?: boolean; error?: string } = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }

  if (!response.ok || !payload.ok) {
    const error = new Error(payload.error || 'FORM_SUBMIT_FAILED');
    (error as Error & { code?: string }).code = payload.error;
    throw error;
  }
}
