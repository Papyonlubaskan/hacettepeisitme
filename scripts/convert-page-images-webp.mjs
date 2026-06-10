import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(
  process.env.USERPROFILE || '',
  '.cursor',
  'projects',
  'c-Users-Teknogenetik-Downloads-Hacettepe-itme',
  'assets'
);
const OUT = path.join(__dirname, '..', 'public', 'local-images', 'pages');
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const QUALITY = 92;

const FILES = [
  'hero-about.png',
  'hero-contact.png',
  'hero-appointment.png',
  'hero-landing.png',
  'hero-online-test.png',
  'hero-privacy.png',
  'hero-terms.png',
  'hero-kvkk.png',
  'hero-sgk.png',
  'hero-blog.png',
  'hero-catalog.png',
  'hero-pricing.png',
  'hero-samsun-device.png',
  'hero-samsun-test.png',
  'about-secondary.png',
  'footer-bg.png',
];

fs.mkdirSync(OUT, { recursive: true });

for (const file of FILES) {
  const src = path.join(ASSETS, file);
  if (!fs.existsSync(src)) {
    console.warn('[skip] missing', file);
    continue;
  }
  const dest = path.join(OUT, file.replace(/\.png$/i, '.webp'));
  execFileSync(
    FFMPEG,
    ['-y', '-i', src, '-c:v', 'libwebp', '-lossless', '0', '-quality', String(QUALITY), '-preset', 'picture', dest],
    { stdio: 'pipe' }
  );
  console.log(`[webp] ${path.basename(dest)}`);
}

console.log('Done.');
