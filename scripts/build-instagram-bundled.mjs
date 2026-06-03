import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INSTAGRAM_USERNAME = 'hacettepeisitmecihazlari55';
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const seedPath = path.join(__dirname, '../server/data/instagram-permalink-seed.json');
const outPath = path.join(__dirname, '../server/data/instagram-feed-bundled.json');
const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
const permalinks = seed.permalinks || [];

const posts = [];
for (let i = 0; i < permalinks.length; i += 1) {
  const permalink = permalinks[i];
  const oembedUrl = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(permalink)}`;
  const res = await fetch(oembedUrl, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
  });
  if (!res.ok) {
    console.warn('oembed failed', permalink, res.status);
    continue;
  }
  const data = await res.json();
  if (!data.thumbnail_url) continue;
  posts.push({
    id: String(data.media_id || `bundled-${i}`),
    imageUrl: data.thumbnail_url,
    permalink: permalink.replace(/\/?$/, '/'),
    title: data.title || 'Instagram paylaşımı',
    mediaType: permalink.includes('/reel/') ? 'VIDEO' : 'IMAGE',
    timestamp: null,
  });
  await new Promise((r) => setTimeout(r, 350));
}

const payload = {
  ok: true,
  source: 'instagram',
  postCount: posts.length,
  profileUrl: INSTAGRAM_PROFILE_URL,
  posts,
  bundled: true,
};

mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(payload, null, 2));
console.log('bundled feed:', posts.length, 'posts ->', outPath);
