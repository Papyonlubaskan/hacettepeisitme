import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import PhoneCallButton from '@/components/feature/PhoneCallButton';

interface HearingAidShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function HearingAidShell({
  title,
  subtitle,
  children,
}: HearingAidShellProps) {
  return (
    <div className="pt-[72px] animate-fadeInUp bg-white">
      <section className="py-16 md:py-20 bg-brand-dark text-white">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle ? <p className="text-white/80 text-lg max-w-3xl">{subtitle}</p> : null}
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto">{children}</div>
      </section>
      <section className="py-12 bg-brand-cream">
        <div className="w-full px-6 lg:px-12 max-w-5xl mx-auto flex flex-col sm:flex-row gap-4">
          <Link
            to="/randevu"
            className="inline-flex justify-center bg-brand-accent text-white px-6 py-3 rounded-full font-semibold"
          >
            Ücretsiz Test Randevusu
          </Link>
          <PhoneCallButton
            label="Bizi Ara"
            trackingLabel="hearing_aids_cta_call"
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-accent text-brand-accent px-6 py-3 rounded-full font-semibold hover:bg-white"
          />
          <Link
            to="/isitme-cihazi-fiyatlari"
            className="inline-flex justify-center text-brand-accent font-semibold px-6 py-3"
          >
            Fiyat Bilgisi →
          </Link>
        </div>
      </section>
    </div>
  );
}
