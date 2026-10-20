// Google PageSpeed Insights (mobil) — Google sunucularından ölçüm
// Kullanım: node scripts/psi.mjs / /blog/... ; isteğe bağlı PSI_API_KEY ortam değişkeni
const base = process.env.SITE_URL || 'https://hacettepeisitme.com.tr';
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const key = process.env.PSI_API_KEY ? `&key=${process.env.PSI_API_KEY}` : '';
const cats = ['performance', 'accessibility', 'best-practices', 'seo'].map((c) => `&category=${c}`).join('');

for (const path of paths) {
  const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    base + path,
  )}&strategy=mobile${cats}${key}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    console.log(path, 'HATA', json.error?.message?.slice(0, 160));
    continue;
  }
  const lr = json.lighthouseResult;
  const scores = Object.entries(lr.categories)
    .map(([k, c]) => `${k}: ${Math.round(c.score * 100)}`)
    .join(' | ');
  const a = lr.audits;
  console.log(
    `${path} → ${scores} | FCP ${a['first-contentful-paint'].displayValue} LCP ${a['largest-contentful-paint'].displayValue} TBT ${a['total-blocking-time'].displayValue} CLS ${a['cumulative-layout-shift'].displayValue}`,
  );
}
