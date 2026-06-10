export interface ShowcaseFeature {
  text: string;
  highlight?: string;
}

export interface ShowcaseModelType {
  label: string;
  sublabel: string;
  image: string;
}

export interface ShowcaseProduct {
  name: string;
  specs: string;
}

export interface ShowcaseSeries {
  id: string;
  navLabel: string;
  seriesName: string;
  badge?: string;
  headline: string;
  subline?: string;
  origin: string;
  features: ShowcaseFeature[];
  badges: string[];
  image: string;
  videoSrc: string;
  videoPoster: string;
  warranty?: string;
  modelTypes: ShowcaseModelType[];
  products: ShowcaseProduct[];
}

export interface FitVideo {
  title: string;
  category: string;
  videoSrc: string;
  videoPoster: string;
}

const SHOWCASE_IMG = {
  vista: '/local-images/showcase/vista-showcase.webp',
  am: '/local-images/showcase/am-showcase.webp',
  nitro: '/local-images/showcase/nitro-showcase.webp',
  pediatrik: '/local-images/pediatrik-isitme-cocuk.webp',
  ric: '/local-images/showcase/device-ric-thumb.webp',
  bte: '/local-images/showcase/device-bte-thumb.webp',
  ite: '/local-images/showcase/device-ite-thumb.webp',
} as const;

const SHOWCASE_VIDEO = {
  vista: '/local-images/showcase/videos/vista.mp4',
  am: '/local-images/showcase/videos/am.mp4',
  nitro: '/local-images/showcase/videos/nitro.mp4',
  pediatrik: '/local-images/showcase/videos/pediatrik.mp4',
  fitRic: '/local-images/showcase/videos/fit-ric.mp4',
  fitBte: '/local-images/showcase/videos/fit-bte.mp4',
  fitIte: '/local-images/showcase/videos/fit-ite.mp4',
  fitCharge: '/local-images/showcase/videos/fit-charge.mp4',
} as const;

const SHOWCASE_POSTER = {
  vista: '/local-images/showcase/videos/vista-poster.jpg',
  am: '/local-images/showcase/videos/am-poster.jpg',
  nitro: '/local-images/showcase/videos/nitro-poster.jpg',
  pediatrik: '/local-images/showcase/videos/pediatrik-poster.jpg',
  fitRic: '/local-images/showcase/videos/fit-ric-poster.jpg',
  fitBte: '/local-images/showcase/videos/fit-bte-poster.jpg',
  fitIte: '/local-images/showcase/videos/fit-ite-poster.jpg',
  fitCharge: '/local-images/showcase/videos/fit-charge-poster.jpg',
} as const;

export const SHOWCASE_SERIES: ShowcaseSeries[] = [
  {
    id: 'vista',
    navLabel: 'VISTA',
    seriesName: 'Vista',
    badge: 'Yeni',
    headline: 'Şarjlı, suya dayanıklı ve akıllı konuşma teknolojisi',
    subline: 'Gürültülü ortamlarda daha net konuşma anlayışı için gelişmiş ses işleme.',
    origin: 'Premium segment · Hacettepe İşitme danışmanlığı',
    features: [
      { text: ' doğal ve dengeli ses deneyimi', highlight: 'Kişiye özel' },
      { text: ' şarj süresi', highlight: '30 saate kadar' },
      { text: ' dayanıklı gövde', highlight: 'IP68 su ve toz koruması' },
      { text: 'Akıllı telefon ve TV bağlantısı', highlight: 'Bluetooth' },
      { text: 'Ortam değişimine otomatik uyum', highlight: 'Akıllı ortam algılama' },
      { text: 'Uzaktan program güncelleme', highlight: 'Mobil uygulama' },
    ],
    badges: ['Bluetooth', 'Şarjlı', 'IP68', 'RIC'],
    image: SHOWCASE_IMG.vista,
    videoSrc: SHOWCASE_VIDEO.vista,
    videoPoster: SHOWCASE_POSTER.vista,
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK İÇİ HOPARLÖRLÜ', sublabel: 'Vista RIC serisi', image: SHOWCASE_IMG.ric },
      { label: 'KULAK ARKASI', sublabel: 'Vista güçlü modeller', image: SHOWCASE_IMG.bte },
    ],
    products: [
      { name: 'Vista Premium', specs: 'Premium RIC · Şarjlı · Gelişmiş konuşma netliği' },
      { name: 'Vista Advanced', specs: 'RIC · Şarjlı · Bluetooth · Gürültü yönetimi' },
      { name: 'Vista Power', specs: 'Güçlü BTE · İleri işitme kaybı · Uzaktan ayar' },
      { name: 'Vista Slim', specs: 'Ultra ince BTE · Estetik tasarım · Şarjlı seçenek' },
    ],
  },
  {
    id: 'a-m',
    navLabel: 'A&M',
    seriesName: 'A&M',
    headline: 'Kendi sesinizi doğal duyun, her ortamda net konuşun',
    subline: 'Gelişmiş ses işleme ve kişisel ses dengeleme teknolojisi.',
    origin: 'Premium segment · Hacettepe İşitme danışmanlığı',
    features: [
      { text: ' ses işleme platformu', highlight: 'Gelişmiş işlemci' },
      { text: ' şarj istasyonu desteği', highlight: '8 güne kadar' },
      { text: 'El hareketi ile kontrol', highlight: 'Hands-free' },
      { text: 'Akıllı telefon uygulaması', highlight: 'Mobil kontrol' },
      { text: 'Gürültülü ortamda konuşma netliği', highlight: 'Konuşma odağı' },
      { text: 'Uzaktan odyolog desteği', highlight: 'Tele-danışmanlık' },
    ],
    badges: ['Bluetooth', 'Şarjlı', 'RIC'],
    image: SHOWCASE_IMG.am,
    videoSrc: SHOWCASE_VIDEO.am,
    videoPoster: SHOWCASE_POSTER.am,
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK İÇİ HOPARLÖRLÜ', sublabel: 'A&M şarjlı RIC', image: SHOWCASE_IMG.ric },
      { label: 'KULAK ARKASI', sublabel: 'A&M BTE serisi', image: SHOWCASE_IMG.bte },
    ],
    products: [
      { name: 'A&M Premium', specs: 'Premium RIC · Şarjlı · Kişisel ses dengeleme' },
      { name: 'A&M Style', specs: 'İnce tasarım · Şarjlı · Bluetooth streaming' },
      { name: 'A&M Classic', specs: 'BTE · Pil ve şarjlı · Erişilebilir segment' },
      { name: 'A&M Canal', specs: 'Hazır kanal içi · Hızlı uygulama' },
    ],
  },
  {
    id: 'nitro',
    navLabel: 'NITRO',
    seriesName: 'Nitro',
    headline: 'Çevrenizdeki tüm sesleri doğal ve dengeli duyun',
    subline: 'Beynin işitsel bilgiyi işlemesine destek olan doğal dinleme yaklaşımı.',
    origin: 'Premium segment · Hacettepe İşitme danışmanlığı',
    features: [
      { text: ' derin sinir ağı işleme', highlight: 'Yapay zeka destekli' },
      { text: 'Çoklu cihaz bağlantısı', highlight: 'Kablosuz aksesuar' },
      { text: ' şarjlı kullanım', highlight: '24 saate kadar' },
      { text: 'Tinnitus rahatlama modülleri', highlight: 'Çınlama desteği' },
      { text: 'Gürültülü ortamda konuşma odağı', highlight: 'Konuşma güçlendirme' },
      { text: 'Kişiye özel kulak içi üretim', highlight: 'Özel kalıp' },
    ],
    badges: ['Bluetooth', 'Şarjlı', 'RIC'],
    image: SHOWCASE_IMG.nitro,
    videoSrc: SHOWCASE_VIDEO.nitro,
    videoPoster: SHOWCASE_POSTER.nitro,
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK İÇİ HOPARLÖRLÜ', sublabel: 'Nitro RIC modeller', image: SHOWCASE_IMG.ric },
      { label: 'KULAK ARKASI', sublabel: 'Nitro güçlü seri', image: SHOWCASE_IMG.bte },
    ],
    products: [
      { name: 'Nitro Elite', specs: 'Flagship RIC · Gelişmiş ses işleme · Şarjlı' },
      { name: 'Nitro Plus', specs: 'RIC · Bluetooth · Tinnitus desteği' },
      { name: 'Nitro Custom', specs: 'Özel IIC · Görünmez tasarım · 3D kalıp' },
      { name: 'Nitro Power', specs: 'Güçlü BTE · Profund kayıp · Super Power' },
    ],
  },
  {
    id: 'pediatrik',
    navLabel: 'PEDİATRİK GRUP',
    seriesName: 'Pediatrik Grup',
    badge: 'Pediatrik',
    headline: 'Çocuklara özel işitme cihazı uygulaması ve aile desteği',
    subline: 'Erken müdahale ile konuşma ve sosyal gelişimi destekleyen pediatrik programlar.',
    origin: 'Samsun İlkadım · Pediatrik odyoloji danışmanlığı',
    features: [
      { text: ' dayanıklı ve güvenli tasarım', highlight: 'Çocuklara özel' },
      { text: 'Renkli ve kişiselleştirilebilir kabuklar', highlight: 'Eğlenceli modeller' },
      { text: 'Aile eğitimi ve takip programı', highlight: 'Yüz yüze destek' },
      { text: 'Okul ve sosyal ortam profilleri', highlight: 'Özel programlar' },
      { text: 'Koklear implant uyumlu modeller', highlight: 'İmplant desteği' },
      { text: 'SGK süreç danışmanlığı', highlight: 'Evrak desteği' },
    ],
    badges: ['Pediatrik', 'SGK', 'Aile Desteği', 'BTE'],
    image: SHOWCASE_IMG.pediatrik,
    videoSrc: SHOWCASE_VIDEO.pediatrik,
    videoPoster: SHOWCASE_POSTER.pediatrik,
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK ARKASI', sublabel: 'Pediatrik BTE modeller', image: SHOWCASE_IMG.bte },
      { label: 'GÜÇLÜ MODELLER', sublabel: 'İleri kayıp için SP serileri', image: SHOWCASE_IMG.ric },
    ],
    products: [
      { name: 'Pediatrik Grup RIC', specs: 'Pediatrik RIC · Dayanıklı · LED durum göstergesi' },
      { name: 'Pediatrik Grup BTE', specs: 'Çocuk BTE · Renkli kabuk · Tam gün pil' },
      { name: 'Pediatrik Grup Active', specs: 'Pediatrik BTE · Güvenli pil yuvası' },
      { name: 'Pediatrik Grup Power', specs: 'Güçlü pediatrik · İmplant uyumlu' },
    ],
  },
];

export const FIT_VIDEOS: FitVideo[] = [
  {
    title: 'Kulak İçi Hoparlörlü Cihaz Nasıl Takılır?',
    category: 'Kulak İçi Hoparlörlü',
    videoSrc: SHOWCASE_VIDEO.fitRic,
    videoPoster: SHOWCASE_POSTER.fitRic,
  },
  {
    title: 'Kulak Arkası Cihaz Nasıl Kullanılır?',
    category: 'Kulak Arkası',
    videoSrc: SHOWCASE_VIDEO.fitBte,
    videoPoster: SHOWCASE_POSTER.fitBte,
  },
  {
    title: 'Kulak İçi Cihaz Kulağımda Nasıl Görünür?',
    category: 'Kulak İçi',
    videoSrc: SHOWCASE_VIDEO.fitIte,
    videoPoster: SHOWCASE_POSTER.fitIte,
  },
  {
    title: 'Şarjlı İşitme Cihazı Bakımı',
    category: 'Bakım',
    videoSrc: SHOWCASE_VIDEO.fitCharge,
    videoPoster: SHOWCASE_POSTER.fitCharge,
  },
];
