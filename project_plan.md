# Hacettepe İşitme Cihazları - Kurumsal Web Sitesi

## 1. Project Description
Samsun'da işitme cihazları satan "Hacettepe İşitme Cihazları" için kurumsal, SEO uyumlu, dijital pazarlama tekniklerini barındıran modern bir web sitesi. İşitme sağlığı alanında profesyonel ve güven veren bir marka imajı sunar.

**Canlı:** https://hacettepeisitme.com.tr  
**Deploy repo:** Papyonlubaskan/hacettepeisitme (Railway)

## 2. Page Structure
- `/` - Ana Sayfa
- `/hakkimizda` - Hakkımızda
- `/randevu` - Online Randevu
- `/iletisim` - İletişim
- `/blog`, `/blog/:slug` - Blog
- `/ucretsiz-isitme-testi`, `/online-isitme-testi` - Test landing'leri
- `/samsun-isitme-cihazi`, `/samsun-isitme-testi`, `/isitme-cihazi-fiyatlari`, `/sgk-odeme-tutarlari` - SEO sayfaları
- `/gizlilik-politikasi`, `/kullanim-kosullari`, `/kvkk-aydinlatma-metni` - Yasal

## 3. Core Features
- [x] SEO (meta, JSON-LD, sitemap, robots, sunucu tarafı enjeksiyon)
- [x] GA4 (G-5HBR604GT5)
- [x] Google Search Console doğrulama dosyası
- [x] Formlar → Resend HTTPS mail (Railway SMTP engeli aşıldı)
- [x] Bülten abonelik + hoş geldin maili (Resend)
- [x] Google yorumları API (canlı)
- [x] Instagram bundled feed (12 gönderi)
- [x] CTA: Bizi Ara, WhatsApp, randevu
- [x] AI sohbet botu
- [x] CI + GitHub Actions Railway deploy
- [ ] GTM / Meta Pixel (ID bekleniyor)
- [ ] Blog içeriği genişletme (6 mock yazı)

## 4. Data Model
Supabase yok. Blog, hizmetler mock dosyalarında; formlar `server/data/` altında loglanır.

## 5. Integrations
- **Resend** — form + bülten e-postaları
- **Google Places** — yorumlar (API key Railway'de)
- **Instagram** — bundled feed + isteğe bağlı Graph API token
- **Readdy Agent** — chatbot
- **WhatsApp** — sabit destek hattı

## 6. Development Phases

### Phase 1: Temel Site ✅
Ana sayfalar, formlar, navigasyon, deploy.

### Phase 2: İçerik ve Bot (devam ediyor)
- [x] Blog listesi + SEO meta
- [ ] Daha fazla gerçek blog yazısı
- [ ] Bot akış iyileştirmeleri

### Phase 3: Dijital Pazarlama (kısmen tamam)
- [x] GA4, sitemap, route SEO, Search Console doğrulama
- [x] Form mail güvenilirliği (Resend)
- [x] Samsun yerel SEO landing sayfaları
- [ ] Search Console sitemap gönderimi (panel)
- [ ] Resend domain doğrulama (`RESEND_FROM`)
- [ ] GTM + Meta Pixel kampanya entegrasyonu
- [ ] Google Business Profile optimizasyonu

## 7. Bakım Notları
- Instagram güncelleme: `npm run instagram:refresh` → commit → `npm run deploy:push`
- Bülten yönetim API: `NEWSLETTER_API_KEY` Railway'de tanımlı
- `origin` (hacettepeisitme55-a11y) senkronu: doğru GitHub hesabıyla push
