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

## Railway dağıtımı

**Proje:** [hacettepeisitme-web-production](https://railway.com/project/3c251192-1aa8-4d72-99db-796132bc5f3f)  
**Canlı:** `https://hacettepeisitme-web-production.up.railway.app`

### Yerel deploy (doğru Railway hesabıyla)

```bash
railway login
railway link -p 3c251192-1aa8-4d72-99db-796132bc5f3f
railway up --detach
```

### GitHub Actions

Railway proje → Settings → Tokens → token al → GitHub repo Secrets → `RAILWAY_TOKEN`

Zorunlu değişkenler:

- `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` — form e-postaları
- `CORS_ORIGIN` — canlı site kök adresi
- `VITE_SITE_URL`, `VITE_GTM_ID`, `VITE_META_PIXEL_ID` — build sırasında Vite’a geçer

İsteğe bağlı:

- `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` — yorumlar için Places yedeği
- `NEWSLETTER_API_KEY` — bülten yönetim uçları

Canlı adres: `https://hacettepeisitme-web-production.up.railway.app` (Railway proje: `3c251192-1aa8-4d72-99db-796132bc5f3f`)
