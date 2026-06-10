import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scraper } from 'google-maps-review-scraper';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'server', 'data', 'google-reviews-bundled.json');

const GOOGLE_LOCAL_POI_LUDOCID = process.env.GOOGLE_LOCAL_POI_LUDOCID || '1920926731407487161';
const GOOGLE_LOCATION_GROUP_ID = process.env.GOOGLE_LOCATION_GROUP_ID || '5393707080';
const PAGES = Number(process.env.GOOGLE_MAPS_SCRAPE_PAGES || 5);

function buildScrapeUrl(ludocid) {
  const ludHex = BigInt(String(ludocid).replace(/\D/g, '') || '0').toString(16);
  return (
    'https://www.google.com/maps/place/Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi/' +
    '@41.2694071,36.297792,17z/data=!4m6!3m5!1s0x0:0x' +
    ludHex +
    '!8m2!3d41.2694071!4d36.297792!16s%2Fg%2F11xw6t44j_?hl=tr'
  );
}

function buildMapsReviewsUrl(groupId) {
  return (
    'https://www.google.com/search?q=Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi+Yorumlar' +
    `&rflfq=1&num=20&rldimm=${groupId}&tbm=lcl&hl=tr#lkt=LocalPoiReviews`
  );
}

function mapReview(review, index) {
  const rating = Number(review.review?.rating) || 0;
  const text = String(review.review?.text || '').trim() || 'Yorum metni paylaşılmadı.';
  const publishedMs = Number(review.time?.published) / 1000;
  return {
    id: String(review.review_id || `bundled-review-${index}`),
    authorName: review.author?.name || 'Google kullanıcısı',
    authorPhotoUrl: review.author?.profile_url || '',
    rating,
    text,
    relativeTime: publishedMs
      ? new Date(publishedMs).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
      : '',
    profileUrl: review.author?.url || '',
    publishedMs: Number.isFinite(publishedMs) ? publishedMs : 0,
  };
}

function dedupe(reviews) {
  const seen = new Set();
  const out = [];
  for (const review of reviews) {
    const key = `${review.authorName.toLowerCase()}::${review.rating}::${review.text.slice(0, 80)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(review);
  }
  return out;
}

const scrapeUrl = buildScrapeUrl(GOOGLE_LOCAL_POI_LUDOCID);
console.log('[google-reviews] scraping:', scrapeUrl);
const raw = await scraper(scrapeUrl, { sort_type: 'newest', pages: PAGES, clean: true });
if (!Array.isArray(raw) || raw.length === 0) {
  console.error('[google-reviews] scrape returned no reviews');
  process.exit(1);
}

const reviews = dedupe(
  raw
    .map((item, index) => mapReview(item, index))
    .sort((a, b) => (b.publishedMs || 0) - (a.publishedMs || 0))
);

const ratings = reviews.map((r) => r.rating).filter((v) => v > 0);
const payload = {
  builtAt: new Date().toISOString(),
  locationGroupId: GOOGLE_LOCATION_GROUP_ID,
  ludocid: GOOGLE_LOCAL_POI_LUDOCID,
  mapsUrl: buildMapsReviewsUrl(GOOGLE_LOCATION_GROUP_ID),
  rating: ratings.length ? ratings.reduce((s, v) => s + v, 0) / ratings.length : undefined,
  reviewCount: reviews.length,
  reviews: reviews.map(({ publishedMs: _p, ...rest }) => rest),
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2), 'utf8');
console.log(`[google-reviews] bundled ${reviews.length} reviews -> ${OUT}`);
