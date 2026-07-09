import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundledPath = path.join(root, 'server/data/google-reviews-bundled.json');
const outPath = path.join(root, 'src/lib/googleReviewsSeo.ts');

const data = JSON.parse(fs.readFileSync(bundledPath, 'utf8'));
const ratingRaw = Number(data.rating);
const rating = Number.isFinite(ratingRaw) ? Math.round(ratingRaw * 10) / 10 : 4.9;
const reviewCount = Number(data.reviewCount) || (Array.isArray(data.reviews) ? data.reviews.length : 37);

const content = `/**
 * Google yorum özeti — server/data/google-reviews-bundled.json ile senkron.
 * Güncelleme: npm run google-reviews:refresh
 */
export const SITE_GOOGLE_RATING = ${rating};
export const SITE_GOOGLE_REVIEW_COUNT = ${reviewCount};
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log(`[google-reviews] SEO sync: ${rating} / ${reviewCount} yorum -> ${outPath}`);
