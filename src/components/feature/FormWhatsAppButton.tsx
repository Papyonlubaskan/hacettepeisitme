import { openFormWhatsApp } from '@/lib/formWhatsApp';

type Props = {
  formType: string;
  data: Record<string, string | undefined>;
  className?: string;
  label?: string;
};

export default function FormWhatsAppButton({
  formType,
  data,
  className = '',
  label = 'WhatsApp ile gönder',
}: Props) {
  return (
    <button
      type="button"
      onClick={() => openFormWhatsApp(formType, data)}
      className={`inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition-all whitespace-nowrap ${className}`}
    >
      <i className="ri-whatsapp-line text-lg" aria-hidden />
      <span>{label}</span>
    </button>
  );
}
