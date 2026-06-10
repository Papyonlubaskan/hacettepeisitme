import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SHOWCASE = path.join(ROOT, 'public', 'local-images', 'showcase');
const FRAMES = path.join(SHOWCASE, 'frames');
const VIDEOS_OUT = path.join(SHOWCASE, 'videos');
const ASSETS = path.join(
  process.env.USERPROFILE || '',
  '.cursor',
  'projects',
  'c-Users-Teknogenetik-Downloads-Hacettepe-itme',
  'assets'
);

const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const FONT = 'C\\\\:/Windows/Fonts/segoeui.ttf';

const VIDEO_JOBS = [
  {
    id: 'vista',
    input: path.join(SHOWCASE, 'vista-showcase.webp'),
    line1: 'Hacettepe İşitme',
    line2: 'Vista Serisi · Samsun',
  },
  {
    id: 'am',
    input: path.join(SHOWCASE, 'am-showcase.webp'),
    line1: 'Hacettepe İşitme',
    line2: 'A&M Serisi · Şarjlı Teknoloji',
  },
  {
    id: 'nitro',
    input: path.join(SHOWCASE, 'nitro-showcase.webp'),
    line1: 'Hacettepe İşitme',
    line2: 'Nitro Serisi · Akıllı Dinleme',
  },
  {
    id: 'pediatrik',
    input: path.join(ROOT, 'public', 'local-images', 'pediatrik-isitme-cocuk.webp'),
    line1: 'Hacettepe İşitme',
    line2: 'Pediatrik Grup · Samsun',
  },
  {
    id: 'fit-ric',
    input: path.join(FRAMES, 'video-frame-fit-ric.png'),
    line1: 'Hacettepe İşitme',
    line2: 'Kulak İçi Hoparlörlü Takım',
  },
  {
    id: 'fit-bte',
    input: path.join(FRAMES, 'video-frame-fit-bte.png'),
    line1: 'Hacettepe İşitme',
    line2: 'Kulak Arkası Kullanım',
  },
  {
    id: 'fit-ite',
    input: path.join(FRAMES, 'video-frame-fit-ite.png'),
    line1: 'Hacettepe İşitme',
    line2: 'Kanal İçi Görünüm',
  },
  {
    id: 'fit-charge',
    input: path.join(FRAMES, 'video-frame-fit-charge.png'),
    line1: 'Hacettepe İşitme',
    line2: 'Şarjlı Cihaz Bakımı',
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFrameAssets() {
  const frameFiles = [
    'video-frame-fit-ric.png',
    'video-frame-fit-bte.png',
    'video-frame-fit-ite.png',
    'video-frame-fit-charge.png',
  ];
  for (const file of frameFiles) {
    const src = path.join(ASSETS, file);
    const dest = path.join(FRAMES, file);
    if (!fs.existsSync(src)) {
      throw new Error(`Frame asset missing: ${src}`);
    }
    fs.copyFileSync(src, dest);
  }
}

function escapeDrawtext(text) {
  return text.replace(/\\/g, '\\\\').replace(/:/g, '\\:').replace(/'/g, "\\'");
}

function buildVideo(job) {
  if (!fs.existsSync(job.input)) {
    throw new Error(`Input missing for ${job.id}: ${job.input}`);
  }

  const out = path.join(VIDEOS_OUT, `${job.id}.mp4`);
  const poster = path.join(VIDEOS_OUT, `${job.id}-poster.jpg`);
  const line1 = escapeDrawtext(job.line1);
  const line2 = escapeDrawtext(job.line2);

  const vf = [
    'scale=1080:1920:force_original_aspect_ratio=decrease',
    'pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x071525',
    'fps=30',
    'format=yuv420p',
    `drawtext=fontfile=${FONT}:text='${line1}':fontsize=52:fontcolor=white:x=(w-text_w)/2:y=h-220:shadowcolor=0x1a2e44@0.65:shadowx=2:shadowy=2`,
    `drawtext=fontfile=${FONT}:text='${line2}':fontsize=34:fontcolor=0x00E5CC:x=(w-text_w)/2:y=h-150:shadowcolor=0x1a2e44@0.65:shadowx=2:shadowy=2`,
  ].join(',');

  execFileSync(
    FFMPEG,
    ['-y', '-loop', '1', '-i', job.input, '-vf', vf, '-t', '6', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-movflags', '+faststart', out],
    { stdio: 'inherit' }
  );

  execFileSync(
    FFMPEG,
    ['-y', '-i', out, '-frames:v', '1', '-update', '1', '-q:v', '2', poster],
    { stdio: 'inherit' }
  );

  const sizeKb = Math.round(fs.statSync(out).size / 1024);
  console.log(`[video] ${job.id}.mp4 (${sizeKb} KB)`);
}

ensureDir(FRAMES);
ensureDir(VIDEOS_OUT);
copyFrameAssets();

for (const job of VIDEO_JOBS) {
  buildVideo(job);
}

console.log(`Done: ${VIDEO_JOBS.length} showcase videos -> ${VIDEOS_OUT}`);
