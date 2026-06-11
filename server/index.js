import 'dotenv/config';
import express from 'express';
import { ensureGa4Script, injectSeoIntoHtml, resolveSeoEntry } from './seo-inject.js';
import nodemailer from 'nodemailer';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { scraper as scrapeGoogleMapsReviews } from 'google-maps-review-scraper';
import {
  RETENTION_DAYS,
  erasePersonalDataByContact,
  runDataRetentionJob,
} from './dataRetention.mjs';

const app = express();
const PORT = Number(process.env.PORT || process.env.API_PORT || 8787);
/** Railway ve Docker için dışarıdan erişilebilir dinleme */
const HOST = process.env.HOST || '0.0.0.0';
const MAIL_TO = process.env.MAIL_TO || 'hacettepeisitme55@gmail.com';
const NEWSLETTER_API_KEY = process.env.NEWSLETTER_API_KEY || '';
const PRIVACY_API_KEY = process.env.PRIVACY_API_KEY || NEWSLETTER_API_KEY || '';
const DATA_RETENTION_INTERVAL_MS = Number(process.env.DATA_RETENTION_INTERVAL_MS || 24 * 60 * 60 * 1000);
const PRIMARY_SITE_HOST = (process.env.PRIMARY_SITE_HOST || 'hacettepeisitme.com.tr').replace(/^https?:\/\//, '').replace(/\/$/, '');
const CORS_ORIGIN =
  process.env.CORS_ORIGIN ||
  `https://${PRIMARY_SITE_HOST},https://www.${PRIMARY_SITE_HOST},https://hacettepeisitme-web-production.up.railway.app,http://localhost:3000`;
const FORM_ALERT_THRESHOLD = Number(process.env.FORM_ALERT_THRESHOLD || 30);
const FORM_ALERT_WINDOW_MS = Number(process.env.FORM_ALERT_WINDOW_MS || 10 * 60 * 1000);
const FORM_ALERT_COOLDOWN_MS = Number(process.env.FORM_ALERT_COOLDOWN_MS || 60 * 60 * 1000);
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '';
const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME || 'hacettepeisitmecihazlari55';
const INSTAGRAM_WEB_APP_ID = process.env.INSTAGRAM_WEB_APP_ID || '936619743392459';
const INSTAGRAM_SESSION_ID = process.env.INSTAGRAM_SESSION_ID || '';
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID || '46111897442';
const INSTAGRAM_POST_PERMALINKS = (process.env.INSTAGRAM_POST_PERMALINKS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
const GRAPH_API_VERSION = process.env.GRAPH_API_VERSION || 'v21.0';
const INSTAGRAM_FEED_CACHE_MS = Number(process.env.INSTAGRAM_FEED_CACHE_MS || 90 * 1000);
const INSTAGRAM_FEED_LIMIT = Math.min(Math.max(Number(process.env.INSTAGRAM_FEED_LIMIT || 12), 3), 24);
const INSTAGRAM_BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const HAS_INSTAGRAM_CREDENTIALS = Boolean(INSTAGRAM_ACCESS_TOKEN || INSTAGRAM_SESSION_ID);
/** Production'da token yokken canlı Instagram API çağrısı yapma (429 önleme). */
const INSTAGRAM_LIVE_REFRESH = process.env.INSTAGRAM_LIVE_REFRESH !== 'false';
const SITE_PHONE_WA = process.env.WHATSAPP_NOTIFY_PHONE || '905334745806';
const WHATSAPP_NOTIFY_API_KEY = process.env.WHATSAPP_NOTIFY_API_KEY || '';
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY || '';
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || '';
const GOOGLE_PLACES_TEXT_QUERY =
  process.env.GOOGLE_PLACES_TEXT_QUERY ||
  'Eğitim Araştırma Karşısı Şok Market Üstü Tepecik 1537. Sokak 1B İlkadım Samsun';
const SITE_MAP_LAT = 41.2693501;
const SITE_MAP_LNG = 36.2966171;
/** Google işletme konum grubu — tüm şubelerin yorumları için rldimm parametresi */
const GOOGLE_LOCATION_GROUP_ID = process.env.GOOGLE_LOCATION_GROUP_ID || '5393707080';
/** Maps scraper için ludocid (gruplu yorumların çekildiği kimlik) */
const GOOGLE_LOCAL_POI_LUDOCID = process.env.GOOGLE_LOCAL_POI_LUDOCID || '1920926731407487161';
const GOOGLE_BUSINESS_STORE_CODE = process.env.GOOGLE_BUSINESS_STORE_CODE || '09459172262012022668';
const GOOGLE_MAPS_SCRAPE_PAGES = Math.min(Math.max(Number(process.env.GOOGLE_MAPS_SCRAPE_PAGES || 5), 1), 8);

function buildGoogleMapsScrapeUrl(ludocid) {
  const ludHex = BigInt(String(ludocid).replace(/\D/g, '') || '0').toString(16);
  return (
    'https://www.google.com/maps/place/Hacettepe+%C4%B0%C5%9Fitme+Cihazlar%C4%B1/' +
    `@${SITE_MAP_LAT},${SITE_MAP_LNG},17z/data=!4m6!3m5!1s0x0:0x` +
    ludHex +
    `!8m2!3d${SITE_MAP_LAT}!4d${SITE_MAP_LNG}!16s%2Fg%2F11xw6t44j_?hl=tr`
  );
}

function buildGoogleMapsReviewsUrl(groupId = GOOGLE_LOCATION_GROUP_ID) {
  return (
    'https://www.google.com/search?q=Samsun+Hacettepe+%C4%B0%C5%9Fitme+Merkezi+Yorumlar' +
    `&rflfq=1&num=20&rldimm=${groupId}&tbm=lcl&hl=tr#lkt=LocalPoiReviews`
  );
}

const DEFAULT_GOOGLE_MAPS_REVIEWS_URL = buildGoogleMapsReviewsUrl(GOOGLE_LOCATION_GROUP_ID);
const GOOGLE_MAPS_SCRAPE_URL =
  process.env.GOOGLE_MAPS_SCRAPE_URL || buildGoogleMapsScrapeUrl(GOOGLE_LOCAL_POI_LUDOCID);
const GOOGLE_MAPS_REVIEWS_URL = process.env.GOOGLE_MAPS_REVIEWS_URL || DEFAULT_GOOGLE_MAPS_REVIEWS_URL;
const GOOGLE_REVIEWS_CACHE_MS = Number(process.env.GOOGLE_REVIEWS_CACHE_MS || 15 * 60 * 1000);
const GOOGLE_REVIEWS_FEED_LIMIT = Math.min(
  Math.max(Number(process.env.GOOGLE_REVIEWS_FEED_LIMIT || 20), 3),
  30
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const GOOGLE_REVIEWS_BUNDLED_FILE = path.join(DATA_DIR, 'google-reviews-bundled.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'newsletter-subscribers.json');
const FORM_REQUESTS_LOG_FILE = path.join(DATA_DIR, 'form-requests.log');
const FORM_SUBMISSIONS_LOG_FILE = path.join(DATA_DIR, 'form-submissions.jsonl');
const FORM_NOTIFY_TIMEOUT_MS = Number(process.env.FORM_NOTIFY_TIMEOUT_MS || 8000);
const INSTAGRAM_CACHE_FILE = path.join(DATA_DIR, 'instagram-feed-cache.json');
const INSTAGRAM_BUNDLED_FILE = path.join(__dirname, 'data', 'instagram-feed-bundled.json');
const INSTAGRAM_SEED_FILE = path.join(__dirname, 'data', 'instagram-permalink-seed.json');
const FRONTEND_DIST_DIR = path.resolve(__dirname, '..', 'out');
const GOOGLE_SITE_VERIFICATION_FILE = 'google399566b06c8c412a.html';
const GOOGLE_SITE_VERIFICATION_BODY = `google-site-verification: ${GOOGLE_SITE_VERIFICATION_FILE}`;
const SITE_PUBLIC_URL = `https://${PRIMARY_SITE_HOST}`;
let spaIndexHtml = '';
let seoManifest = null;
const ipHitMap = new Map();
const ipAlertCooldownMap = new Map();
const allowedOrigins = CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);

app.set('trust proxy', 1);
app.get(`/${GOOGLE_SITE_VERIFICATION_FILE}`, (_req, res) => {
  res.type('text/html').set('Cache-Control', 'no-store').send(GOOGLE_SITE_VERIFICATION_BODY);
});
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') return next();
  if (req.path.startsWith('/api/')) return next();
  if (req.path === `/${GOOGLE_SITE_VERIFICATION_FILE}`) return next();
  const host = (req.hostname || '').toLowerCase();
  const primary = PRIMARY_SITE_HOST.toLowerCase();
  if (host === `www.${primary}`) {
    return res.redirect(301, `https://${primary}${req.originalUrl}`);
  }
  if (host.includes('railway.app') && process.env.REDIRECT_RAILWAY_HOST !== 'false') {
    return res.redirect(301, `https://${primary}${req.originalUrl}`);
  }
  return next();
});
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://connect.facebook.net',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com', 'data:'],
        imgSrc: [
          "'self'",
          'data:',
          'blob:',
          'https://lh3.googleusercontent.com',
          'https://*.googleusercontent.com',
          'https://www.facebook.com',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
        ],
        connectSrc: [
          "'self'",
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'https://graph.facebook.com',
          'https://connect.facebook.net',
        ],
        frameSrc: ["'self'", 'https://www.google.com', 'https://www.facebook.com'],
        mediaSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'TOO_MANY_REQUESTS' },
});

const instagramFeedLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'TOO_MANY_REQUESTS' },
});

const googleReviewsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'TOO_MANY_REQUESTS' },
});

/** @type {{ expiresAt: number, payload: object } | null} */
let instagramFeedCache = null;
/** @type {object | null} */
let instagramFeedStalePayload = null;
/** @type {number} */
let instagramRateLimitedUntil = 0;
/** @type {{ expiresAt: number, payload: object } | null} */
let googleReviewsCache = null;

const INSTAGRAM_RATE_LIMIT_BACKOFF_MS = Number(
  process.env.INSTAGRAM_RATE_LIMIT_BACKOFF_MS || 15 * 60 * 1000
);

function isInstagramRateLimited() {
  return Date.now() < instagramRateLimitedUntil;
}

function markInstagramRateLimited() {
  instagramRateLimitedUntil = Date.now() + INSTAGRAM_RATE_LIMIT_BACKOFF_MS;
}

let instagramRefreshInFlight = false;

function shouldAttemptLiveInstagram() {
  if (!INSTAGRAM_LIVE_REFRESH) return false;
  if (!HAS_INSTAGRAM_CREDENTIALS) return false;
  if (isInstagramRateLimited()) return false;
  return true;
}

function proxifyInstagramMediaUrl(mediaUrl) {
  if (!mediaUrl) return mediaUrl;
  if (mediaUrl.startsWith('/local-images/') || mediaUrl.startsWith('/api/instagram/')) return mediaUrl;
  if (!isAllowedInstagramMediaUrl(mediaUrl)) return mediaUrl;
  return `/api/instagram/media?src=${encodeURIComponent(mediaUrl)}`;
}

function applyProxyToInstagramPayload(payload) {
  if (!payload?.posts?.length) return payload;
  return {
    ...payload,
    posts: payload.posts.map((post) => ({
      ...post,
      imageUrl: proxifyInstagramMediaUrl(post.imageUrl) || post.imageUrl,
      videoUrl: post.videoUrl ? proxifyInstagramMediaUrl(post.videoUrl) : null,
    })),
  };
}

function buildInstagramFeedPayload(posts, extra = {}) {
  return applyProxyToInstagramPayload({
    ok: true,
    source: 'instagram',
    postCount: posts.length,
    profileUrl: INSTAGRAM_PROFILE_URL,
    posts,
    ...extra,
  });
}

function rememberInstagramFeedPayload(payload) {
  if (payload?.ok && Array.isArray(payload.posts) && payload.posts.length > 0) {
    instagramFeedStalePayload = applyProxyToInstagramPayload(payload);
    if (instagramFeedCache) {
      instagramFeedCache.payload = instagramFeedStalePayload;
    }
  }
}

function getInstagramPermalinkList() {
  let fromSeed = [];
  try {
    const seed = JSON.parse(fsSync.readFileSync(INSTAGRAM_SEED_FILE, 'utf8'));
    fromSeed = Array.isArray(seed.permalinks) ? seed.permalinks : [];
  } catch {
    /* seed dosyası yoksa env listesi kullanılır */
  }
  return [...new Set([...INSTAGRAM_POST_PERMALINKS, ...fromSeed])].slice(0, INSTAGRAM_FEED_LIMIT);
}

async function loadPersistedInstagramFeed() {
  try {
    const raw = await fs.readFile(INSTAGRAM_CACHE_FILE, 'utf8');
    const saved = JSON.parse(raw);
    const payload = applyProxyToInstagramPayload(saved?.payload);
    if (payload?.posts?.length) {
      rememberInstagramFeedPayload(payload);
      instagramFeedCache = {
        expiresAt: Date.now() + INSTAGRAM_FEED_CACHE_MS,
        payload,
      };
      console.log('[instagram] persisted cache loaded:', payload.postCount, 'posts');
    }
  } catch {
    /* ilk çalıştırma */
  }
}

async function loadBundledInstagramFeed() {
  try {
    const raw = await fs.readFile(INSTAGRAM_BUNDLED_FILE, 'utf8');
    const payload = applyProxyToInstagramPayload(JSON.parse(raw));
    if (payload?.posts?.length) {
      rememberInstagramFeedPayload(payload);
      if (!instagramFeedCache) {
        instagramFeedCache = {
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
          payload: { ...payload, bundled: true },
        };
      }
      console.log('[instagram] bundled feed loaded:', payload.postCount, 'posts');
    }
  } catch (error) {
    console.warn('[instagram] bundled feed missing:', error.message);
  }
}

async function persistInstagramFeedCache(payload) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(
      INSTAGRAM_CACHE_FILE,
      JSON.stringify({ savedAt: new Date().toISOString(), payload }, null, 0)
    );
  } catch (error) {
    console.warn('[instagram] cache persist failed:', error.message);
  }
}

async function refreshInstagramFeedCache() {
  if (!shouldAttemptLiveInstagram()) return;
  if (instagramRefreshInFlight || isInstagramRateLimited()) return;
  instagramRefreshInFlight = true;
  try {
    const live = await fetchInstagramFeed();
    if (!live?.posts?.length) return;
    const payload = buildInstagramFeedPayload(live.posts);
    const now = Date.now();
    instagramFeedCache = { expiresAt: now + INSTAGRAM_FEED_CACHE_MS, payload };
    rememberInstagramFeedPayload(payload);
    await persistInstagramFeedCache(payload);
    console.log('[instagram] feed refreshed:', live.postCount, 'posts');
  } catch (error) {
    console.warn('[instagram] background refresh failed:', error.message);
  } finally {
    instagramRefreshInFlight = false;
  }
}

function captionToTitle(caption) {
  if (!caption) return 'Instagram paylaşımı';
  const line = String(caption).split('\n')[0].trim();
  return line.slice(0, 120) || 'Instagram paylaşımı';
}

function isAllowedInstagramMediaUrl(mediaUrl) {
  try {
    const parsed = new URL(mediaUrl);
    if (parsed.protocol !== 'https:') return false;
    return (
      parsed.hostname.endsWith('cdninstagram.com') ||
      parsed.hostname.endsWith('fbcdn.net') ||
      parsed.hostname.endsWith('instagram.com')
    );
  } catch {
    return false;
  }
}

function mapInstagramFeedPost({ id, imageUrl, videoUrl, permalink, title, mediaType, timestamp }) {
  if (!imageUrl || !permalink) return null;
  return {
    id: String(id),
    imageUrl: proxifyInstagramMediaUrl(imageUrl),
    videoUrl: videoUrl ? proxifyInstagramMediaUrl(videoUrl) : null,
    permalink,
    title: captionToTitle(title),
    mediaType: mediaType || 'IMAGE',
    timestamp: timestamp || null,
  };
}

function mapInstagramGraphItem(item) {
  const permalink = item.permalink || '';
  const caption = item.caption || '';
  const firstChild =
    item.media_type === 'CAROUSEL_ALBUM' && Array.isArray(item.children?.data)
      ? item.children.data[0]
      : null;
  const imgSource = firstChild || item;
  let imageUrl = '';
  if (imgSource.media_type === 'VIDEO') {
    imageUrl = imgSource.thumbnail_url || imgSource.media_url || '';
  } else {
    imageUrl = imgSource.media_url || imgSource.thumbnail_url || '';
  }
  const isVideo = item.media_type === 'VIDEO' || imgSource.media_type === 'VIDEO';
  const remoteVideo = isVideo ? item.media_url || imgSource.media_url || '' : '';
  return mapInstagramFeedPost({
    id: item.id,
    imageUrl,
    videoUrl: remoteVideo || null,
    permalink,
    title: caption,
    mediaType: item.media_type || 'IMAGE',
    timestamp: item.timestamp || null,
  });
}

function instagramPermalinkForCode(code, productType, mediaType) {
  if (!code) return '';
  if (productType === 'clips' || mediaType === 2) {
    return `https://www.instagram.com/reel/${code}/`;
  }
  return `https://www.instagram.com/p/${code}/`;
}

function mapInstagramUserFeedItem(item) {
  const code = item?.code || '';
  if (!code) return null;
  const candidates = item.image_versions2?.candidates;
  const imageUrl =
    (Array.isArray(candidates) && candidates[0]?.url) ||
    item.display_uri ||
    item.image_versions2?.additional_candidates?.first_frame?.url ||
    '';
  const mediaTypeNum = Number(item.media_type);
  const mediaType =
    mediaTypeNum === 2 ? 'VIDEO' : mediaTypeNum === 8 ? 'CAROUSEL_ALBUM' : 'IMAGE';
  const timestamp = item.taken_at
    ? new Date(Number(item.taken_at) * 1000).toISOString()
    : null;
  const remoteVideo =
    mediaTypeNum === 2 && Array.isArray(item.video_versions) ? item.video_versions[0]?.url : '';
  return mapInstagramFeedPost({
    id: item.pk || item.id || code,
    imageUrl,
    videoUrl: remoteVideo || null,
    permalink: instagramPermalinkForCode(code, item.product_type, mediaTypeNum),
    title: item.caption?.text || '',
    mediaType,
    timestamp,
  });
}

function mapGoogleReview(review, index) {
  const text = review.text?.text || review.originalText?.text || '';
  const rating = Number(review.rating) || 0;
  if (!text.trim() && rating <= 0) return null;
  return {
    id: String(review.name || review.publishTime || `google-review-${index}`),
    authorName: review.authorAttribution?.displayName || 'Google kullanıcısı',
    authorPhotoUrl: review.authorAttribution?.photoUri || '',
    rating,
    text: text.trim(),
    relativeTime: review.relativePublishTimeDescription || '',
    profileUrl: review.authorAttribution?.uri || '',
  };
}

function mapLegacyGoogleReview(review, index) {
  const text = String(review.text || '').trim();
  const rating = Number(review.rating) || 0;
  if (!text && rating <= 0) return null;
  return {
    id: String(review.time || `legacy-review-${index}`),
    authorName: review.author_name || 'Google kullanıcısı',
    authorPhotoUrl: review.profile_photo_url || '',
    rating,
    text,
    relativeTime: review.relative_time_description || '',
    profileUrl: review.author_url || '',
  };
}

function formatGoogleReviewRelativeTime(publishedMicros) {
  const ms = Number(publishedMicros) / 1000;
  if (!Number.isFinite(ms) || ms <= 0) return '';
  const diffMs = Date.now() - ms;
  const rtf = new Intl.RelativeTimeFormat('tr', { numeric: 'auto' });
  const minutes = Math.round(diffMs / 60000);
  if (Math.abs(minutes) < 60) return rtf.format(-minutes, 'minute');
  const hours = Math.round(diffMs / 3600000);
  if (Math.abs(hours) < 24) return rtf.format(-hours, 'hour');
  const days = Math.round(diffMs / 86400000);
  if (Math.abs(days) < 30) return rtf.format(-days, 'day');
  const months = Math.round(days / 30);
  if (Math.abs(months) < 12) return rtf.format(-months, 'month');
  const years = Math.round(months / 12);
  return rtf.format(-years, 'year');
}

function mapScrapedGoogleReview(review, index, { requireText = true } = {}) {
  const rating = Number(review.review?.rating) || 0;
  const text = String(review.review?.text || '').trim();
  const publishedMs = Number(review.time?.published) / 1000;
  if (requireText && !text) return null;
  if (!text && rating <= 0) return null;
  return {
    id: String(review.review_id || `scraped-review-${index}`),
    authorName: review.author?.name || 'Google kullanıcısı',
    authorPhotoUrl: review.author?.profile_url || '',
    rating,
    text: text || 'Yorum metni paylaşılmadı.',
    relativeTime: formatGoogleReviewRelativeTime(review.time?.published),
    profileUrl: review.author?.url || '',
    publishedMs: Number.isFinite(publishedMs) ? publishedMs : 0,
  };
}

function getGoogleReviewDedupeKey(review) {
  const text = String(review.text || '')
    .replace(/^Yorum metni paylaşılmadı\.$/i, '')
    .trim()
    .slice(0, 140)
    .toLowerCase();
  return `${String(review.authorName || '').toLowerCase()}::${review.rating}::${text}::${String(
    review.relativeTime || ''
  ).toLowerCase()}`;
}

function mergeGoogleReviews(reviewLists) {
  const merged = new Map();
  for (const list of reviewLists) {
    for (const review of list) {
      const key = getGoogleReviewDedupeKey(review);
      if (!merged.has(key)) merged.set(key, review);
    }
  }
  return [...merged.values()].sort((left, right) => (right.publishedMs || 0) - (left.publishedMs || 0));
}

function stripPublishedMs(review) {
  const { publishedMs: _publishedMs, ...publicReview } = review;
  return publicReview;
}

function resolveGoogleReviewScrapeUrls() {
  const configured = (process.env.GOOGLE_MAPS_SCRAPE_URLS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  if (configured.length) return configured;
  return [GOOGLE_MAPS_SCRAPE_URL];
}

function loadBundledGoogleReviews() {
  try {
    const raw = fsSync.readFileSync(GOOGLE_REVIEWS_BUNDLED_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data.reviews) || data.reviews.length === 0) return null;
    return {
      rating: typeof data.rating === 'number' ? data.rating : undefined,
      reviewCount: typeof data.reviewCount === 'number' ? data.reviewCount : data.reviews.length,
      mapsUrl: data.mapsUrl || GOOGLE_MAPS_REVIEWS_URL,
      reviews: data.reviews,
      bundled: true,
    };
  } catch (error) {
    console.warn('[google-reviews] bundled feed missing:', error.message);
    return null;
  }
}

function summarizeGoogleReviews(reviews, mapsUrl, ratingOverride, reviewCountOverride) {
  const feedable = reviews
    .filter((review) => String(review.text || '').trim())
    .sort((left, right) => {
      const leftScore = /^Yorum metni paylaşılmadı\.$/i.test(left.text || '') ? 0 : 1;
      const rightScore = /^Yorum metni paylaşılmadı\.$/i.test(right.text || '') ? 0 : 1;
      return rightScore - leftScore || (right.publishedMs || 0) - (left.publishedMs || 0);
    });
  const limited = feedable.slice(0, GOOGLE_REVIEWS_FEED_LIMIT).map(stripPublishedMs);
  if (!limited.length) return null;
  const ratings = reviews.map((review) => review.rating).filter((value) => value > 0);
  return {
    rating:
      typeof ratingOverride === 'number'
        ? ratingOverride
        : ratings.length
          ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length
          : undefined,
    reviewCount:
      typeof reviewCountOverride === 'number' ? reviewCountOverride : reviews.length,
    mapsUrl: mapsUrl || GOOGLE_MAPS_REVIEWS_URL,
    reviews: limited,
  };
}

async function resolveGooglePlaceId() {
  if (GOOGLE_PLACE_ID) return GOOGLE_PLACE_ID;
  if (!GOOGLE_PLACES_API_KEY) return null;

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'places.id',
    },
    body: JSON.stringify({
      textQuery: GOOGLE_PLACES_TEXT_QUERY,
      languageCode: 'tr',
      regionCode: 'TR',
      maxResultCount: 1,
    }),
  });
  const rawText = await res.text();
  if (!res.ok) {
    console.warn('[google-reviews] place search HTTP error:', res.status);
    return null;
  }
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    console.error('[google-reviews] place search invalid JSON');
    return null;
  }
  const placeId = data.places?.[0]?.id;
  return placeId ? String(placeId) : null;
}

async function fetchGoogleReviewsFromPlacesNew(placeId) {
  const resourceId = encodeURIComponent(String(placeId).replace(/^places\//, ''));
  const url = `https://places.googleapis.com/v1/places/${resourceId}?languageCode=tr`;
  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': 'reviews,rating,userRatingCount,googleMapsUri',
    },
  });
  const rawText = await res.text();
  if (!res.ok) {
    console.error('[google-reviews] Places API HTTP error:', res.status, rawText.slice(0, 500));
    return null;
  }
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    console.error('[google-reviews] Places API invalid JSON');
    return null;
  }
  const reviews = (Array.isArray(data.reviews) ? data.reviews : [])
    .map((review, index) => mapGoogleReview(review, index))
    .filter(Boolean);
  if (!reviews.length) return null;
  return {
    rating: typeof data.rating === 'number' ? data.rating : undefined,
    reviewCount: typeof data.userRatingCount === 'number' ? data.userRatingCount : reviews.length,
    mapsUrl: data.googleMapsUri || GOOGLE_MAPS_REVIEWS_URL,
    reviews,
  };
}

async function fetchGoogleReviewsFromPlacesLegacy(placeId) {
  const params = new URLSearchParams({
    place_id: String(placeId).replace(/^places\//, ''),
    fields: 'reviews,rating,user_ratings_total,url',
    language: 'tr',
    key: GOOGLE_PLACES_API_KEY,
  });
  const res = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`);
  const rawText = await res.text();
  if (!res.ok) {
    console.error('[google-reviews] legacy details HTTP error:', res.status, rawText.slice(0, 500));
    return null;
  }
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    console.error('[google-reviews] legacy details invalid JSON');
    return null;
  }
  if (data.status !== 'OK' || !data.result) {
    console.error('[google-reviews] legacy details status:', data.status);
    return null;
  }
  const reviews = (Array.isArray(data.result.reviews) ? data.result.reviews : [])
    .map((review, index) => mapLegacyGoogleReview(review, index))
    .filter(Boolean);
  if (!reviews.length) return null;
  return {
    rating: typeof data.result.rating === 'number' ? data.result.rating : undefined,
    reviewCount:
      typeof data.result.user_ratings_total === 'number'
        ? data.result.user_ratings_total
        : reviews.length,
    mapsUrl: data.result.url || GOOGLE_MAPS_REVIEWS_URL,
    reviews,
  };
}

async function scrapeGoogleReviewsFromMapsUrl(url) {
  if (!url.includes('google.com/maps')) return [];
  try {
    const raw = await scrapeGoogleMapsReviews(url, {
      sort_type: 'newest',
      pages: GOOGLE_MAPS_SCRAPE_PAGES,
      clean: true,
    });
    if (!Array.isArray(raw) || raw.length === 0) return [];
    return raw
      .map((review, index) => mapScrapedGoogleReview(review, index, { requireText: false }))
      .filter(Boolean);
  } catch (error) {
    console.warn('[google-reviews] scraper skipped:', error.message);
    return [];
  }
}

async function fetchGoogleReviewsFromScraper() {
  const urls = resolveGoogleReviewScrapeUrls();
  const batches = await Promise.all(urls.map((url) => scrapeGoogleReviewsFromMapsUrl(url)));
  const merged = mergeGoogleReviews(batches);
  if (!merged.length) return null;
  const ratings = merged.map((review) => review.rating).filter((value) => value > 0);
  const rating = ratings.length
    ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length
    : undefined;
  return {
    rating,
    reviewCount: merged.length,
    mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
    reviews: merged,
  };
}

async function fetchGoogleReviewsFromPlaces() {
  if (!GOOGLE_PLACES_API_KEY) return null;
  const placeId = await resolveGooglePlaceId();
  if (!placeId) return null;

  const fromNewApi = await fetchGoogleReviewsFromPlacesNew(placeId);
  if (fromNewApi) return fromNewApi;
  return fetchGoogleReviewsFromPlacesLegacy(placeId);
}

async function fetchGoogleReviews() {
  const [fromPlaces, fromScraper, fromBundled] = await Promise.all([
    fetchGoogleReviewsFromPlaces(),
    fetchGoogleReviewsFromScraper(),
    Promise.resolve(loadBundledGoogleReviews()),
  ]);

  const scraperCount = fromScraper?.reviews?.length || 0;
  const placesCount = fromPlaces?.reviews?.length || 0;
  const bundledCount = fromBundled?.reviews?.length || 0;

  const primary =
    scraperCount >= placesCount && scraperCount >= bundledCount
      ? fromScraper
      : bundledCount >= placesCount
        ? fromBundled
        : fromPlaces;

  const merged = mergeGoogleReviews([
    primary?.reviews || [],
    fromScraper?.reviews || [],
    fromBundled?.reviews || [],
    fromPlaces?.reviews || [],
  ]);
  if (!merged.length) return null;

  const ratings = merged.map((review) => review.rating).filter((value) => value > 0);
  const rating = ratings.length
    ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length
    : primary?.rating ?? fromScraper?.rating ?? fromBundled?.rating ?? fromPlaces?.rating;
  const reviewCount = Math.max(
    fromScraper?.reviewCount || 0,
    fromBundled?.reviewCount || 0,
    fromPlaces?.reviewCount || 0,
    merged.length
  );
  return summarizeGoogleReviews(
    merged,
    GOOGLE_MAPS_REVIEWS_URL,
    rating,
    reviewCount
  );
}

async function resolveInstagramBusinessAccountId() {
  if (INSTAGRAM_BUSINESS_ACCOUNT_ID) return INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!INSTAGRAM_ACCESS_TOKEN) return '';
  const url =
    `https://graph.facebook.com/${GRAPH_API_VERSION}/me/accounts` +
    `?fields=instagram_business_account{id}&access_token=${encodeURIComponent(INSTAGRAM_ACCESS_TOKEN)}`;
  const res = await fetch(url);
  if (!res.ok) return '';
  const data = await res.json();
  const pages = Array.isArray(data.data) ? data.data : [];
  for (const page of pages) {
    const id = page?.instagram_business_account?.id;
    if (id) return String(id);
  }
  return '';
}

async function fetchInstagramMediaFromGraph() {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    return null;
  }
  const businessAccountId = await resolveInstagramBusinessAccountId();
  if (!businessAccountId) {
    return null;
  }
  const fields = [
    'id',
    'caption',
    'media_type',
    'media_url',
    'thumbnail_url',
    'permalink',
    'timestamp',
    'children{media_url,media_type,thumbnail_url}',
  ].join(',');
  const url =
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(businessAccountId)}` +
    `/media?fields=${encodeURIComponent(fields)}&limit=${INSTAGRAM_FEED_LIMIT}&access_token=${encodeURIComponent(INSTAGRAM_ACCESS_TOKEN)}`;

  const res = await fetch(url);
  const rawText = await res.text();
  if (!res.ok) {
    console.error('[instagram] Graph API HTTP error:', res.status, rawText.slice(0, 500));
    return null;
  }
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    console.error('[instagram] Graph API invalid JSON');
    return null;
  }
  const items = Array.isArray(data.data) ? data.data : [];
  const posts = items.map(mapInstagramGraphItem).filter(Boolean);
  return posts.length ? posts : null;
}

function buildInstagramCookieHeader(setCookieHeader, sessionId) {
  const parts = [];
  if (sessionId) parts.push(`sessionid=${sessionId}`);
  const csrf = setCookieHeader?.match(/csrftoken=([^;]+)/)?.[1];
  if (csrf) parts.push(`csrftoken=${csrf}`);
  return parts.join('; ');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchInstagramMediaFromUserFeedOnce() {
  const cookieHeader = buildInstagramCookieHeader('', INSTAGRAM_SESSION_ID);
  const pageRes = await fetch(INSTAGRAM_PROFILE_URL, {
    headers: {
      'User-Agent': INSTAGRAM_BROWSER_USER_AGENT,
      'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    redirect: 'follow',
  });
  if (!pageRes.ok) {
    if (pageRes.status === 429) {
      markInstagramRateLimited();
    } else {
      console.warn('[instagram] user feed bootstrap HTTP error:', pageRes.status);
    }
    return { posts: null, rateLimited: pageRes.status === 429 };
  }
  const html = await pageRes.text();
  const lsd = html.match(/"LSD",\[\],\{"token":"([^"]+)"/)?.[1];
  const requestCookie = buildInstagramCookieHeader(pageRes.headers.get('set-cookie') || '', INSTAGRAM_SESSION_ID);
  const csrf = requestCookie.match(/csrftoken=([^;]+)/)?.[1];
  const feedUrl =
    `https://www.instagram.com/api/v1/feed/user/${encodeURIComponent(INSTAGRAM_USERNAME)}` +
    `/username/?count=${INSTAGRAM_FEED_LIMIT}`;
  const feedRes = await fetch(feedUrl, {
    headers: {
      'User-Agent': INSTAGRAM_BROWSER_USER_AGENT,
      'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
      'X-IG-App-ID': INSTAGRAM_WEB_APP_ID,
      'X-Requested-With': 'XMLHttpRequest',
      ...(lsd ? { 'X-FB-LSD': lsd, 'X-ASBD-ID': '129477' } : {}),
      ...(requestCookie ? { Cookie: requestCookie } : {}),
      ...(csrf ? { 'X-CSRFToken': csrf } : {}),
      Referer: INSTAGRAM_PROFILE_URL,
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
    },
  });
  const rawText = await feedRes.text();
  if (feedRes.status === 429) {
    return { posts: null, rateLimited: true };
  }
  if (!feedRes.ok) {
    console.warn('[instagram] user feed API HTTP error:', feedRes.status);
    return { posts: null, rateLimited: false };
  }
  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    console.error('[instagram] user feed API invalid JSON');
    return { posts: null, rateLimited: false };
  }
  const items = Array.isArray(data.items) ? data.items : [];
  const posts = items.map(mapInstagramUserFeedItem).filter(Boolean).slice(0, INSTAGRAM_FEED_LIMIT);
  return { posts: posts.length ? posts : null, rateLimited: false };
}

async function fetchInstagramMediaFromUserFeed() {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const { posts, rateLimited } = await fetchInstagramMediaFromUserFeedOnce();
    if (posts?.length) return posts;
    if (rateLimited) {
      markInstagramRateLimited();
      return null;
    }
    if (attempt < 3) await sleep(2000 * attempt);
  }
  return null;
}

async function fetchInstagramMediaFromOembed() {
  const permalinks = getInstagramPermalinkList();
  if (permalinks.length === 0) return null;

  const posts = [];
  for (let index = 0; index < permalinks.length; index += 1) {
    const permalink = permalinks[index];
    const oembedUrl = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(permalink)}`;
    const res = await fetch(oembedUrl, {
      headers: {
        'User-Agent': INSTAGRAM_BROWSER_USER_AGENT,
        Accept: 'application/json',
      },
    });
    if (res.status === 429) {
      markInstagramRateLimited();
      break;
    }
    if (!res.ok) continue;
    let data;
    try {
      data = await res.json();
    } catch {
      continue;
    }
    if (!data?.thumbnail_url) continue;
    const mapped = mapInstagramFeedPost({
      id: data.media_id || `oembed-${index}`,
      imageUrl: data.thumbnail_url,
      permalink: permalink.replace(/\/?$/, '/'),
      title: data.title || '',
      mediaType: permalink.includes('/reel/') ? 'VIDEO' : 'IMAGE',
      timestamp: null,
    });
    if (mapped) posts.push(mapped);
    if (index < permalinks.length - 1) await sleep(400);
  }
  return posts.length ? posts : null;
}

async function fetchInstagramFeed() {
  if (!shouldAttemptLiveInstagram()) {
    return null;
  }
  if (isInstagramRateLimited()) {
    return null;
  }

  if (INSTAGRAM_ACCESS_TOKEN) {
    const fromGraph = await fetchInstagramMediaFromGraph();
    if (fromGraph?.length) {
      return { posts: fromGraph, source: 'instagram', postCount: fromGraph.length };
    }
  }

  const fromUserFeed = await fetchInstagramMediaFromUserFeed();
  if (fromUserFeed?.length) {
    return { posts: fromUserFeed, source: 'instagram', postCount: fromUserFeed.length };
  }
  if (isInstagramRateLimited()) {
    return null;
  }

  const fromOembed = await fetchInstagramMediaFromOembed();
  if (fromOembed?.length) {
    return { posts: fromOembed, source: 'instagram', postCount: fromOembed.length };
  }

  return null;
}

const smtpPort = Number(process.env.SMTP_PORT || 465);
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || 'gmail',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  connectionTimeout: Math.min(FORM_NOTIFY_TIMEOUT_MS, 6000),
  greetingTimeout: Math.min(FORM_NOTIFY_TIMEOUT_MS, 6000),
  socketTimeout: Math.min(FORM_NOTIFY_TIMEOUT_MS, 6000) + 2000,
});

function clean(value, max = 5000) {
  if (value === undefined || value === null) return null;
  return String(value).trim().slice(0, max);
}

function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const nonEmptyString = z
  .string()
  .trim()
  .max(5000)
  .optional()
  .or(z.literal(''))
  .transform((value) => (value ? value : undefined));

const baseFormSchema = z.object({
  name: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(180).optional(),
  phone: z.string().trim().min(10).max(40),
  subject: nonEmptyString,
  message: nonEmptyString,
  service: nonEmptyString,
  date: nonEmptyString,
  time: nonEmptyString,
  age: nonEmptyString,
  website: z.string().optional(),
});

const contactSchema = baseFormSchema.extend({
  email: z.string().trim().email().max(180),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(5).max(5000),
});

const appointmentSchema = baseFormSchema.extend({
  name: z.string().trim().min(2).max(150),
  phone: z.string().trim().min(10).max(40),
  date: z.string().trim().min(4).max(20),
  time: z.string().trim().min(3).max(20),
  service: z.string().trim().min(2).max(120),
  message: nonEmptyString,
});

const landingSchema = baseFormSchema.extend({
  name: z.string().trim().min(2).max(150),
  phone: z.string().trim().min(10).max(40),
  email: z.string().trim().email().max(180).optional(),
  age: nonEmptyString,
});

const newsletterSchema = z.object({
  email: z.string().trim().email().max(180),
  website: z.string().optional(),
});

const formSchemas = {
  contact: contactSchema,
  appointment: appointmentSchema,
  landing: landingSchema,
  newsletter: newsletterSchema,
};

function parseBody(formType, body) {
  const schema = formSchemas[formType];
  const parsed = schema.safeParse(body ?? {});
  if (!parsed.success) return { ok: false };
  if (parsed.data.website && String(parsed.data.website).trim() !== '') {
    return { ok: false, bot: true };
  }
  return { ok: true, data: parsed.data };
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || 'unknown';
}

async function logFormRequest(entry) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(FORM_REQUESTS_LOG_FILE, `${JSON.stringify(entry)}\n`, 'utf-8');
}

async function sendIpAlertMail(ip, hitCount) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER || MAIL_TO,
    to: MAIL_TO,
    subject: `[Form Alarm] Yüksek IP Trafiği: ${ip}`,
    text: `IP: ${ip}\nSon ${Math.round(FORM_ALERT_WINDOW_MS / 60000)} dakikadaki istek: ${hitCount}\nEşik: ${FORM_ALERT_THRESHOLD}`,
  });
}

function trackAndAlertIp(ip) {
  const now = Date.now();
  const existingHits = ipHitMap.get(ip) || [];
  const recentHits = existingHits.filter((timestamp) => now - timestamp <= FORM_ALERT_WINDOW_MS);
  recentHits.push(now);
  ipHitMap.set(ip, recentHits);

  const lastAlertAt = ipAlertCooldownMap.get(ip) || 0;
  if (recentHits.length >= FORM_ALERT_THRESHOLD && now - lastAlertAt > FORM_ALERT_COOLDOWN_MS) {
    ipAlertCooldownMap.set(ip, now);
    void sendIpAlertMail(ip, recentHits.length).catch((error) => {
      console.error('[form-ip-alert] mail error:', error);
    });
  }
}

function formRequestAudit(req, res, next) {
  const startedAt = Date.now();
  const ip = getClientIp(req);
  trackAndAlertIp(ip);
  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    const entry = {
      timestamp: new Date().toISOString(),
      ip,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs,
      userAgent: req.headers['user-agent'] || '-',
      referer: req.headers.referer || '-',
    };
    void logFormRequest(entry).catch((error) => {
      console.error('[form-audit-log] write error:', error);
    });
  });
  next();
}

async function ensureSubscribersStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(SUBSCRIBERS_FILE);
  } catch {
    await fs.writeFile(SUBSCRIBERS_FILE, '[]', 'utf-8');
  }
}

async function readSubscribers() {
  await ensureSubscribersStore();
  const raw = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeSubscribers(subscribers) {
  await ensureSubscribersStore();
  await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');
}

async function addNewsletterSubscriber(email) {
  const normalized = String(email).trim().toLowerCase();
  const subscribers = await readSubscribers();
  const existing = subscribers.find((s) => s.email === normalized);
  if (existing) {
    existing.updatedAt = new Date().toISOString();
  } else {
    subscribers.push({
      email: normalized,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      active: true,
    });
  }
  await writeSubscribers(subscribers);
}

function buildFormNotificationText(formType, body) {
  const name = clean(body.name, 150) || '-';
  const email = clean(body.email, 180) || '-';
  const phone = clean(body.phone, 40) || '-';
  const subject = clean(body.subject, 120) || '-';
  const message = clean(body.message, 5000) || '-';
  const service = clean(body.service, 120) || '-';
  const date = clean(body.date, 20) || '-';
  const time = clean(body.time, 20) || '-';
  const age = clean(body.age, 10) || '-';

  return [
    `*Hacettepe İşitme — ${formType.toUpperCase()}*`,
    `Ad Soyad: ${name}`,
    `Telefon: ${phone}`,
    `E-posta: ${email}`,
    `Konu: ${subject}`,
    `Hizmet: ${service}`,
    `Randevu: ${date} ${time}`.trim(),
    `Yaş: ${age}`,
    `Mesaj: ${message}`,
  ].join('\n');
}

function isInvalidSmtpPass(pass) {
  const lower = pass.toLowerCase();
  return (
    pass.length < 12 ||
    lower.includes('uygulama') ||
    lower.includes('gmail uygulama') ||
    lower.includes('16 hane') ||
    lower.includes('placeholder') ||
    lower.includes('şifre') ||
    lower.includes('sifre')
  );
}

function getSmtpStatus() {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  if (!user || !pass) {
    return { configured: false, reason: 'missing_credentials' };
  }
  if (isInvalidSmtpPass(pass)) {
    return { configured: false, reason: 'invalid_placeholder' };
  }
  return { configured: true };
}

function hasSmtpConfigured() {
  return getSmtpStatus().configured;
}

function hasResendConfigured() {
  return !!(process.env.RESEND_API_KEY || '').trim();
}

function hasFormMailConfigured() {
  return hasResendConfigured() || hasSmtpConfigured();
}

function getFormMailStatus() {
  if (hasResendConfigured()) {
    return { configured: true, channel: 'resend' };
  }
  const smtp = getSmtpStatus();
  if (smtp.configured) {
    return { configured: true, channel: 'gmail_smtp' };
  }
  return { configured: false, channel: 'none', reason: smtp.reason };
}

function withNotifyTimeout(promise, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label}_TIMEOUT`)), FORM_NOTIFY_TIMEOUT_MS);
    }),
  ]);
}

async function persistFormSubmission(formType, body) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const entry = {
    timestamp: new Date().toISOString(),
    formType,
    data: body,
  };
  await fs.appendFile(FORM_SUBMISSIONS_LOG_FILE, `${JSON.stringify(entry)}\n`, 'utf-8');
}

async function sendFormWhatsApp(formType, body) {
  if (!WHATSAPP_NOTIFY_API_KEY) return;

  const text = buildFormNotificationText(formType, body).slice(0, 1200);
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(SITE_PHONE_WA)}` +
    `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(WHATSAPP_NOTIFY_API_KEY)}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(FORM_NOTIFY_TIMEOUT_MS) });
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 200);
    throw new Error(`WhatsApp notify HTTP ${res.status}: ${detail}`);
  }
}

async function sendResendMail({ to, subject, text, replyTo }) {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const recipients = Array.isArray(to) ? to : [to];
  const payload = {
    from: process.env.RESEND_FROM || 'Hacettepe İşitme <onboarding@resend.dev>',
    to: recipients,
    subject,
    text,
  };
  if (replyTo && isValidEmail(replyTo)) {
    payload.reply_to = replyTo;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(FORM_NOTIFY_TIMEOUT_MS),
  });

  if (!res.ok) {
    const detail = (await res.text()).slice(0, 400);
    throw new Error(`Resend HTTP ${res.status}: ${detail}`);
  }
}

async function sendOutboundMail({ to, subject, text, replyTo }) {
  if (hasResendConfigured()) {
    await sendResendMail({ to, subject, text, replyTo });
    return;
  }

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.SMTP_USER || MAIL_TO,
    to,
    subject,
    text,
  };
  if (replyTo && isValidEmail(replyTo)) {
    mailOptions.replyTo = replyTo;
  }
  await transporter.sendMail(mailOptions);
}

async function sendFormMailResend(formType, body) {
  const name = clean(body.name, 150) || '-';
  const customerEmail = clean(body.email, 180);
  const mailSubject = `[Hacettepe Form] ${formType.toUpperCase()} - ${name}`;
  const text = [
    buildFormNotificationText(formType, body),
    '',
    '---',
    'Bu mail web sitesi formundan geldi.',
  ].join('\n');

  await sendResendMail({
    to: MAIL_TO,
    subject: mailSubject,
    text,
    replyTo: customerEmail,
  });
}

async function deliverFormNotification(formType, body) {
  if (!hasFormMailConfigured()) {
    const err = new Error('SMTP_NOT_CONFIGURED');
    err.code = 'SMTP_NOT_CONFIGURED';
    throw err;
  }

  if (hasResendConfigured()) {
    try {
      await withNotifyTimeout(sendFormMailResend(formType, body), 'RESEND');
    } catch (error) {
      console.error(`[${formType}] Resend gönderimi başarısız:`, error);
      const err = new Error('SMTP_FAILED');
      err.code = 'SMTP_FAILED';
      throw err;
    }
  } else {
    try {
      await withNotifyTimeout(sendFormMail(formType, body), 'SMTP');
    } catch (error) {
      console.error(`[${formType}] Gmail SMTP başarısız (Railway Hobby SMTP engelliyor olabilir):`, error);
      const err = new Error('SMTP_FAILED');
      err.code = 'SMTP_FAILED';
      throw err;
    }
  }

  if (WHATSAPP_NOTIFY_API_KEY) {
    void withNotifyTimeout(sendFormWhatsApp(formType, body), 'WHATSAPP').catch((error) => {
      console.warn(`[${formType}] WhatsApp bildirimi atlandı:`, error?.message || error);
    });
  }
}

async function sendFormMail(formType, body) {
  const name = clean(body.name, 150) || '-';
  const email = clean(body.email, 180) || '-';

  const mailSubject = `[Hacettepe Form] ${formType.toUpperCase()} - ${name}`;
  const lines = [
    buildFormNotificationText(formType, body),
    '',
    '---',
    'Bu mail web sitesi formundan geldi. Müşteriye Gmail\'de Yanıtla ile dönebilirsiniz.',
  ];

  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.SMTP_USER || MAIL_TO,
    to: MAIL_TO,
    subject: mailSubject,
    text: lines.join('\n'),
  };
  if (isValidEmail(email)) {
    mailOptions.replyTo = email;
  }

  await transporter.sendMail(mailOptions);
}

async function sendNewsletterWelcomeMail(email) {
  await sendOutboundMail({
    to: email,
    subject: 'Hacettepe İşitme - Abonelik Onayı',
    text:
      'Aboneliğiniz alınmıştır. Instagram üzerinden paylaştığımız duyuru, kampanya ve tanıtım içerikleri e-posta adresinize iletilecektir.',
    replyTo: MAIL_TO,
  });
}

function formRoute(formType) {
  return async (req, res) => {
    try {
      const parsed = parseBody(formType, req.body);
      if (!parsed.ok) {
        res.status(parsed.bot ? 200 : 400).json({
          ok: !!parsed.bot,
          error: parsed.bot ? undefined : 'INVALID_FORM_PAYLOAD',
        });
        return;
      }

      await persistFormSubmission(formType, parsed.data);

      if (formType === 'newsletter') {
        const email = clean(parsed.data?.email, 180);
        if (!isValidEmail(email)) {
          res.status(400).json({ ok: false, error: 'INVALID_EMAIL' });
          return;
        }
        await addNewsletterSubscriber(email);
        res.status(200).json({ ok: true });
        void withNotifyTimeout(sendNewsletterWelcomeMail(email), 'NEWSLETTER_MAIL').catch((error) => {
          console.error('[newsletter] welcome mail error:', error);
        });
        return;
      }

      await deliverFormNotification(formType, parsed.data);
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error(`[${formType}] form error:`, error);
      const code = error?.code || 'FORM_SUBMIT_FAILED';
      const status = code === 'SMTP_NOT_CONFIGURED' ? 503 : 500;
      res.status(status).json({ ok: false, error: code });
    }
  };
}

function getDataRetentionPaths() {
  return {
    formSubmissions: FORM_SUBMISSIONS_LOG_FILE,
    formAudit: FORM_REQUESTS_LOG_FILE,
    newsletter: SUBSCRIBERS_FILE,
  };
}

async function runScheduledDataRetention() {
  try {
    const report = await runDataRetentionJob(getDataRetentionPaths());
    if (report.totalRemoved > 0) {
      console.log(`[data-retention] ${report.totalRemoved} kayıt silindi`, report.results);
    }
  } catch (error) {
    console.error('[data-retention] purge error:', error);
  }
}

function requirePrivacyApiKey(req, res, next) {
  if (!PRIVACY_API_KEY) {
    res.status(500).json({ ok: false, error: 'PRIVACY_API_KEY_MISSING' });
    return;
  }
  const incoming = req.headers['x-api-key'];
  if (incoming !== PRIVACY_API_KEY) {
    res.status(401).json({ ok: false, error: 'UNAUTHORIZED' });
    return;
  }
  next();
}

function requireNewsletterApiKey(req, res, next) {
  if (!NEWSLETTER_API_KEY) {
    res.status(500).json({ ok: false, error: 'NEWSLETTER_API_KEY_MISSING' });
    return;
  }
  const incoming = req.headers['x-api-key'];
  if (incoming !== NEWSLETTER_API_KEY) {
    res.status(401).json({ ok: false, error: 'UNAUTHORIZED' });
    return;
  }
  next();
}

app.get('/api/health', (_req, res) => {
  const mail = getFormMailStatus();
  res.json({
    ok: true,
    service: 'local-form-api',
    instagramFeed: 'bundled-local-v5',
    instagramRateLimited: isInstagramRateLimited(),
    formMail: mail.configured ? mail.channel : mail.reason,
    dataRetentionDays: RETENTION_DAYS,
  });
});

app.post('/api/privacy/erase', requirePrivacyApiKey, async (req, res) => {
  try {
    const email = clean(req.body?.email, 180);
    const phone = clean(req.body?.phone, 40);
    if (!email && !phone) {
      res.status(400).json({ ok: false, error: 'EMAIL_OR_PHONE_REQUIRED' });
      return;
    }
    const result = await erasePersonalDataByContact(getDataRetentionPaths(), { email, phone });
    res.json({ ok: true, ...result });
  } catch (error) {
    console.error('[privacy-erase] error:', error);
    res.status(500).json({ ok: false, error: 'PRIVACY_ERASE_FAILED' });
  }
});

app.get('/api/google/reviews', googleReviewsLimiter, async (_req, res) => {
  try {
    const now = Date.now();
    if (googleReviewsCache && googleReviewsCache.expiresAt > now) {
      res.json(googleReviewsCache.payload);
      return;
    }

    const live = await fetchGoogleReviews();
    if (live && live.reviews.length > 0) {
      const payload = {
        ok: true,
        source: 'google',
        rating: live.rating,
        reviewCount: live.reviewCount,
        mapsUrl: live.mapsUrl || GOOGLE_MAPS_REVIEWS_URL,
        reviews: live.reviews,
      };
      googleReviewsCache = { expiresAt: now + GOOGLE_REVIEWS_CACHE_MS, payload };
      res.json(payload);
      return;
    }

    const unavailable = {
      ok: false,
      source: 'unavailable',
      mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
      reviews: [],
    };
    googleReviewsCache = {
      expiresAt: now + Math.min(GOOGLE_REVIEWS_CACHE_MS, 5 * 60 * 1000),
      payload: unavailable,
    };
    res.json(unavailable);
  } catch (error) {
    console.error('[google-reviews] route error:', error);
    res.json({
      ok: false,
      source: 'unavailable',
      mapsUrl: GOOGLE_MAPS_REVIEWS_URL,
      reviews: [],
    });
  }
});

app.get('/api/instagram/media', instagramFeedLimiter, async (req, res) => {
  try {
    const src = clean(req.query?.src, 2000);
    if (!src || !isAllowedInstagramMediaUrl(src)) {
      res.status(400).json({ ok: false, error: 'INVALID_MEDIA_URL' });
      return;
    }
    const upstream = await fetch(src, {
      headers: {
        'User-Agent': INSTAGRAM_BROWSER_USER_AGENT,
        Referer: INSTAGRAM_PROFILE_URL,
        Accept: 'image/avif,image/webp,image/apng,image/*,video/*,*/*;q=0.8',
      },
      redirect: 'follow',
    });
    if (!upstream.ok) {
      res.status(upstream.status).end();
      return;
    }
    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.send(buffer);
  } catch (error) {
    console.error('[instagram] media proxy error:', error);
    res.status(502).json({ ok: false, error: 'MEDIA_PROXY_FAILED' });
  }
});

app.get('/api/instagram/feed', instagramFeedLimiter, async (req, res) => {
  try {
    const now = Date.now();
    const forceFresh = req.query?.fresh === '1';

    if (!forceFresh && instagramFeedCache && instagramFeedCache.expiresAt > now) {
      res.json(instagramFeedCache.payload);
      if (
        shouldAttemptLiveInstagram() &&
        instagramFeedCache.expiresAt - now < INSTAGRAM_FEED_CACHE_MS / 2
      ) {
        void refreshInstagramFeedCache();
      }
      return;
    }

    if (!shouldAttemptLiveInstagram() && instagramFeedCache?.payload) {
      res.json(instagramFeedCache.payload);
      return;
    }

    if (shouldAttemptLiveInstagram()) {
      const liveNow = await fetchInstagramFeed();
      if (liveNow?.posts?.length) {
        const payload = buildInstagramFeedPayload(liveNow.posts, { live: true });
        instagramFeedCache = { expiresAt: now + INSTAGRAM_FEED_CACHE_MS, payload };
        rememberInstagramFeedPayload(payload);
        await persistInstagramFeedCache(payload);
        res.json(payload);
        return;
      }
    }

    if (instagramFeedStalePayload) {
      const stalePayload = { ...instagramFeedStalePayload, stale: true };
      instagramFeedCache = { expiresAt: now + 60 * 1000, payload: stalePayload };
      res.json(stalePayload);
      void refreshInstagramFeedCache();
      return;
    }

    const live = await fetchInstagramFeed();
    if (live?.posts?.length) {
      const payload = buildInstagramFeedPayload(live.posts);
      instagramFeedCache = { expiresAt: now + INSTAGRAM_FEED_CACHE_MS, payload };
      rememberInstagramFeedPayload(payload);
      await persistInstagramFeedCache(payload);
      res.json(payload);
      return;
    }

    res.json({
      ok: false,
      source: 'unavailable',
      postCount: 0,
      profileUrl: INSTAGRAM_PROFILE_URL,
      posts: [],
    });
  } catch (error) {
    console.error('[instagram] feed route error:', error);
    if (instagramFeedStalePayload) {
      res.json({ ...instagramFeedStalePayload, stale: true });
      return;
    }
    res.json({
      ok: false,
      source: 'unavailable',
      postCount: 0,
      profileUrl: INSTAGRAM_PROFILE_URL,
      posts: [],
    });
  }
});

app.get('/api/newsletter/subscribers-count', requireNewsletterApiKey, async (_req, res) => {
  const subscribers = await readSubscribers();
  const activeCount = subscribers.filter((s) => s.active !== false).length;
  res.json({ ok: true, count: activeCount });
});

app.post('/api/newsletter/instagram-broadcast', requireNewsletterApiKey, async (req, res) => {
  try {
    const subject = clean(req.body?.subject, 160);
    const summary = clean(req.body?.summary, 1200);
    const posts = Array.isArray(req.body?.posts) ? req.body.posts : [];
    if (!subject || !summary || posts.length === 0) {
      res.status(400).json({ ok: false, error: 'INVALID_BROADCAST_PAYLOAD' });
      return;
    }

    const subscribers = await readSubscribers();
    const activeSubscribers = subscribers.filter((s) => s.active !== false && isValidEmail(s.email));
    if (activeSubscribers.length === 0) {
      res.status(400).json({ ok: false, error: 'NO_ACTIVE_SUBSCRIBERS' });
      return;
    }

    const postLines = posts
      .map((p, i) => `${i + 1}) ${clean(p.title, 120) || 'Instagram Paylaşımı'}\n${clean(p.url, 500) || '-'}`)
      .join('\n\n');

    const textBody =
      `${summary}\n\n` +
      `Instagram paylaşımları:\n\n${postLines}\n\n` +
      `Sorularınız için: https://wa.me/${SITE_PHONE_WA}`;

    let sent = 0;
    for (const subscriber of activeSubscribers) {
      await sendOutboundMail({
        to: subscriber.email,
        subject,
        text: textBody,
        replyTo: MAIL_TO,
      });
      sent += 1;
    }

    await sendOutboundMail({
      to: MAIL_TO,
      subject: `[Instagram Duyuru Gönderimi] ${subject}`,
      text: `Toplam gönderilen abone sayısı: ${sent}`,
    });

    res.json({ ok: true, sent });
  } catch (error) {
    console.error('[instagram-broadcast] error:', error);
    res.status(500).json({ ok: false, error: 'BROADCAST_FAILED' });
  }
});

app.post('/api/form/contact', formRequestAudit, formLimiter, formRoute('contact'));
app.post('/api/form/landing', formRequestAudit, formLimiter, formRoute('landing'));
app.post('/api/form/appointment', formRequestAudit, formLimiter, formRoute('appointment'));
app.post('/api/form/newsletter', formRequestAudit, formLimiter, formRoute('newsletter'));

if (fsSync.existsSync(FRONTEND_DIST_DIR)) {
  const indexPath = path.join(FRONTEND_DIST_DIR, 'index.html');
  const manifestPath = path.join(FRONTEND_DIST_DIR, 'seo-manifest.json');
  if (fsSync.existsSync(indexPath)) {
    spaIndexHtml = fsSync.readFileSync(indexPath, 'utf8');
  }
  if (fsSync.existsSync(manifestPath)) {
    seoManifest = JSON.parse(fsSync.readFileSync(manifestPath, 'utf8'));
  }

  app.use(express.static(FRONTEND_DIST_DIR));
  app.get(/^\/(?!api).*/, (req, res) => {
    const pathname = req.path === '' ? '/' : req.path;
    const entry = resolveSeoEntry(seoManifest, pathname);
    if (spaIndexHtml) {
      const html = entry
        ? injectSeoIntoHtml(spaIndexHtml, pathname, entry, SITE_PUBLIC_URL)
        : ensureGa4Script(spaIndexHtml);
      res.type('text/html').set('Cache-Control', 'public, max-age=300').send(html);
      return;
    }
    res.sendFile(indexPath);
  });
}

async function startServer() {
  await new Promise((resolve) => {
    app.listen(PORT, HOST, () => {
      const mail = getFormMailStatus();
      console.log(`Web app running on http://${HOST}:${PORT}`);
      if (mail.configured) {
        console.log(`[form-mail] ${mail.channel} aktif → ${MAIL_TO}`);
      } else {
        console.warn(`[form-mail] Mail kapalı (${mail.reason}) — RESEND_API_KEY veya Railway Pro+SMTP gerekli`);
      }
      resolve();
    });
  });
  void runScheduledDataRetention();
  setInterval(() => void runScheduledDataRetention(), DATA_RETENTION_INTERVAL_MS);

  void loadBundledInstagramFeed()
    .then(() => loadPersistedInstagramFeed())
    .then(() => {
      if (shouldAttemptLiveInstagram()) {
        void refreshInstagramFeedCache();
        setInterval(() => void refreshInstagramFeedCache(), INSTAGRAM_FEED_CACHE_MS);
      } else {
        console.log('[instagram] live refresh disabled; serving bundled/cached feed');
      }
    });
}

startServer().catch((error) => {
  console.error('Server start failed:', error);
  process.exit(1);
});
