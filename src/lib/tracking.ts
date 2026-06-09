// Google Tag Manager & Meta Pixel tracking helpers
// These push to dataLayer for GTM and expose fbq() for Meta Pixel

interface GTMEvent {
  event: string;
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: number;
  conversionValue?: number;
  currency?: string;
  pageTitle?: string;
  pagePath?: string;
  [key: string]: string | number | undefined;
}

declare global {
  interface Window {
    dataLayer: GTMEvent[];
    gtag?: (...args: unknown[]) => void;
    fbq: (...args: (string | number | object)[]) => void;
    _fbq: unknown;
  }
}

function trackGtag(event: string, params?: Record<string, string | number | undefined>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}

export function pushDataLayer(event: GTMEvent) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  }
}

export function trackPageView(title?: string, path?: string) {
  const pageTitle = title || document.title;
  const pagePath = path || window.location.pathname;

  pushDataLayer({
    event: 'pageview',
    pageTitle,
    pagePath,
  });

  trackGtag('page_view', {
    page_title: pageTitle,
    page_path: pagePath,
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
  });

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

export function trackFormSubmit(
  formName: string,
  status: 'success' | 'error' = 'success',
  formId?: string,
  extra?: Record<string, string | number | undefined>
) {
  const isSuccess = status === 'success';
  pushDataLayer({
    event: isSuccess ? 'form_submit_success' : 'form_submit_error',
    eventCategory: 'form',
    eventAction: isSuccess ? 'submit_success' : 'submit_error',
    eventLabel: formName,
    eventValue: 1,
    formName,
    formStatus: status,
    formId,
    ...extra,
  });

  if (isSuccess) {
    trackGtag('generate_lead', { form_name: formName, form_id: formId });
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }
  }
}

export function trackLead(
  leadType: string,
  value?: number,
  currency = 'TRY'
) {
  pushDataLayer({
    event: 'generate_lead',
    eventCategory: 'lead',
    eventAction: 'generate',
    eventLabel: leadType,
    eventValue: value,
    conversionValue: value,
    currency,
    leadType,
  });

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: leadType,
      value: value ?? 0,
      currency,
    });
  }
}

export function trackPhoneClick(phoneNumber: string) {
  pushDataLayer({
    event: 'contact',
    eventCategory: 'engagement',
    eventAction: 'phone_click',
    eventLabel: phoneNumber,
  });

  trackGtag('contact', { method: 'phone', contact_label: phoneNumber });

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', { method: 'phone' });
  }
}

export function trackWhatsAppClick(phoneNumber: string) {
  pushDataLayer({
    event: 'contact',
    eventCategory: 'engagement',
    eventAction: 'whatsapp_click',
    eventLabel: phoneNumber,
  });

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', { method: 'whatsapp' });
  }
}

export function trackCTAClick(
  buttonText: string,
  buttonLocation: string,
  destination?: string
) {
  pushDataLayer({
    event: 'cta_click',
    eventCategory: 'engagement',
    eventAction: 'cta_click',
    eventLabel: buttonText,
    buttonText,
    buttonLocation,
    destination,
  });

  trackGtag('cta_click', {
    button_text: buttonText,
    button_location: buttonLocation,
    destination,
  });
}

export function trackScroll(depthPercent: number) {
  pushDataLayer({
    event: 'scroll',
    eventCategory: 'engagement',
    eventAction: 'scroll',
    eventLabel: `${depthPercent}%`,
    eventValue: depthPercent,
    scrollDepth: depthPercent,
  });
}