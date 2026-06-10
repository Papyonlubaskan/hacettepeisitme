import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, '..', 'public', 'local-images', 'google-place');
const OUT_DIR = path.join(__dirname, '..', 'public', 'local-images', 'home-flow');
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

/** Kullanıcının paylaştığı Google Maps fotoğraf kısa linkleri */
const PHOTO_LINKS = [
  {
    shortUrl: 'https://maps.app.goo.gl/FZosxbXwb7wbnbwb8',
    dest: 'flow-reception.webp',
    alt: 'Hacettepe İşitme Cihazları Samsun — merkez iç mekan',
  },
  {
    shortUrl: 'https://maps.app.goo.gl/RKUnbS7EVSYN9aAv8',
    dest: 'flow-exterior.webp',
    alt: 'Hacettepe İşitme Cihazları Samsun — dış cephe ve konum',
  },
  {
    shortUrl: 'https://maps.app.goo.gl/BGU5afnr2asQHsHy5',
    dest: 'flow-consultation.webp',
    alt: 'Hacettepe İşitme Cihazları Samsun — merkez görünümü',
  },
  {
    shortUrl: 'https://maps.app.goo.gl/36vx8qNqzWuJsnBV8',
    dest: 'flow-interior-2.webp',
    alt: 'Hacettepe İşitme Cihazları Samsun — iç mekan',
  },
];

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Referer: 'https://www.google.com/',
};

function decodeGooglePhotoUrl(mapsUrl) {
  const match = mapsUrl.match(/6s(https:%2F%2Flh3\.googleusercontent\.com[^!]+)/);
  if (!match) return null;
  const encoded = match[1];
  const thumb = decodeURIComponent(encoded);
  const dimMatch = mapsUrl.match(/!7i(\d+)!8i(\d+)/);
  const w = dimMatch ? dimMatch[1] : '1920';
  const h = dimMatch ? dimMatch[2] : '1280';
  const base = thumb.split('=')[0];
  return { full: `${base}=w${w}-h${h}-k-no`, thumb, w, h };
}

async function resolveShortUrl(shortUrl) {
  const res = await fetch(shortUrl, { redirect: 'follow', headers: HEADERS });
  return res.url;
}

async function download(url, filePath) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error('file too small');
  fs.writeFileSync(filePath, buf);
  return buf.length;
}

function toWebp(input, output) {
  execFileSync(
    FFMPEG,
    ['-y', '-i', input, '-vf', 'scale=1920:-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '88', output],
    { stdio: 'pipe' }
  );
}

async function main() {
  fs.mkdirSync(RAW_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const slides = [];
  const sources = [];

  for (let i = 0; i < PHOTO_LINKS.length; i += 1) {
    const item = PHOTO_LINKS[i];
    const mapsUrl = await resolveShortUrl(item.shortUrl);
    const photo = decodeGooglePhotoUrl(mapsUrl);
    if (!photo) {
      console.error('[fail] no photo in', item.shortUrl);
      process.exit(1);
    }

    const rawFile = path.join(RAW_DIR, `place-${String(i + 1).padStart(2, '0')}.jpg`);
    const webpFile = path.join(OUT_DIR, item.dest);
    const size = await download(photo.full, rawFile);
    toWebp(rawFile, webpFile);

    slides.push({ src: `/local-images/home-flow/${item.dest}`, alt: item.alt });
    sources.push({
      shortUrl: item.shortUrl,
      mapsUrl,
      source: photo.full,
      file: item.dest,
      bytes: size,
    });
    console.log(`[ok] ${item.dest} (${Math.round(size / 1024)} KB)`);
  }

  fs.writeFileSync(
    path.join(RAW_DIR, 'manifest.json'),
    JSON.stringify({ builtAt: new Date().toISOString(), sources }, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(OUT_DIR, 'manifest.json'),
    JSON.stringify({ builtAt: new Date().toISOString(), slides }, null, 2),
    'utf8'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
