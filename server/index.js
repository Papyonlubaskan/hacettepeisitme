import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const app = express();
const PORT = Number(process.env.PORT || process.env.API_PORT || 8787);
/** Railway ve Docker için dışarıdan erişilebilir dinleme */
const HOST = process.env.HOST || '0.0.0.0';
const MAIL_TO = process.env.MAIL_TO || 'hacettepeisitme55@gmail.com';
const NEWSLETTER_API_KEY = process.env.NEWSLETTER_API_KEY || '';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://hacettepeisitme.com,https://www.hacettepeisitme.com';
const FORM_ALERT_THRESHOLD = Number(process.env.FORM_ALERT_THRESHOLD || 30);
const FORM_ALERT_WINDOW_MS = Number(process.env.FORM_ALERT_WINDOW_MS || 10 * 60 * 1000);
const FORM_ALERT_COOLDOWN_MS = Number(process.env.FORM_ALERT_COOLDOWN_MS || 60 * 60 * 1000);
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '';
const GRAPH_API_VERSION = process.env.GRAPH_API_VERSION || 'v21.0';
const INSTAGRAM_FEED_CACHE_MS = Number(process.env.INSTAGRAM_FEED_CACHE_MS || 15 * 60 * 1000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'newsletter-subscribers.json');
const FORM_REQUESTS_LOG_FILE = path.join(DATA_DIR, 'form-requests.log');
const FRONTEND_DIST_DIR = path.resolve(__dirname, '..', 'out');
const ipHitMap = new Map();
const ipAlertCooldownMap = new Map();
const allowedOrigins = CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);

app.set('trust proxy', 1);
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

/** @type {{ expiresAt: number, payload: object } | null} */
let instagramFeedCache = null;

function getFallbackInstagramPosts() {
  const profile = 'https://www.instagram.com/hacettepeisitmecihazlari55';
  return [
    {
      id: 'local-1',
      imageUrl: '/local-images/pro-instagram-1.webp',
      permalink: profile,
      title: 'İşitme testi bilgilendirmesi',
    },
    {
      id: 'local-2',
      imageUrl: '/local-images/pro-instagram-2.webp',
      permalink: profile,
      title: 'Yeni teknoloji cihazlar',
    },
    {
      id: 'local-3',
      imageUrl: '/local-images/pro-instagram-3.webp',
      permalink: profile,
      title: 'Bakım ve temizlik önerileri',
    },
    {
      id: 'local-4',
      imageUrl: '/local-images/pro-instagram-4.webp',
      permalink: profile,
      title: 'Cihaz karşılaştırmaları',
    },
    {
      id: 'local-5',
      imageUrl: '/local-images/pro-instagram-5.webp',
      permalink: profile,
      title: 'Hasta deneyimleri',
    },
    {
      id: 'local-6',
      imageUrl: '/local-images/pro-instagram-6.webp',
      permalink: profile,
      title: 'Merkezden güncel paylaşımlar',
    },
  ];
}

function captionToTitle(caption) {
  if (!caption) return 'Instagram paylaşımı';
  const line = String(caption).split('\n')[0].trim();
  return line.slice(0, 120) || 'Instagram paylaşımı';
}

async function fetchInstagramMediaFromGraph() {
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_BUSINESS_ACCOUNT_ID) {
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
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(INSTAGRAM_BUSINESS_ACCOUNT_ID)}` +
    `/media?fields=${encodeURIComponent(fields)}&limit=12&access_token=${encodeURIComponent(INSTAGRAM_ACCESS_TOKEN)}`;

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
  const posts = items
    .map((item) => {
      const permalink = item.permalink || '';
      const caption = captionToTitle(item.caption);
      let imageUrl = '';
      const firstChild =
        item.media_type === 'CAROUSEL_ALBUM' && Array.isArray(item.children?.data)
          ? item.children.data[0]
          : null;
      const imgSource = firstChild || item;
      if (imgSource.media_type === 'VIDEO') {
        imageUrl = imgSource.thumbnail_url || imgSource.media_url || '';
      } else {
        imageUrl = imgSource.media_url || imgSource.thumbnail_url || '';
      }
      if (!imageUrl || !permalink) return null;
      return {
        id: String(item.id),
        imageUrl,
        permalink,
        title: caption,
      };
    })
    .filter(Boolean);
  return posts.length ? posts : null;
}

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || 'gmail',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
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

async function sendFormMail(formType, body) {
  const name = clean(body.name, 150) || '-';
  const email = clean(body.email, 180) || '-';
  const phone = clean(body.phone, 40) || '-';
  const subject = clean(body.subject, 120) || '-';
  const message = clean(body.message, 5000) || '-';
  const service = clean(body.service, 120) || '-';
  const date = clean(body.date, 20) || '-';
  const time = clean(body.time, 20) || '-';
  const age = clean(body.age, 10) || '-';

  const mailSubject = `[Hacettepe Form] ${formType.toUpperCase()} - ${name}`;
  const lines = [
    `Form Tipi: ${formType}`,
    `Ad Soyad: ${name}`,
    `Telefon: ${phone}`,
    `E-posta: ${email}`,
    `Konu: ${subject}`,
    `Hizmet: ${service}`,
    `Randevu Tarihi: ${date}`,
    `Randevu Saati: ${time}`,
    `Yas: ${age}`,
    `Mesaj: ${message}`,
  ];

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER || MAIL_TO,
    to: MAIL_TO,
    subject: mailSubject,
    text: lines.join('\n'),
  });
}

async function sendNewsletterWelcomeMail(email) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER || MAIL_TO,
    to: email,
    subject: 'Hacettepe İşitme - Abonelik Onayı',
    text:
      'Aboneliğiniz alınmıştır. Instagram üzerinden paylaştığımız duyuru, kampanya ve tanıtım içerikleri e-posta adresinize iletilecektir.',
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
      if (formType === 'newsletter') {
        const email = clean(parsed.data?.email, 180);
        if (!isValidEmail(email)) {
          res.status(400).json({ ok: false, error: 'INVALID_EMAIL' });
          return;
        }
        await addNewsletterSubscriber(email);
        await sendNewsletterWelcomeMail(email);
      }
      await sendFormMail(formType, parsed.data);
      res.status(200).json({ ok: true });
    } catch (error) {
      console.error(`[${formType}] form mail error:`, error);
      res.status(500).json({ ok: false, error: 'FORM_MAIL_FAILED' });
    }
  };
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
  res.json({ ok: true, service: 'local-form-api' });
});

app.get('/api/instagram/feed', instagramFeedLimiter, async (_req, res) => {
  try {
    const now = Date.now();
    if (instagramFeedCache && instagramFeedCache.expiresAt > now) {
      res.json(instagramFeedCache.payload);
      return;
    }

    const live = await fetchInstagramMediaFromGraph();
    if (live && live.length > 0) {
      const payload = { ok: true, source: 'instagram', posts: live };
      instagramFeedCache = { expiresAt: now + INSTAGRAM_FEED_CACHE_MS, payload };
      res.json(payload);
      return;
    }

    const fallback = { ok: true, source: 'fallback', posts: getFallbackInstagramPosts() };
    instagramFeedCache = { expiresAt: now + Math.min(INSTAGRAM_FEED_CACHE_MS, 5 * 60 * 1000), payload: fallback };
    res.json(fallback);
  } catch (error) {
    console.error('[instagram] feed route error:', error);
    res.json({ ok: true, source: 'fallback', posts: getFallbackInstagramPosts() });
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
      `Sorularınız için: https://wa.me/905334745806`;

    let sent = 0;
    for (const subscriber of activeSubscribers) {
      await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER || MAIL_TO,
        to: subscriber.email,
        subject,
        text: textBody,
      });
      sent += 1;
    }

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER || MAIL_TO,
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
  app.use(express.static(FRONTEND_DIST_DIR));
  app.get(/^\/(?!api).*/, (_req, res) => {
    res.sendFile(path.join(FRONTEND_DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, HOST, () => {
  console.log(`Web app running on http://${HOST}:${PORT}`);
});
