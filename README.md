# Hacettepe İşitme Cihazları Web

Samsun merkezli işitme cihazları ve randevu sitesi. Frontend Vite + React; API ve statik dosya sunumu `server/index.js` üzerinden yapılır.

## Geliştirme

```bash
npm install
npm run dev:full
```

- Uygulama: `http://localhost:3000`
- API: `http://localhost:8787`

## Kontroller

```bash
npm run type-check
npm run lint
npm run test
npm run build
```

## Railway dağıtımı (aktif)

**Deploy repo:** [Papyonlubaskan/hacettepeisitme](https://github.com/Papyonlubaskan/hacettepeisitme)  
**Railway:** [hacettepeisitme-web-production](https://railway.com/project/3c251192-1aa8-4d72-99db-796132bc5f3f)  
**Canlı:** https://hacettepeisitme.com.tr  
**Railway (yedek):** https://hacettepeisitme-web-production.up.railway.app

Kod push (deploy repo):

```bash
npm run deploy:push
# veya: git push papyon main
```

**Otomatik deploy:** `main` push → CI + GitHub Actions `Deploy to Railway` (`RAILWAY_TOKEN` secret tanımlı).

**Deploy tetiklenmiyorsa:**

1. GitHub → Actions → **Deploy to Railway** → **Run workflow**
2. Railway Source: `Papyonlubaskan/hacettepeisitme` + branch `main`

Yerel CLI deploy (hemen):

```bash
railway login
railway link -p 3c251192-1aa8-4d72-99db-796132bc5f3f
railway up --detach
```

### Railway ortam değişkenleri

Build sırasında (Docker):

- `VITE_SITE_URL` — canonical URL (şu an Railway adresi)
- `VITE_GTM_ID`, `VITE_META_PIXEL_ID` — analytics (boş bırakılırsa yüklenmez)

Runtime:

- `SMTP_USER`, `SMTP_PASS` (Gmail **uygulama şifresi**, 16 hane), `MAIL_TO` — form e-postaları
- `WHATSAPP_NOTIFY_API_KEY` — boş bırakın (CallMeBot isteğe bağlı; formlar WhatsApp handoff kullanır)
- `CORS_ORIGIN` — izin verilen kök adresler
- `INSTAGRAM_ACCESS_TOKEN` — isteğe bağlı; canlı Instagram güncellemesi için

Instagram akışı production'da repo içi bundled feed + oEmbed ile çalışır. Yeni gönderiler için:

```bash
npm run instagram:refresh
git add server/data/instagram-feed-bundled.json
npm run deploy:push
```

---

## Alan adı: hacettepeisitme.com.tr (Hostinger + Railway)

Kod tarafı güncellendi. DNS ve Railway panel adımları için aşağıdaki sırayı izleyin.

### Adım 1 — Railway'de domain ekle

1. https://railway.com/project/3c251192-1aa8-4d72-99db-796132bc5f3f adresini açın
2. **hacettepeisitme-web-production** servisine tıklayın
3. **Settings** → **Networking** → **Custom Domain** → **Add Domain**
4. Sırayla ekleyin:
   - `hacettepeisitme.com.tr`
   - `www.hacettepeisitme.com.tr`
5. Railway her domain için bir **CNAME hedefi** gösterir (ör. `xxxxx.up.railway.app`) — not alın

### Adım 2 — Hostinger DNS kayıtları

1. https://hpanel.hostinger.com → **Domains** → **hacettepeisitme.com.tr**
2. **DNS / DNS Zone** veya **Manage DNS** açın
3. Eski A/CNAME kayıtları varsa (park sayfası) silin veya devre dışı bırakın
4. Şu kayıtları ekleyin:

| Tip | Ad (Name) | Hedef (Value) | TTL |
|-----|-----------|---------------|-----|
| **CNAME** | `www` | Railway'in verdiği CNAME (ör. `xxxx.up.railway.app`) | 3600 |
| **CNAME** veya **ALIAS** | `@` | Aynı Railway CNAME hedefi | 3600 |

> Hostinger kök (`@`) için CNAME kabul etmiyorsa: **A kaydı** için Railway panelindeki IP'yi kullanın veya Hostinger **Domain Redirect** ile `@` → `www` yönlendirmesi yapın.

5. Kaydedin; DNS yayılımı **15 dakika – 48 saat** sürebilir (genelde 1–2 saat)

### Adım 3 — Railway ortam değişkenleri

Railway servis → **Variables** → ekleyin/güncelleyin:

```
CORS_ORIGIN=https://hacettepeisitme.com.tr,https://www.hacettepeisitme.com.tr,https://hacettepeisitme-web-production.up.railway.app,http://localhost:3000
PRIMARY_SITE_HOST=hacettepeisitme.com.tr
VITE_SITE_URL=https://hacettepeisitme.com.tr
```

`VITE_*` değişkenleri **build** sırasında kullanılır → kaydettikten sonra **Redeploy** yapın.

### Adım 4 — SSL ve doğrulama

1. Railway'de domain yanında **Valid** / yeşil kilit görünene kadar bekleyin
2. Tarayıcıda test edin:
   - https://hacettepeisitme.com.tr
   - https://www.hacettepeisitme.com.tr → otomatik `hacettepeisitme.com.tr`'ye yönlenmeli
   - https://hacettepeisitme.com.tr/api/health
   - https://hacettepeisitme.com.tr/sitemap.xml

### Adım 5 — Google Search Console (önerilen)

1. https://search.google.com/search-console
2. **hacettepeisitme.com.tr** mülkü ekle
3. Sitemap gönder: `https://hacettepeisitme.com.tr/sitemap.xml`

---

## Alan adı sonrası (isteğe bağlı)

Alan adı alındığında:

1. Railway → **Settings → Domains** → özel domain ekle
2. DNS kayıtlarını domain sağlayıcıda yapılandır
3. Railway Variables güncelle:
   - `CORS_ORIGIN` → yeni domain + Railway URL
   - `VITE_SITE_URL` → yeni domain (redeploy gerekir)
4. `public/robots.txt` ve `public/sitemap.xml` içindeki URL'leri yeni domain ile güncelle
5. GitHub Secrets → `RAILWAY_TOKEN` ekle (Actions deploy için, isteğe bağlı)

### hacettepeisitme55-a11y GitHub hesabı (manuel)

Hedef repo: `hacettepeisitme55-a11y/hacettepeisitme-web`

```bash
gh auth login   # hacettepeisitme55-a11y hesabı
git push origin main
```

Şu an deploy `papyon` remote üzerinden çalışıyor; `origin` hedef hesapla senkron olunca Railway source'u oraya taşınabilir.
