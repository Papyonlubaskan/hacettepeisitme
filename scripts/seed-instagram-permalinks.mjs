import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INSTAGRAM_USERNAME = 'hacettepeisitmecihazlari55';
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const pageRes = await fetch(INSTAGRAM_PROFILE_URL, { headers: { 'User-Agent': UA } });
const html = await pageRes.text();
const lsd = html.match(/"LSD",\[\],\{"token":"([^"]+)"/)?.[1];
const csrf = pageRes.headers.get('set-cookie')?.match(/csrftoken=([^;]+)/)?.[1];
const feedUrl = `https://www.instagram.com/api/v1/feed/user/${INSTAGRAM_USERNAME}/username/?count=12`;
const feedRes = await fetch(feedUrl, {
  headers: {
    'User-Agent': UA,
    'X-IG-App-ID': '936619743392459',
    'X-Requested-With': 'XMLHttpRequest',
    Referer: INSTAGRAM_PROFILE_URL,
    ...(lsd ? { 'X-FB-LSD': lsd, 'X-ASBD-ID': '129477' } : {}),
    ...(csrf ? { Cookie: `csrftoken=${csrf};`, 'X-CSRFToken': csrf } : {}),
  },
});
const data = await feedRes.json();
const permalinks = (data.items || []).map((item) =>
  item.product_type === 'clips'
    ? `https://www.instagram.com/reel/${item.code}/`
    : `https://www.instagram.com/p/${item.code}/`
);
const outPath = path.join(__dirname, '../server/data/instagram-permalink-seed.json');
mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify({ updatedAt: new Date().toISOString(), permalinks }, null, 2));
console.log('saved', permalinks.length, 'links to', outPath);
