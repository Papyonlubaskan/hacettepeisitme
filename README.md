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
**Canlı:** https://hacettepeisitme-web-production.up.railway.app

Push sonrası Railway GitHub bağlantısı otomatik deploy tetikler:

```bash
npm run deploy:push
# veya: git push papyon main
```

Yerel CLI deploy:

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

- `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` — form e-postaları
- `CORS_ORIGIN` — izin verilen kök adresler
- `INSTAGRAM_ACCESS_TOKEN` — isteğe bağlı; canlı Instagram güncellemesi için

Instagram akışı production'da repo içi bundled feed + oEmbed ile çalışır. Yeni gönderiler için:

```bash
npm run instagram:refresh
git add server/data/instagram-feed-bundled.json
npm run deploy:push
```

---

## Alan adı sonrası (manuel — siz yapacaksınız)

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
