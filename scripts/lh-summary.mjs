import { readFileSync } from 'node:fs';

for (const file of process.argv.slice(2)) {
  const r = JSON.parse(readFileSync(file, 'utf8'));
  console.log(`== ${r.finalDisplayedUrl}`);
  console.log(
    Object.entries(r.categories)
      .map(([k, c]) => `${k}: ${Math.round(c.score * 100)}`)
      .join(' | '),
  );
  const fails = Object.values(r.audits)
    .filter(
      (a) =>
        a.score !== null &&
        a.score < 0.9 &&
        !['informative', 'notApplicable', 'manual'].includes(a.scoreDisplayMode),
    )
    .map((a) => `  ${String(Math.round(a.score * 100)).padStart(3)} ${a.id} ${a.displayValue ?? ''}`);
  console.log(fails.join('\n'));
}
