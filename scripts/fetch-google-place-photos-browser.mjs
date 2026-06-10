import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'local-images', 'google-place');
const MANIFEST = path.join(OUT_DIR, 'manifest.json');
const MAPS_URL =
  'https://www.google.com/maps/place/Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi/@41.2694071,36.297792,17z/data=!4m6!3m5!1s0x4088777f8e8b8b8b:0x1a8f4e2c8d4b3a19!8m2!3d41.2694071!4d36.297792!16s%2Fg%2F11xw6t44j_?hl=tr&entry=ttu';

const collected = new Set();

function normalize(url) {
  if (!url || !url.includes('googleusercontent.com')) return null;
  if (url.includes('=s32-') || url.includes('=s40-') || url.includes('=s48-') || url.includes('=s64-')) return null;
  if (url.includes('/a/ACg8oc') || url.includes('/a-/ALV-Uj')) return null;
  const base = url.split('=')[0];
  return `${base}=w1920-h1280-k-no`;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('googleusercontent.com')) {
      const large = normalize(url);
      if (large) collected.add(large);
    }
  });

  await page.goto(MAPS_URL, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(8000);

  const expand = page.locator('button[aria-label*="genişlet"], button[aria-label*="Expand"]').first();
  if (await expand.count()) await expand.click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(3000);

  const photoBtn = page.locator(
    'button[aria-label*="Foto"], button[aria-label*="Görünt"], button[aria-label*="Photo"], button[aria-label*="fotoğraf"]'
  ).first();
  if (await photoBtn.count()) {
    await photoBtn.click({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(6000);
  }

  const html = await page.content();
  for (const match of html.matchAll(/https:\/\/lh3\.googleusercontent\.com\/p\/[A-Za-z0-9_-]+/g)) {
    const large = normalize(match[0]);
    if (large) collected.add(large);
  }
  for (const match of html.matchAll(/https:\/\/lh3\.googleusercontent\.com\/gps-cs-s\/[A-Za-z0-9_/-]+/g)) {
    const large = normalize(match[0]);
    if (large) collected.add(large);
  }

  const domUrls = await page.evaluate(() => {
    const urls = [];
    document.querySelectorAll('img, button, div').forEach((el) => {
      const src = el.src || '';
      if (src.includes('googleusercontent.com')) urls.push(src);
      const style = el.getAttribute('style') || '';
      const match = style.match(/url\(["']?(https:\/\/lh3\.googleusercontent\.com[^"')]+)/);
      if (match) urls.push(match[1]);
    });
    return urls;
  });

  for (const u of domUrls) {
    const large = normalize(u);
    if (large) collected.add(large);
  }

  const candidates = [...collected].slice(0, 14);
  console.log(`[browser] ${candidates.length} photo candidates`);

  const saved = [];
  for (let i = 0; i < candidates.length; i += 1) {
    const file = `place-${String(i + 1).padStart(2, '0')}.jpg`;
    try {
      const res = await fetch(candidates[i], {
        headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://www.google.com/' },
      });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 12000) continue;
      fs.writeFileSync(path.join(OUT_DIR, file), buf);
      saved.push({ file: `/local-images/google-place/${file}`, source: candidates[i] });
      console.log(`[saved] ${file}`);
    } catch {
      /* skip */
    }
  }

  await browser.close();

  if (!saved.length) {
    console.error('[browser] no photos saved');
    process.exit(1);
  }

  fs.writeFileSync(
    MANIFEST,
    JSON.stringify({ builtAt: new Date().toISOString(), photos: saved }, null, 2),
    'utf8'
  );
}

main();
