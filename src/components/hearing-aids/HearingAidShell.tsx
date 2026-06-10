import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import PhoneCallButton from '@/components/feature/PhoneCallButton';
import PageHeroBanner from '@/components/feature/PageHeroBanner';
import { PAGE_IMAGES } from '@/lib/pageImages';

interface HearingAidShellProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  children: ReactNode;
}

export default function HearingAidShell({
  title,
  subtitle,
  heroImage = PAGE_IMAGES.catalog,
  children,
}: HearingAidShellProps) {
  return (
    <div className="pt-[72px] animate-fadeInUp bg-white">
      <PageHeroBanner title={title} subtitle={subtitle} imageSrc={heroImage} align="left" />
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
