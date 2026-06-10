import {
  SITE_ADDRESS_SCHEMA,
  SITE_MAP_LAT,
  SITE_MAP_LNG,
  SITE_MAP_URL,
  SITE_PHONE_E164,
} from '@/lib/siteContact';
import {
  SITE_GOOGLE_MAPS_URL,
  SITE_INSTAGRAM_URL,
  SITE_NAME,
  defaultOgImageUrl,
} from '@/lib/siteSeo';
import { absoluteUrl } from '@/lib/siteUrl';

export const SITE_FAQ = [
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
    url: absoluteUrl('/'),
    image: defaultOgImageUrl(),
    logo: absoluteUrl('/local-images/brand-favicon.webp'),
    telephone: SITE_PHONE_E164,
    priceRange: '₺₺',
    description:
      "Samsun İlkadım'da ücretsiz işitme testi, Vista, A&M ve Nitro işitme cihazları satışı, SGK danışmanlığı ve 30 gün deneme garantisi.",
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
      'işitme cihazı',
      'odyometri',
      'işitme testi',
      'Vista',
      'A&M',
      'Nitro',
      'Pediatrik Grup',
      'SGK işitme cihazı',
    ],
    sameAs: [SITE_INSTAGRAM_URL, SITE_GOOGLE_MAPS_URL],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
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
      '@type': 'HearingAidStore',
      name: SITE_NAME,
      url: absoluteUrl('/'),
      telephone: SITE_PHONE_E164,
    },
    areaServed: { '@type': 'City', name: 'Samsun' },
    serviceType: name,
  };
}
