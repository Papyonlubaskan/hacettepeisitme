import { useState, useRef, useEffect } from 'react';
import { SITE_ADDRESS_SINGLE, SITE_MAP_URL, SITE_PHONE_E164, SITE_PHONE_WA } from '@/lib/siteContact';

interface Message {
  role: 'user' | 'bot';
  text: string;
  suggestions?: string[];
}

interface Intent {
  keys: string[];
  answer: string;
  suggestions: string[];
}

const QUICK_ACTIONS = [
  'Randevu almak istiyorum',
  'Telefonla aramak istiyorum',
  'WhatsApp destek',
  'Fiyat bilgisi alabilir miyim?',
  'Teknik servis desteği',
];

const INTENTS: Intent[] = [
  {
    keys: ['merhaba', 'selam', 'iyi gunler', 'iyi günler'],
    answer:
      'Merhaba, Hacettepe İşitme AI destek asistanına hoş geldiniz. Size en hızlı şekilde yardımcı olayım.',
    suggestions: QUICK_ACTIONS,
  },
  {
    keys: ['randevu', 'randevu almak', 'test randevu'],
    answer:
      'Randevu için /randevu sayfasından form bırakabilirsiniz. İsterseniz sizi tek tıkla randevu sayfasına yönlendirebilirim.',
    suggestions: ['Randevu sayfasını aç', 'WhatsApp destek', 'Telefonla aramak istiyorum'],
  },
  {
    keys: ['fiyat', 'ucret', 'ücret', 'cihaz fiyat'],
    answer:
      'Fiyatlar cihaz teknolojisine göre değişir. En doğru teklif için ücretsiz test sonrası kişiye özel öneriler sunuyoruz.',
    suggestions: ['Fiyat için randevu al', 'Seriler hakkında bilgi', 'WhatsApp destek'],
  },
  {
    keys: ['adres', 'konum', 'neredesiniz'],
    answer: `Merkezimiz ${SITE_ADDRESS_SINGLE}. Konum ve yol tarifi: ${SITE_MAP_URL}`,
    suggestions: ['İletişim sayfasını aç', 'Telefonla aramak istiyorum'],
  },
  {
    keys: ['saat', 'calisma', 'çalışma', 'mesai', 'acik mi', 'açık mı'],
    answer:
      'Çalışma saatlerimiz Pazartesi-Cumartesi 09:00-18:00. Pazar günü kapalıyız.',
    suggestions: ['Randevu almak istiyorum', 'WhatsApp destek'],
  },
  {
    keys: ['teknik servis', 'bakim', 'bakım', 'onarim', 'onarım', 'garanti'],
    answer:
      'Teknik servis, bakım ve ayarlama desteğimiz mevcut. Cihazlar 2 yıl garantili ve ömür boyu teknik destek veriyoruz.',
    suggestions: ['Teknik servis için iletişim', 'Telefonla aramak istiyorum'],
  },
  {
    keys: ['vista', 'nitro', 'a&m', 'seri', 'model'],
    answer:
      'Kliniğimizde Vista, A&M, Nitro ve Pediatrik Grup serilerinin güncel modelleri bulunur.',
    suggestions: ['Fiyat bilgisi alabilir miyim?', 'Randevu almak istiyorum'],
  },
];

function runQuickAction(action: string) {
  const lower = action.toLowerCase();
  if (lower.includes('randevu sayfasını aç') || lower.includes('randevu almak')) {
    window.location.href = '/randevu';
    return true;
  }
  if (lower.includes('iletişim sayfasını aç') || lower.includes('teknik servis için iletişim')) {
    window.location.href = '/iletisim';
    return true;
  }
  if (lower.includes('whatsapp')) {
    window.open(`https://wa.me/${SITE_PHONE_WA}`, '_blank', 'noopener,noreferrer');
    return true;
  }
  if (lower.includes('telefonla aramak')) {
    window.location.href = `tel:${SITE_PHONE_E164}`;
    return true;
  }
  return false;
}

function getBotResponse(input: string): Message {
  const lower = input.toLowerCase().trim();

  if (runQuickAction(input)) {
    return {
      role: 'bot',
      text: 'İlgili işlemi başlatıyorum. İsterseniz konuşmaya devam edip ek bilgi de alabilirsiniz.',
      suggestions: QUICK_ACTIONS,
    };
  }

  for (const intent of INTENTS) {
    if (intent.keys.some((key) => lower.includes(key))) {
      return {
        role: 'bot',
        text: intent.answer,
        suggestions: intent.suggestions,
      };
    }
  }

  if (lower.length < 3) {
    return {
      role: 'bot',
      text: 'Sorunuzu biraz daha detaylandırabilir misiniz? Randevu, fiyat, teknik servis, adres veya çalışma saatleri konusunda yardımcı olabilirim.',
      suggestions: QUICK_ACTIONS,
    };
  }

  return {
    role: 'bot',
    text: 'Bu konuda sizi en doğru şekilde yönlendirmek için destek ekibimizle hızlıca görüşmenizi öneririm.',
    suggestions: ['WhatsApp destek', 'Randevu almak istiyorum', 'Telefonla aramak istiyorum'],
  };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Merhaba, ben Hacettepe İşitme AI asistanı. Size nasıl yardımcı olabilirim?',
      suggestions: QUICK_ACTIONS,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [autoCtaShown, setAutoCtaShown] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (!open || autoCtaShown) return;
    const timer = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: 'Size en hızlı şekilde yardımcı olabilmemiz için hemen randevu formu doldurabilir veya WhatsApp hattımıza yazabilirsiniz. Aynı gün geri dönüş sağlıyoruz.',
          suggestions: ['Randevu sayfasını aç', 'Telefonla aramak istiyorum', 'WhatsApp destek'],
        },
      ]);
      setAutoCtaShown(true);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [open, autoCtaShown]);

  const handleSend = (forcedText?: string) => {
    const textToSend = (forcedText ?? input).trim();
    if (!textToSend) return;

    setMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(textToSend);
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-brand-accent text-white shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Destek Sohbeti"
      >
        <i className={`ri-${open ? 'close' : 'message-3'}-line text-2xl`} />
      </button>

      <div
        className={`fixed bottom-24 right-6 z-40 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ height: open ? '500px' : '0px' }}
      >
        <div className="bg-brand-dark text-white px-5 py-4 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-brand-accent flex items-center justify-center shrink-0">
            <i className="ri-customer-service-2-line text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold">Hacettepe AI Destek</p>
              <p className="text-[11px] text-gray-300">Canlı yönlendirme destekli</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i}>
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brand-accent text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>

              {msg.role === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.suggestions.map((suggestion) => (
                    <button
                      key={`${i}-${suggestion}`}
                      type="button"
                      onClick={() => handleSend(suggestion)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-brand-accent hover:text-brand-accent transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="px-4 py-3 border-t border-gray-100 shrink-0">
          <div className="grid grid-cols-3 gap-2 mb-2">
            <button
              type="button"
              onClick={() => handleSend('Randevu sayfasını aç')}
              className="text-xs bg-brand-accent text-white rounded-full py-2 font-semibold hover:bg-[#008f7f] transition-colors"
            >
              Randevu
            </button>
            <a
              href={`tel:${SITE_PHONE_E164}`}
              className="text-xs bg-white border border-brand-accent text-brand-accent rounded-full py-2 font-semibold hover:bg-brand-light transition-colors text-center inline-flex items-center justify-center gap-1"
            >
              <i className="ri-phone-line" />
              Bizi Ara
            </a>
            <button
              type="button"
              onClick={() => handleSend('WhatsApp destek')}
              className="text-xs bg-green-500 text-white rounded-full py-2 font-semibold hover:bg-green-600 transition-colors"
            >
              WhatsApp
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Mesajınızı yazın..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand-accent"
            />
            <button
              onClick={() => handleSend()}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent text-white hover:bg-[#008f7f] transition-colors shrink-0"
              aria-label="Gönder"
            >
              <i className="ri-send-plane-fill" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
