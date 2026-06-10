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
const OUT = path.join(__dirname, '..', 'public', 'local-images', 'home-flow');
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

const FILES = [
  { src: 'hero-clinic-interior-1.png', dest: 'flow-reception.webp', label: 'Merkez iç mekan — resepsiyon' },
  { src: 'hero-clinic-exterior-1.png', dest: 'flow-exterior.webp', label: 'Dış cephe — Tepecik merkez' },
  { src: 'hero-clinic-consultation-1.png', dest: 'flow-consultation.webp', label: 'Danışmanlık ve test odası' },
];

fs.mkdirSync(OUT, { recursive: true });

const slides = [];
for (const file of FILES) {
  const input = path.join(ASSETS, file.src);
  if (!fs.existsSync(input)) {
    console.warn('[skip] missing', file.src);
    continue;
  }
  const output = path.join(OUT, file.dest);
  execFileSync(
    FFMPEG,
    ['-y', '-i', input, '-vf', 'scale=1920:-2', '-c:v', 'libwebp', '-quality', '88', output],
    { stdio: 'pipe' }
  );
  slides.push({ src: `/local-images/home-flow/${file.dest}`, alt: file.label });
  console.log(`[webp] ${file.dest}`);
}

fs.writeFileSync(
  path.join(OUT, 'manifest.json'),
  JSON.stringify({ builtAt: new Date().toISOString(), slides }, null, 2),
  'utf8'
);

console.log('Done.');
