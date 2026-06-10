import type { ReactNode } from 'react';

interface PageHeroBannerProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  align?: 'center' | 'left';
  minHeight?: string;
  prepend?: ReactNode;
  children?: ReactNode;
}

export default function PageHeroBanner({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  align = 'center',
  minHeight = 'min-h-[220px] md:min-h-[280px]',
  prepend,
  children,
}: PageHeroBannerProps) {
  const textAlign = align === 'center' ? 'text-center' : 'text-center md:text-left';
  const mx = align === 'center' ? 'mx-auto' : 'mx-auto md:mx-0';

  return (
    <section className={`relative overflow-hidden bg-brand-dark py-14 md:py-20 ${minHeight} flex items-center`}>
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={imageAlt || title}
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/92 via-brand-dark/78 to-brand-dark/55" />
      </div>
      <div className={`relative z-10 w-full px-6 lg:px-12 ${textAlign}`}>
        <div className={`max-w-5xl ${align === 'center' ? 'mx-auto' : 'mx-auto md:mx-0'}`}>
          {prepend}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className={`text-white/80 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed ${mx}`}>
              {subtitle}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
