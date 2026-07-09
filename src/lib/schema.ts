import {
  SITE_ADDRESS_SCHEMA,
  SITE_MAP_LAT,
  SITE_MAP_LNG,
  SITE_MAP_URL,
  SITE_PHONE_E164,
} from '@/lib/siteContact';
import {
  SITE_GOOGLE_RATING,
  SITE_GOOGLE_REVIEW_COUNT,
  SITE_NAME,
  SITE_SAME_AS,
  defaultOgImageUrl,
  localBusinessNapDescription,
} from '@/lib/siteSeo';
import { absoluteUrl } from '@/lib/siteUrl';

export const SITE_FAQ = [
  {
    question: 'Samsun işitme cihazları nereden alınır?',
    answer:
      'Hacettepe İşitme Cihazları İlkadım Tepecik merkezinde Samsun işitme cihazları satışı, ücretsiz test ve SGK danışmanlığı sunmaktadır. Adres: Eğitim Araştırma karşısı Şok Market üstü, 1537. Sokak 1B/b.',
  },
  {
    question: "Samsun'da işitme cihazı fiyatları ne kadar?",
    answer:
      'Fiyatlar marka ve modele göre değişir. Merkezimizde ücretsiz test sonrası bütçenize uygun işitme cihazı seçenekleri ve SGK ödeme bilgisi verilir.',
  },
  {
    question: 'Samsun\'da en iyi işitme merkezi hangisi?',
    answer:
      'Hacettepe İşitme Cihazları 15 yılı aşkın deneyim, Google\'da 4.9 puan, ücretsiz test, 30 gün deneme ve ömür boyu teknik destek ile Samsun\'da güvenilir bir işitme merkezidir.',
  },
  {
    question: 'İşitme testi gerçekten ücretsiz mi?',
    answer:
      'Evet, kliniğimizde yapılan ilk işitme testi ve danışmanlık hizmeti tamamen ücretsizdir. Hiçbir gizli ücret talep edilmez.',
  },
  {
    question: 'İşitme cihazı fiyatları ne kadar?',
    answer:
      'Fiyatlar seri, model ve teknolojiye göre değişmektedir. Ücretsiz danışmanlık sırasında bütçenize ve ihtiyacınıza en uygun seçenekleri sunuyoruz.',
  },
  {
    question: 'Cihaz uyarlama süreci nasıl işliyor?',
    answer:
      'Test sonuçlarınıza göre en uygun cihazı seçiyor, kulağınıza özel mold alıyor ve cihazı tam olarak ihtiyacınıza göre programlıyoruz. Bu süreç 1-2 seans sürebilir.',
  },
  {
    question: 'Satın aldıktan sonra destek alabilir miyim?',
    answer:
      'Kesinlikle! Tüm cihazlarımız 2 yıl garantilidir ve ömür boyu ücretsiz teknik destek, bakım ve ayarlama hizmetimiz bulunmaktadır.',
  },
  {
    question: 'Kaç yılda bir cihaz değiştirmeliyim?',
    answer:
      'İşitme cihazlarının ortalama ömrü 5-7 yıldır. Ancak işitme kaybınızdaki değişim, teknolojik gelişmeler ve cihazın durumu değiştirme kararını etkileyebilir.',
  },
] as const;

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HearingAidStore', 'MedicalBusiness', 'LocalBusiness'],
    '@id': `${absoluteUrl('/')}#business`,
    name: SITE_NAME,
    alternateName: [
      'Samsun Hacettepe İşitme Merkezi',
      'Hacettepe İşitme Merkezi',
      'Hacettepe İşitme Cihazları Samsun',
    ],
    url: absoluteUrl('/'),
    image: [
      defaultOgImageUrl(),
      absoluteUrl('/local-images/home-flow/flow-exterior.webp'),
      absoluteUrl('/local-images/home-flow/flow-consultation.webp'),
    ],
    logo: absoluteUrl('/local-images/brand-favicon.webp'),
    telephone: SITE_PHONE_E164,
    priceRange: '₺₺',
    description: localBusinessNapDescription(),
    hasMap: SITE_MAP_URL,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_MAP_LAT,
      longitude: SITE_MAP_LNG,
    },
    address: {
      '@type': 'PostalAddress',
      ...SITE_ADDRESS_SCHEMA,
    },
    areaServed: [
      { '@type': 'City', name: 'Samsun' },
      { '@type': 'AdministrativeArea', name: 'Karadeniz Bölgesi' },
    ],
    knowsAbout: [
      'Samsun işitme cihazları',
      'işitme cihazı Samsun',
      "Samsun'da işitme cihazı",
      'hacettepe işitme cihazları',
      'işitme cihazı',
      'odyometri',
      'işitme testi',
      'Vista',
      'A&M',
      'Nitro',
      'Pediatrik Grup',
      'SGK işitme cihazı',
    ],
    sameAs: [...SITE_SAME_AS],
    parentOrganization: { '@id': `${absoluteUrl('/')}#organization` },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(SITE_GOOGLE_RATING),
      reviewCount: String(SITE_GOOGLE_REVIEW_COUNT),
      bestRating: '5',
      worstRating: '1',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ücretsiz İşitme Testi',
          url: absoluteUrl('/ucretsiz-isitme-testi'),
        },
        price: '0',
        priceCurrency: 'TRY',
      },
    ],
  };
}

export function faqPageJsonLd(faqs: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      '@id': `${absoluteUrl('/')}#business`,
    },
    areaServed: { '@type': 'City', name: 'Samsun' },
    serviceType: name,
  };
}

export function webPageJsonLd(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: 'tr-TR',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    about: { '@id': `${absoluteUrl('/')}#business` },
    primaryImageOfPage: defaultOgImageUrl(),
  };
}
