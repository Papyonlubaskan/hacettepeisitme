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
const FFPROBE = process.env.FFPROBE_PATH || 'ffprobe';
const FONT = 'C\\\\:/Windows/Fonts/segoeui.ttf';
const DURATION_SEC = 8;
const FPS = 30;
const FRAMES_COUNT = DURATION_SEC * FPS;

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

function probeSize(input) {
  const json = execFileSync(
    FFPROBE,
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', input],
    { encoding: 'utf8' }
  );
  const stream = JSON.parse(json).streams?.[0];
  if (!stream?.width || !stream?.height) {
    throw new Error(`Could not probe dimensions: ${input}`);
  }
  return { width: stream.width, height: stream.height };
}

function even(n) {
  return n % 2 === 0 ? n : n + 1;
}

function outputSize(width, height, maxEdge = 1080) {
  if (width >= height) {
    const outW = even(Math.min(width, maxEdge));
    const outH = even(Math.round((height / width) * outW));
    return { outW, outH };
  }
  const outH = even(Math.min(height, maxEdge));
  const outW = even(Math.round((width / height) * outH));
  return { outW, outH };
}

function buildVideo(job) {
  if (!fs.existsSync(job.input)) {
    throw new Error(`Input missing for ${job.id}: ${job.input}`);
  }

  const { width, height } = probeSize(job.input);
  const { outW, outH } = outputSize(width, height);
  const out = path.join(VIDEOS_OUT, `${job.id}.mp4`);
  const poster = path.join(VIDEOS_OUT, `${job.id}-poster.jpg`);
  const line1 = escapeDrawtext(job.line1);
  const line2 = escapeDrawtext(job.line2);

  const vf = [
    `scale=${outW}:${outH}:force_original_aspect_ratio=increase`,
    `crop=${outW}:${outH}`,
    `zoompan=z='min(zoom+0.0010,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${FRAMES_COUNT}:s=${outW}x${outH}:fps=${FPS}`,
    'format=yuv420p',
    `drawtext=fontfile=${FONT}:text='${line1}':fontsize=42:fontcolor=white@0.92:x=(w-text_w)/2:y=h-96:shadowcolor=0x071525@0.8:shadowx=2:shadowy=2`,
    `drawtext=fontfile=${FONT}:text='${line2}':fontsize=28:fontcolor=0x00E5CC@0.95:x=(w-text_w)/2:y=h-52:shadowcolor=0x071525@0.8:shadowx=2:shadowy=2`,
  ].join(',');

  execFileSync(
    FFMPEG,
    [
      '-y',
      '-loop',
      '1',
      '-i',
      job.input,
      '-vf',
      vf,
      '-t',
      String(DURATION_SEC),
      '-an',
      '-c:v',
      'libx264',
      '-preset',
      'medium',
      '-crf',
      '20',
      '-movflags',
      '+faststart',
      out,
    ],
    { stdio: 'inherit' }
  );

  execFileSync(FFMPEG, ['-y', '-i', out, '-frames:v', '1', '-update', '1', '-q:v', '2', poster], {
    stdio: 'inherit',
  });

  const sizeKb = Math.round(fs.statSync(out).size / 1024);
  console.log(`[video] ${job.id}.mp4 ${outW}x${outH} (${sizeKb} KB)`);
}

ensureDir(FRAMES);
ensureDir(VIDEOS_OUT);
copyFrameAssets();

for (const job of VIDEO_JOBS) {
  buildVideo(job);
}

console.log(`Done: ${VIDEO_JOBS.length} showcase videos -> ${VIDEOS_OUT}`);
