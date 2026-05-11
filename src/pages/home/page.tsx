import { Link } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import type { InstagramFeedPost, InstagramFeedResponse } from '@/types/instagramFeed';
import { SITE_ADDRESS_SCHEMA, SITE_PHONE_DISPLAY, SITE_PHONE_E164, SITE_PHONE_WA } from '@/lib/siteContact';
import { services } from '../../mocks/services';
import GoogleReviewsSection from '@/components/feature/GoogleReviewsSection';
import { blogPosts } from '../../mocks/blog';
import { trackCTAClick, trackWhatsAppClick } from '@/lib/tracking';

function HeroSection() {
  const ctaVariant = useMemo<'A' | 'B'>(() => {
    if (typeof window === 'undefined') return 'A';
    const existing = window.localStorage.getItem('hero_cta_variant');
    if (existing === 'A' || existing === 'B') return existing;
    const next = Math.random() < 0.5 ? 'A' : 'B';
    window.localStorage.setItem('hero_cta_variant', next);
    return next;
  }, []);

  const heroCta =
    ctaVariant === 'A'
      ? { title: 'Ücretsiz Test Randevusu', subtitle: '30 Gün Deneme Garantisi' }
      : { title: 'Aynı Gün Randevu Al', subtitle: 'Uzman Odyometrist Değerlendirmesi' };

  return (
    <section className="relative min-h-[600px] md:min-h-[720px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/local-images/pro-hero-main.webp"
          alt="Uzman tarafından işitme cihazı uygulaması"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 py-24 pt-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <i className="ri-shield-check-line text-brand-accent" />
            <span className="text-sm text-white font-medium">Samsun&apos;un En Güvenilir İşitme Merkezi</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Hayatınızı
            <br />
            <em className="text-brand-accent">Yeniden Duyun</em>
          </h1>

          <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
            Almanya teknolojisi işitme cihazları ile yaşam kalitenizi artırın.
            Ücretsiz işitme testi ve 30 gün deneme garantisi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/randevu"
              className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#008f7f] transition-all hover:scale-105 whitespace-nowrap"
              onClick={() =>
                trackCTAClick(
                  `${heroCta.title} [${ctaVariant}]`,
                  'home_hero_ab',
                  '/randevu'
                )
              }
            >
              <span>{heroCta.title}</span>
              <i className="ri-arrow-right-line" />
            </Link>
            <a
              href={`https://wa.me/${SITE_PHONE_WA}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all whitespace-nowrap"
              onClick={() => trackWhatsAppClick(SITE_PHONE_E164)}
            >
              <i className="ri-whatsapp-line text-lg" />
              <span>WhatsApp Destek</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 mt-10">
            <p className="w-full text-xs text-white/70">{heroCta.subtitle}</p>
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                <i className="ri-award-line text-brand-accent" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">15+ Yıl</p>
                <p className="text-xs text-white/60">Deneyim</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                <i className="ri-user-heart-line text-brand-accent" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">5000+</p>
                <p className="text-xs text-white/60">Mutlu Müşteri</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                <i className="ri-customer-service-2-line text-brand-accent" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Ücretsiz</p>
                <p className="text-xs text-white/60">Danışmanlık</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const serviceCards = [
    ...services,
    {
      id: 'online-test',
      icon: 'ri-headphone-line',
      title: 'Online İşitme Testi',
      description:
        'Mobil ve masaüstünden hızlı ön değerlendirme yaparak işitme seviyeniz hakkında ilk sonucu hemen öğrenin.',
      cta: 'Hemen Test Ol',
      link: '/online-isitme-testi',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-cream">
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-accent/10 rounded-full px-4 py-2 mb-4">
            <i className="ri-star-smile-line text-brand-accent" />
            <span className="text-sm font-semibold text-brand-accent uppercase tracking-wider">Hizmetlerimiz</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">
            Kapsamlı İşitme Çözümleri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {serviceCards.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-accent/10 mb-6 group-hover:bg-brand-accent/20 transition-colors">
                <i className={`${service.icon} text-2xl text-brand-accent`} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                {service.description}
              </p>
              <Link
                to={service.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-[#008f7f] transition-colors"
                onClick={() => trackCTAClick(service.title, 'home_services', service.link)}
              >
                <span>{service.cta}</span>
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/hacettepeisitmecihazlari55';

const INSTAGRAM_FALLBACK_POSTS: InstagramFeedPost[] = [
  {
    id: 'local-1',
    imageUrl: '/local-images/pro-instagram-1.webp',
    permalink: INSTAGRAM_PROFILE_URL,
    title: 'İşitme testi bilgilendirmesi',
  },
  {
    id: 'local-2',
    imageUrl: '/local-images/pro-instagram-2.webp',
    permalink: INSTAGRAM_PROFILE_URL,
    title: 'Yeni teknoloji cihazlar',
  },
  {
    id: 'local-3',
    imageUrl: '/local-images/pro-instagram-3.webp',
    permalink: INSTAGRAM_PROFILE_URL,
    title: 'Bakım ve temizlik önerileri',
  },
  {
    id: 'local-4',
    imageUrl: '/local-images/pro-instagram-4.webp',
    permalink: INSTAGRAM_PROFILE_URL,
    title: 'Cihaz karşılaştırmaları',
  },
  {
    id: 'local-5',
    imageUrl: '/local-images/pro-instagram-5.webp',
    permalink: INSTAGRAM_PROFILE_URL,
    title: 'Hasta deneyimleri',
  },
  {
    id: 'local-6',
    imageUrl: '/local-images/pro-instagram-6.webp',
    permalink: INSTAGRAM_PROFILE_URL,
    title: 'Merkezden güncel paylaşımlar',
  },
];

function ProductsSection() {
  const [posts, setPosts] = useState<InstagramFeedPost[]>(INSTAGRAM_FALLBACK_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/instagram/feed');
        const data = (await res.json()) as InstagramFeedResponse;
        if (cancelled || !data.ok || !Array.isArray(data.posts) || data.posts.length === 0) return;
        setPosts(data.posts);
      } catch {
        /* yerel mock kalır */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-brand-dark">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                Instagram Akışı
              </h2>
              <p className="text-white/60">
                <span className="text-brand-accent font-semibold">@hacettepeisitmecihazlari55</span> hesabından
                paylaşımlar
              </p>
            </div>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-[#008f7f] transition-all whitespace-nowrap"
              onClick={() =>
                trackCTAClick('Instagram Profili', 'home_instagram', INSTAGRAM_PROFILE_URL)
              }
            >
              <i className="ri-instagram-line text-lg" />
              <span>Profili Aç</span>
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={`ig-skel-${i}`}
                    className="bg-white rounded-2xl overflow-hidden animate-pulse"
                  >
                    <div className="h-64 bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                      <div className="h-4 bg-gray-100 rounded w-full" />
                    </div>
                  </div>
                ))
              : posts.map((post) => (
                  <a
                    key={post.id}
                    href={post.permalink || INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    onClick={() =>
                      trackCTAClick(
                        post.title.slice(0, 80) || `Instagram ${post.id}`,
                        'home_instagram_feed',
                        post.permalink || INSTAGRAM_PROFILE_URL
                      )
                    }
                  >
                    <div className="h-64 overflow-hidden bg-gray-50">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <i className="ri-instagram-line" />
                        <span>@hacettepeisitmecihazlari55</span>
                      </div>
                      <p className="text-sm font-medium text-brand-dark line-clamp-2">{post.title}</p>
                    </div>
                  </a>
                ))}
          </div>
          <div className="text-center mt-8">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:text-[#008f7f] transition-colors"
              onClick={() =>
                trackCTAClick('Instagramda Daha Fazla', 'home_instagram_more', INSTAGRAM_PROFILE_URL)
              }
            >
              <span>Instagram&apos;da daha fazla paylaşım görüntüle</span>
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-2">
              İşitme Sağlığı Blog
            </h2>
            <p className="text-gray-500">Uzman görüşleri ve faydalı bilgiler</p>
          </div>
          <span className="text-sm text-gray-400">Tüm Yazılar →</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.slice(0, 6).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-brand-cream rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-brand-dark mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <i className="ri-time-line" />
                  <span>{post.readTime} okuma</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/local-images/readdy-home-cta-cta2024v2b.webp"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-brand-dark/40" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Bugün Ücretsiz İşitme Testinizi Yaptırın
        </h2>
        <p className="text-white/80 text-base md:text-lg mb-2">
          Randevu için bizi arayın: {SITE_PHONE_DISPLAY}
        </p>
        <p className="text-white/60 text-sm mb-8">Aynı gün randevu imkanı</p>
        <Link
          to="/randevu"
          className="inline-flex items-center gap-2 bg-brand-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-[#008f7f] transition-all hover:scale-105 whitespace-nowrap"
          onClick={() => trackCTAClick('Randevu Oluştur', 'home_cta', '/randevu')}
        >
          <span>Randevu Oluştur</span>
          <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HearingAidStore',
    name: 'Hacettepe Isitme Cihazlari',
    image: '/local-images/readdy-home-hero-hero2024v2a.webp',
    telephone: SITE_PHONE_E164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_ADDRESS_SCHEMA.streetAddress,
      postalCode: SITE_ADDRESS_SCHEMA.postalCode,
      addressLocality: SITE_ADDRESS_SCHEMA.addressLocality,
      addressRegion: SITE_ADDRESS_SCHEMA.addressRegion,
      addressCountry: SITE_ADDRESS_SCHEMA.addressCountry,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };

  return (
    <div className="animate-fadeInUp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <GoogleReviewsSection subtitle="Google Haritalar üzerindeki güncel işletme yorumları" />
      <BlogSection />
      <CTASection />
    </div>
  );
}
