// Her sayfa için N kez mobil Lighthouse çalıştırıp kategori medyanlarını yazar
// Kullanım: node scripts/lh-median.mjs [N] /yol1 /yol2 ...
import { execFileSync } from 'node:child_process';
import { readFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.SITE_URL || 'https://hacettepeisitme.com.tr';
const args = process.argv.slice(2);
const runs = /^\d+$/.test(args[0] ?? '') ? Number(args.shift()) : 3;
const paths = args.length ? args : ['/'];
const dir = mkdtempSync(join(tmpdir(), 'lh-'));
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

for (const path of paths) {
  const results = [];
  for (let i = 0; i < runs; i++) {
    const out = join(dir, `r${i}.json`);
    execFileSync(
      'npx',
      ['--yes', 'lighthouse@12', base + path, '--quiet', '--chrome-flags=--headless=new',
        '--only-categories=performance,accessibility,best-practices,seo', '--output=json', `--output-path=${out}`],
      { stdio: 'ignore', shell: true },
    );
    results.push(JSON.parse(readFileSync(out, 'utf8')));
  }
  const cats = Object.keys(results[0].categories);
  const summary = cats.map((c) => `${c}: ${median(results.map((r) => Math.round(r.categories[c].score * 100)))}`);
  const perf = results.map((r) => Math.round(r.categories.performance.score * 100)).join('/');
  const lcp = median(results.map((r) => r.audits['largest-contentful-paint'].numericValue)) / 1000;
  console.log(`${path} → ${summary.join(' | ')} (perf çalıştırmalar: ${perf}, LCP medyan ${lcp.toFixed(1)} s)`);
}
