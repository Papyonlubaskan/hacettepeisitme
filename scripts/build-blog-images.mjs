import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PAGES = path.join(ROOT, 'public', 'local-images', 'pages');
const SHOWCASE = path.join(ROOT, 'public', 'local-images', 'showcase');
const OUT = path.join(ROOT, 'public', 'local-images', 'blog');
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

const POSTS = [
  { id: 1, card: 'blog-1-card.webp', og: 'blog-1-og.webp', src: path.join(PAGES, 'hero-online-test.webp') },
  { id: 2, card: 'blog-2-card.webp', og: 'blog-2-og.webp', src: path.join(PAGES, 'hero-catalog.webp') },
  { id: 3, card: 'blog-3-card.webp', og: 'blog-3-og.webp', src: path.join(PAGES, 'about-secondary.webp') },
  { id: 4, card: 'blog-4-card.webp', og: 'blog-4-og.webp', src: path.join(SHOWCASE, 'hearing-aids-hero.webp') },
  { id: 5, card: 'blog-5-card.webp', og: 'blog-5-og.webp', src: path.join(PAGES, 'hero-about.webp') },
  { id: 6, card: 'blog-6-card.webp', og: 'blog-6-og.webp', src: path.join(PAGES, 'hero-samsun-test.webp') },
];

function exportSize(src, dest, w, h) {
  execFileSync(
    FFMPEG,
    [
      '-y',
      '-i',
      src,
      '-vf',
      `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}`,
      '-c:v',
      'libwebp',
      '-quality',
      '90',
      dest,
    ],
    { stdio: 'pipe' },
  );
}

fs.mkdirSync(OUT, { recursive: true });

for (const post of POSTS) {
  if (!fs.existsSync(post.src)) {
    console.warn('[skip] missing source for blog', post.id, post.src);
    continue;
  }
  exportSize(post.src, path.join(OUT, post.card), 800, 450);
  exportSize(post.src, path.join(OUT, post.og), 1200, 630);
  console.log(`[blog] ${post.card}, ${post.og}`);
}

console.log('Done.');
