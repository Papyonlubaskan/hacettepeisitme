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
const imagesDir = path.join(__dirname, '../public/local-images/instagram');
const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
const permalinks = seed.permalinks || [];

function shortcodeFromPermalink(permalink) {
  const match = String(permalink).match(/\/(reel|p)\/([A-Za-z0-9_-]+)/);
  return match?.[2] || null;
}

function extensionFromContentType(contentType) {
  if (!contentType) return '.jpg';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('png')) return '.png';
  return '.jpg';
}

async function downloadThumbnail(thumbnailUrl, fileBase) {
  const res = await fetch(thumbnailUrl, {
    headers: {
      'User-Agent': UA,
      Referer: INSTAGRAM_PROFILE_URL,
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
    redirect: 'follow',
  });
  if (!res.ok) return null;
  const ext = extensionFromContentType(res.headers.get('content-type'));
  const filename = `${fileBase}${ext}`;
  const absolutePath = path.join(imagesDir, filename);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(absolutePath, buffer);
  return `/local-images/instagram/${filename}`;
}

mkdirSync(imagesDir, { recursive: true });

const posts = [];
for (let i = 0; i < permalinks.length; i += 1) {
  const permalink = permalinks[i];
  const shortcode = shortcodeFromPermalink(permalink) || `post-${i}`;
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

  let imageUrl = await downloadThumbnail(data.thumbnail_url, shortcode);
  if (!imageUrl) {
    console.warn('thumbnail download failed', permalink);
    imageUrl = data.thumbnail_url;
  }

  posts.push({
    id: String(data.media_id || shortcode),
    imageUrl,
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
console.log('local images ->', imagesDir);
