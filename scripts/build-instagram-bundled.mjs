import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INSTAGRAM_USERNAME = 'hacettepeisitmecihazlari55';
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
const INSTAGRAM_WEB_APP_ID = '936619743392459';
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
  if (contentType.includes('mp4')) return '.mp4';
  return '.jpg';
}

async function downloadAsset(url, fileBase, defaultExt) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Referer: INSTAGRAM_PROFILE_URL,
      Accept: '*/*',
    },
    redirect: 'follow',
  });
  if (!res.ok) return null;
  const ext = extensionFromContentType(res.headers.get('content-type')) || defaultExt;
  const filename = `${fileBase}${ext}`;
  const absolutePath = path.join(imagesDir, filename);
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(absolutePath, buffer);
  return `/local-images/instagram/${filename}`;
}

async function fetchUserFeedItems() {
  const pageRes = await fetch(INSTAGRAM_PROFILE_URL, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'tr-TR,tr;q=0.9' },
    redirect: 'follow',
  });
  if (!pageRes.ok) return new Map();
  const html = await pageRes.text();
  const lsd = html.match(/"LSD",\[\],\{"token":"([^"]+)"/)?.[1];
  const csrf = pageRes.headers.get('set-cookie')?.match(/csrftoken=([^;]+)/)?.[1];
  const feedUrl = `https://www.instagram.com/api/v1/feed/user/${INSTAGRAM_USERNAME}/username/?count=24`;
  const feedRes = await fetch(feedUrl, {
    headers: {
      'User-Agent': UA,
      'X-IG-App-ID': INSTAGRAM_WEB_APP_ID,
      'X-Requested-With': 'XMLHttpRequest',
      ...(lsd ? { 'X-FB-LSD': lsd } : {}),
      ...(csrf ? { 'X-CSRFToken': csrf, Cookie: `csrftoken=${csrf}` } : {}),
      Referer: INSTAGRAM_PROFILE_URL,
    },
  });
  if (!feedRes.ok) return new Map();
  const data = await feedRes.json();
  const byCode = new Map();
  for (const item of data.items || []) {
    if (!item?.code) continue;
    byCode.set(item.code, item);
  }
  return byCode;
}

mkdirSync(imagesDir, { recursive: true });

const feedByCode = await fetchUserFeedItems();
const posts = [];

for (let i = 0; i < permalinks.length; i += 1) {
  const permalink = permalinks[i];
  const shortcode = shortcodeFromPermalink(permalink) || `post-${i}`;
  const feedItem = feedByCode.get(shortcode);
  const oembedUrl = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(permalink)}`;
  const res = await fetch(oembedUrl, {
    headers: { 'User-Agent': UA, Accept: 'application/json' },
  });
  if (!res.ok) {
    console.warn('oembed failed', permalink, res.status);
    continue;
  }
  const data = await res.json();
  const thumbnailUrl =
    data.thumbnail_url ||
    feedItem?.image_versions2?.candidates?.[0]?.url ||
    '';
  if (!thumbnailUrl) continue;

  let imageUrl = await downloadAsset(thumbnailUrl, shortcode, '.jpg');
  if (!imageUrl) {
    console.warn('thumbnail download failed', permalink);
    imageUrl = `/local-images/instagram/${shortcode}.jpg`;
  }

  let videoUrl = null;
  const remoteVideo = feedItem?.video_versions?.[0]?.url;
  if (remoteVideo) {
    videoUrl = await downloadAsset(remoteVideo, shortcode, '.mp4');
    if (!videoUrl) console.warn('video download failed', shortcode);
  }

  posts.push({
    id: String(data.media_id || shortcode),
    imageUrl,
    videoUrl,
    permalink: permalink.replace(/\/?$/, '/'),
    title: data.title || 'Instagram paylaşımı',
    mediaType: permalink.includes('/reel/') || remoteVideo ? 'VIDEO' : 'IMAGE',
    timestamp: feedItem?.taken_at
      ? new Date(Number(feedItem.taken_at) * 1000).toISOString()
      : null,
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
console.log('videos:', posts.filter((p) => p.videoUrl).length);
