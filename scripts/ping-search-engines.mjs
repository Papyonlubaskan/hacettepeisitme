import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = (process.env.VITE_SITE_URL || 'https://hacettepeisitme.com.tr').replace(/\/$/, '');
const HOST = new URL(SITE_URL).hostname;
const INDEXNOW_KEY = 'hacettepeisitmeindexnow2026';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

function readSitemapUrls() {
  const xml = fs.readFileSync(path.join(root, 'public/sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function ping(label, url) {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' });
    console.log(`[seo-ping] ${label}: HTTP ${res.status}`);
    return res.ok;
  } catch (error) {
    console.warn(`[seo-ping] ${label} failed:`, error.message);
    return false;
  }
}

async function indexNow(urlList) {
  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urlList.slice(0, 100),
  };
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    console.log(`[seo-ping] IndexNow (${urlList.length} URL): HTTP ${res.status}`);
  } catch (error) {
    console.warn('[seo-ping] IndexNow failed:', error.message);
  }
}

console.log('[seo-ping] Sitemap:', SITEMAP_URL);
await ping('Yandex sitemap', `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);

const urls = readSitemapUrls();
if (urls.length) {
  await indexNow(urls);
}

console.log('[seo-ping] Google Search Console (manuel):');
console.log(`  https://search.google.com/search-console/sitemaps?resource_id=sc-domain:${HOST}`);
console.log(`  Eklenecek sitemap: ${SITEMAP_URL}`);
console.log('[seo-ping] Google İşletme Profili (manuel):');
console.log('  https://business.google.com → Adres: Tepecik 1537. Sokak 1B/b → Pin doğrula');
