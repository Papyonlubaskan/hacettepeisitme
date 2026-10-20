import { readFileSync } from 'node:fs';
import { chromium, devices } from 'playwright';

// Kullanım: node scripts/check-hydration.mjs [baseUrl] [all | /yol1 /yol2 ...]
const base = process.argv[2] || 'http://127.0.0.1:8099';
const args = process.argv.slice(3);
const paths =
  args[0] === 'all'
    ? Object.keys(JSON.parse(readFileSync('out/seo-manifest.json', 'utf8')))
    : args.length
      ? args
      : ['/', '/samsun-isitme-cihazlari', '/blog/isitme-kaybinin-erken-belirtileri', '/isitme-cihazlari', '/katalog/vista', '/randevu', '/iletisim'];

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['Pixel 7'] });
let failures = 0;
for (const path of paths) {
  const page = await context.newPage();
  const problems = [];
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error' || /hydrat/i.test(text)) {
      if (/api\/instagram\/media|403|Failed to load resource/.test(text)) return;
      problems.push(`${msg.type()}: ${text.slice(0, 220)}`);
    }
  });
  page.on('pageerror', (err) => problems.push(`pageerror: ${err.message.slice(0, 220)}`));
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const h1 = await page.locator('h1').first().textContent().catch(() => null);
  const ssr = await page.evaluate(() => document.getElementById('root')?.dataset.ssr ?? '');
  console.log(`${problems.length ? 'HATA' : 'ok  '} ${path} | ssr=${ssr} | h1=${h1?.trim().slice(0, 50)}`);
  for (const p of problems) console.log('     ', p);
  failures += problems.length;
  await page.close();
}
await browser.close();
process.exitCode = failures ? 1 : 0;
