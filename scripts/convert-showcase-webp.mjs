import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOWCASE = path.join(__dirname, '..', 'public', 'local-images', 'showcase');
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';
const QUALITY = 92;

function convertPng(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  execFileSync(
    FFMPEG,
    ['-y', '-i', pngPath, '-c:v', 'libwebp', '-lossless', '0', '-quality', String(QUALITY), '-preset', 'picture', webpPath],
    { stdio: 'pipe' }
  );
  const before = fs.statSync(pngPath).size;
  const after = fs.statSync(webpPath).size;
  console.log(`[webp] ${path.basename(webpPath)} ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`);
  return webpPath;
}

const pngFiles = fs.readdirSync(SHOWCASE).filter((f) => f.endsWith('.png'));
for (const file of pngFiles) {
  convertPng(path.join(SHOWCASE, file));
}

console.log(`Converted ${pngFiles.length} PNG files (quality ${QUALITY})`);
