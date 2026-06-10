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
  brand: string;
  seriesName: string;
  badge?: string;
  headline: string;
  subline?: string;
  origin: string;
  features: ShowcaseFeature[];
  badges: string[];
  image: string;
  videoId: string;
  warranty?: string;
  modelTypes: ShowcaseModelType[];
  products: ShowcaseProduct[];
  catalogSlug: string;
}

export interface FitVideo {
  title: string;
  videoId: string;
  category: string;
}

export const SHOWCASE_SERIES: ShowcaseSeries[] = [
  {
    id: 'phonak-lumity',
    navLabel: 'LUMITY SERİSİ',
    brand: 'Phonak',
    seriesName: 'Audéo Lumity',
    badge: 'Yeni',
    headline: 'Şarjlı, suya dayanıklı ve akıllı konuşma teknolojisi',
    subline: 'SmartSpeech ile gürültülü ortamlarda daha net konuşma anlayışı.',
    origin: 'İsviçre üretimi Sonova teknolojisi',
    features: [
      { text: ' doğal ve dengeli ses deneyimi', highlight: 'Kişiye özel' },
      { text: ' şarj süresi', highlight: '30 saate kadar' },
      { text: ' dayanıklı gövde', highlight: 'IP68 su ve toz koruması' },
      { text: 'Akıllı telefon ve TV bağlantısı', highlight: 'Bluetooth' },
      { text: 'Ortam değişimine otomatik uyum', highlight: 'AutoSense OS' },
      { text: 'Uzaktan program güncelleme', highlight: 'myPhonak uygulaması' },
    ],
    badges: ['Bluetooth', 'Şarjlı', 'IP68', 'RIC'],
    image: '/local-images/readdy-products-prod1opt.webp',
    videoId: 'pbgpT6GZH9Q',
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK İÇİ HOPARLÖRLÜ', sublabel: 'Audéo Lumity RIC', image: '/local-images/readdy-products-prod1opt.webp' },
      { label: 'KULAK ARKASI', sublabel: 'Naída Lumity güçlü modeller', image: '/local-images/readdy-products-prod4opt.webp' },
    ],
    products: [
      { name: 'Phonak Audéo Lumity 90', specs: 'Premium RIC · Şarjlı · SmartSpeech · Uzaktan ayar' },
      { name: 'Phonak Audéo Lumity 70', specs: 'RIC · Şarjlı · Bluetooth · Gürültü yönetimi' },
      { name: 'Phonak Naída Lumity SP', specs: 'Güçlü BTE · İleri işitme kaybı · Roger uyumu' },
      { name: 'Phonak Slim', specs: 'Ultra ince BTE · Estetik tasarım · Şarjlı seçenek' },
    ],
    catalogSlug: 'phonak',
  },
  {
    id: 'signia-ix',
    navLabel: 'SIGNIA IX',
    brand: 'Signia',
    seriesName: 'Pure Charge&Go IX',
    headline: 'Kendi sesinizi doğal duyun, her ortamda net konuşun',
    subline: 'Own Voice Processing ve Integrated Xperience platformu.',
    origin: 'Almanya mühendisliği · Siemens mirası',
    features: [
      { text: ' ses işleme', highlight: 'Integrated Xperience' },
      { text: ' şarj istasyonu desteği', highlight: '8 güne kadar' },
      { text: 'El hareketi ile kontrol', highlight: 'Hands-free' },
      { text: 'Akıllı telefon uygulaması', highlight: 'Signia App' },
      { text: 'Gürültülü ortamda konuşma netliği', highlight: 'RealTime Conversation' },
      { text: 'Uzaktan odyolog desteği', highlight: 'TeleCare' },
    ],
    badges: ['Bluetooth', 'Şarjlı', 'IX', 'RIC'],
    image: '/local-images/readdy-products-prod2opt.webp',
    videoId: 'ueY61AUqCq0',
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK İÇİ HOPARLÖRLÜ', sublabel: 'Pure Charge&Go IX', image: '/local-images/readdy-products-prod2opt.webp' },
      { label: 'KULAK ARKASI', sublabel: 'Motion IX · Styletto IX', image: '/local-images/readdy-products-prod2opt.webp' },
    ],
    products: [
      { name: 'Signia Pure Charge&Go IX 7', specs: 'Premium RIC · Şarjlı · Own Voice Processing' },
      { name: 'Signia Styletto IX', specs: 'İnce tasarım · Şarjlı · Bluetooth streaming' },
      { name: 'Signia Motion IX', specs: 'BTE · Pil ve şarjlı · Ekonomik segment' },
      { name: 'Signia Silk IX', specs: 'Hazır kanal içi · Hızlı uygulama' },
    ],
    catalogSlug: 'signia',
  },
  {
    id: 'oticon-real',
    navLabel: 'REAL SERİSİ',
    brand: 'Oticon',
    seriesName: 'Oticon Real',
    headline: 'BrainHearing ile çevrenizdeki tüm sesleri dengeleyin',
    subline: 'Beynin işitsel bilgiyi işlemesine destek olan doğal dinleme yaklaşımı.',
    origin: 'Danimarka · BrainHearing teknolojisi',
    features: [
      { text: ' derin sinir ağı işleme', highlight: 'Deep Neural Network' },
      { text: 'Çoklu cihaz bağlantısı', highlight: 'ConnectClip' },
      { text: ' şarjlı kullanım', highlight: '24 saate kadar' },
      { text: 'Tinnitus rahatlama modülleri', highlight: 'Çınlama desteği' },
      { text: 'Gürültülü ortamda konuşma odağı', highlight: 'Speech Enhancement' },
      { text: 'Kişiye özel kulak içi üretim', highlight: 'Oticon Own' },
    ],
    badges: ['Bluetooth', 'Şarjlı', 'DNN', 'RIC'],
    image: '/local-images/readdy-products-prod3opt.webp',
    videoId: 'o7jMV6fVZms',
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK İÇİ HOPARLÖRLÜ', sublabel: 'Oticon Real RIC', image: '/local-images/readdy-products-prod3opt.webp' },
      { label: 'KULAK ARKASI', sublabel: 'Oticon Xceed güçlü seri', image: '/local-images/readdy-products-prod3opt.webp' },
    ],
    products: [
      { name: 'Oticon Real 1', specs: 'Flagship RIC · BrainHearing · Şarjlı' },
      { name: 'Oticon Real 2', specs: 'RIC · Bluetooth · Tinnitus desteği' },
      { name: 'Oticon Own', specs: 'Özel IIC · Görünmez tasarım · 3D kalıp' },
      { name: 'Oticon Xceed', specs: 'Güçlü BTE · Profund kayıp · Super Power' },
    ],
    catalogSlug: 'oticon',
  },
  {
    id: 'resound-omnia',
    navLabel: 'OMNIA SERİSİ',
    brand: 'ReSound',
    seriesName: 'ReSound OMNIA',
    badge: 'Yeni',
    headline: 'Gürültülü ortamlarda konuşmayı öne çıkaran akıllı işitme',
    subline: '360° ses algısı ve kişiselleştirilmiş dinleme profilleri.',
    origin: 'Danimarka · GN Hearing teknolojisi',
    features: [
      { text: ' konuşma anlayışı artışı', highlight: 'Gürültüde net duyum' },
      { text: ' şarj süresi', highlight: '30 saate kadar' },
      { text: 'M&RIE mikrofon tasarımı', highlight: 'Kişiye özel' },
      { text: 'iPhone ve Android uyumu', highlight: 'Bluetooth LE Audio' },
      { text: 'Otomatik ortam tanıma', highlight: 'All Access Directionality' },
      { text: 'Uzaktan ayar ve kontrol', highlight: 'ReSound Smart 3D' },
    ],
    badges: ['Bluetooth', 'Şarjlı', 'IP68', 'RIC'],
    image: '/local-images/readdy-products-prod1opt.webp',
    videoId: 'eBcN_S1I1bI',
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK İÇİ HOPARLÖRLÜ', sublabel: 'OMNIA RIC modeller', image: '/local-images/readdy-products-prod1opt.webp' },
      { label: 'KULAK ARKASI', sublabel: 'OMNIA BTE · ENZO güçlü', image: '/local-images/readdy-products-prod4opt.webp' },
    ],
    products: [
      { name: 'ReSound OMNIA 9', specs: 'Premium RIC · Şarjlı · 360° ses' },
      { name: 'ReSound OMNIA 7', specs: 'RIC · Bluetooth · Gürültü yönetimi' },
      { name: 'ReSound Key 4', specs: 'Erişilebilir segment · Şarjlı · Uzaktan ayar' },
      { name: 'ReSound ENZO Q', specs: 'Güçlü BTE · Profund kayıp · Titanyum boynuz' },
    ],
    catalogSlug: 'resound',
  },
  {
    id: 'pediatrik',
    navLabel: 'PEDİATRİK',
    brand: 'Hacettepe İşitme',
    seriesName: 'Çocuk İşitme Çözümleri',
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
    image: '/local-images/pediatrik-isitme-cocuk.webp',
    videoId: '7JkeYadHd2o',
    warranty: '2 Yıl Garanti',
    modelTypes: [
      { label: 'KULAK ARKASI', sublabel: 'Phonak Sky · Oticon Play PX', image: '/local-images/pediatrik-isitme-cocuk.webp' },
      { label: 'GÜÇLÜ MODELLER', sublabel: 'İleri kayıp için SP serileri', image: '/local-images/readdy-products-prod4opt.webp' },
    ],
    products: [
      { name: 'Phonak Sky Lumity', specs: 'Pediatrik RIC · Dayanıklı · LED durum göstergesi' },
      { name: 'Oticon Play PX', specs: 'Çocuk BTE · Renkli kabuk · Tam gün pil' },
      { name: 'Signia Motion PX', specs: 'Pediatrik BTE · Güvenli pil yuvası' },
      { name: 'ReSound ENZO Q', specs: 'Güçlü pediatrik · İmplant uyumlu' },
    ],
    catalogSlug: 'phonak',
  },
];

export const FIT_VIDEOS: FitVideo[] = [
  {
    title: 'Kulak İçi Hoparlörlü Cihaz Nasıl Takılır?',
    category: 'Kulak İçi Hoparlörlü',
    videoId: 'RYa6NEgQBXQ',
  },
  {
    title: 'Kulak Arkası Cihaz Nasıl Kullanılır?',
    category: 'Kulak Arkası',
    videoId: '6-Y140dN7lU',
  },
  {
    title: 'Kulak İçi Cihaz Kulağımda Nasıl Görünür?',
    category: 'Kulak İçi',
    videoId: 'ueY61AUqCq0',
  },
  {
    title: 'Şarjlı İşitme Cihazı Bakımı',
    category: 'Bakım',
    videoId: 'ZhHHxEtZSas',
  },
];
