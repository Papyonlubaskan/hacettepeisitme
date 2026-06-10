import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'local-images', 'google-place');
const MANIFEST = path.join(OUT_DIR, 'manifest.json');
const PHOTO_SIZE = '=w1920-h1280-k-no';

const URLS = [
  'https://www.google.com/search?q=Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi&hl=tr&tbm=lcl',
  'https://www.google.com/maps/place/Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi/@41.2694071,36.297792,17z/data=!4m6!3m5!1s0x4088777f8e8b8b8b:0x1a8f4e2c8d4b3a19!8m2!3d41.2694071!4d36.297792!16s%2Fg%2F11xw6t44j_?hl=tr',
  'https://www.google.com/search?q=Hacettepe+%C4%B0%C5%9Fitme+Cihazlar%C4%B1&hl=tr&tbm=lcl',
];

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept-Language': 'tr-TR,tr;q=0.9',
};

function decodeEscapes(text) {
  return text
    .replace(/\\u003d/g, '=')
    .replace(/\\u0026/g, '&')
    .replace(/\\u002F/g, '/')
    .replace(/\\\//g, '/')
    .replace(/\\x3d/g, '=');
}

function extractPhotoUrls(html) {
  const decoded = decodeEscapes(html);
  const patterns = [
    /https:\/\/lh3\.googleusercontent\.com\/p\/[A-Za-z0-9_-]+(?:=[^"'\s\\]+)?/g,
    /https:\/\/lh3\.googleusercontent\.com\/gps-cs-s\/[A-Za-z0-9_/-]+(?:=[^"'\s\\]+)?/g,
    /https:\/\/lh3\.googleusercontent\.com\/g\/[A-Za-z0-9_-]+(?:=[^"'\s\\]+)?/g,
  ];
  const found = [];
  for (const pattern of patterns) {
    for (const match of decoded.matchAll(pattern)) {
      found.push(match[0]);
    }
  }
  return found;
}

function isThumb(url) {
  return /=s(32|40|48|56|64|96|120)-/.test(url) || url.includes('/a/ACg8oc') || url.includes('/a-/ALV-Uj');
}

function toLarge(url) {
  const base = url.split('=')[0];
  return `${base}${PHOTO_SIZE}`;
}

async function download(url, file) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.google.com/' },
  });
  if (!res.ok) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 12000) return null;
  fs.writeFileSync(path.join(OUT_DIR, file), buf);
  return buf.length;
}

async function main() {
  const pool = new Set();
  for (const url of URLS) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      const html = await res.text();
      for (const u of extractPhotoUrls(html)) {
        if (!isThumb(u)) pool.add(toLarge(u));
      }
      console.log(`[scan] ${url.slice(0, 70)}… -> ${pool.size} urls`);
    } catch (err) {
      console.warn('[scan] failed', err.message);
    }
  }

  const candidates = [...pool].slice(0, 16);
  if (!candidates.length) {
    console.error('[photos] no urls extracted — use manual manifest');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const saved = [];
  for (let i = 0; i < candidates.length; i += 1) {
    const file = `place-${String(i + 1).padStart(2, '0')}.jpg`;
    try {
      const size = await download(candidates[i], file);
      if (!size) continue;
      saved.push({
        file: `/local-images/google-place/${file}`,
        source: candidates[i],
      });
      console.log(`[saved] ${file} (${Math.round(size / 1024)} KB)`);
    } catch (err) {
      console.warn('[skip]', err.message);
    }
  }

  if (!saved.length) {
    console.error('[photos] downloads failed');
    process.exit(1);
  }

  fs.writeFileSync(
    MANIFEST,
    JSON.stringify({ builtAt: new Date().toISOString(), photos: saved }, null, 2),
    'utf8'
  );
}

main();
