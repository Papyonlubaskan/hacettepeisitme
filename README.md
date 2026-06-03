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

**GitHub:** [hacettepeisitme55-a11y](https://github.com/hacettepeisitme55-a11y) → repo: `hacettepeisitme-web`  
**Railway:** [hacettepeisitme-web-production](https://railway.com/project/3c251192-1aa8-4d72-99db-796132bc5f3f) → branch `main`  
**Canlı:** `https://hacettepeisitme-web-production.up.railway.app`

### 1) GitHub repo oluştur (hacettepeisitme55-a11y ile giriş)

[Yeni repo](https://github.com/new) → ad: `hacettepeisitme-web` → Public → README ekleme.

Alternatif: [Import](https://github.com/new/import?import_url=https://github.com/Papyonlubaskan/hacettepeisitme) ile mevcut kodu içe aktar.

### 2) Push

```bash
gh auth login   # hacettepeisitme55-a11y hesabı
git remote set-url origin https://github.com/hacettepeisitme55-a11y/hacettepeisitme-web.git
git push -u origin main
```

### 3) Railway bağla

Railway proje → **Settings** → **Source** → GitHub → `hacettepeisitme55-a11y/hacettepeisitme-web` → branch **main** → Deploy.

### Yerel CLI deploy

```bash
railway login
railway link -p 3c251192-1aa8-4d72-99db-796132bc5f3f
railway up --detach
```

Zorunlu değişkenler:

- `SMTP_USER`, `SMTP_PASS`, `MAIL_TO` — form e-postaları
- `CORS_ORIGIN` — canlı site kök adresi
- `VITE_SITE_URL`, `VITE_GTM_ID`, `VITE_META_PIXEL_ID` — build sırasında Vite’a geçer

İsteğe bağlı:

- `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` — yorumlar için Places yedeği
- `NEWSLETTER_API_KEY` — bülten yönetim uçları

Canlı adres: `https://hacettepeisitme-web-production.up.railway.app` (Railway proje: `3c251192-1aa8-4d72-99db-796132bc5f3f`)
