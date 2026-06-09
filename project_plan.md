# Hacettepe İşitme Cihazları - Kurumsal Web Sitesi

## 1. Project Description
Samsun'da işitme cihazları satan "Hacettepe İşitme Cihazları" için kurumsal, SEO uyumlu, dijital pazarlama tekniklerini barındıran modern bir web sitesi. İşitme sağlığı alanında profesyonel ve güven veren bir marka imajı sunar.

## 2. Page Structure
- `/` - Ana Sayfa (Hero, hizmetler, ürün vitrini, yorumlar, blog, CTA, footer)
- `/hakkimizda` - Hakkımızda (Marka hikayesi, değerlerimiz, SSS)
- `/randevu` - Online Randevu (Form ile randevu talebi)
- `/iletisim` - İletişim (Harita, iletişim bilgileri, form)

## 3. Core Features
- [x] SEO optimize edilmiş sayfa yapısı ve meta etiketler
- [x] Eyleme çağrı (CTA) butonları (Ücretsiz Test, WhatsApp Destek, Randevu)
- [x] Online randevu formu (Readdy form entegrasyonu)
- [x] İletişim formu
- [x] E-bülten abonelik formu (Footer'da)
- [x] AI destek sohbet botu (Readdy Agent entegre edildi)
- [x] Blog / İçerik bölümü (mock veri ile)
- [x] Müşteri yorumları bölümü
- [x] Sosyal medya bağlantıları (Instagram, Facebook, YouTube)
- [x] WhatsApp destek butonu
- [x] Sticky navigasyon ve mobil uyumlu menü
- [x] Animasyonlar ve görsel efektler
- [x] Schema.org FAQ yapılandırılmış veri
- [x] Google Maps entegrasyonu
- [x] Samsun yerel SEO (geo etiketleri)

## 4. Data Model Design
Supabase bağlı değil. Tüm veriler mock dosyaları ile yönetilmektedir.

## 5. Backend / Third-party Integration Plan
- **Readdy Form**: Randevu formu, iletişim formu, e-bülten formu
- **Readdy Agent**: AI destek sohbet botu (projectId: ea83a4d0-554f-4f36-aa21-996802fa66e3)
- **Sosyal Medya**: Instagram, Facebook, YouTube bağlantıları
- **Google Maps**: Konum embed
- **WhatsApp**: Destek hattı

## 6. Development Phase Plan

### Phase 1: Temel Site Kurulumu ve Sayfalar ✅
- Goal: Ana Sayfa, Hakkımızda, Randevu, İletişim sayfalarını oluştur
- Deliverable: Çalışan, navigasyonlu, form entegreli 4 sayfalık site
- Status: Tamamlandı

### Phase 2: İçerik ve AI Bot Geliştirmesi
- Goal: Blog içeriklerini zenginleştirme, AI destek botu akışlarını iyileştirme
- Deliverable: Daha fazla blog yazısı, gelişmiş bot konuşma akışları
- Status: Blog listesi ve SEO meta katmanı eklendi; içerik hâlâ mock veri

### Phase 3: Dijital Pazarlama Optimizasyonu
- Goal: Google Analytics, daha detaylı SEO, sosyal medya paylaşım widget'ları
- Deliverable: Schema.org ürün yapılandırılmış verisi, paylaşım butonları
- Status: robots/sitemap, route SEO, CI, RAILWAY_TOKEN, form güvenilirliği tamamlandı; GTM/Pixel ID ve gerçek SMTP_PASS kullanıcı girdisi bekleniyor