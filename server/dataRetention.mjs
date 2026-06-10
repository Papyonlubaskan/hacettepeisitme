import fs from 'node:fs/promises';
import path from 'node:path';

/** KVKK ile uyumlu varsayılan saklama süreleri (gün) */
export const RETENTION_DAYS = {
  formSubmissions: Number(process.env.FORM_SUBMISSIONS_RETENTION_DAYS || 730),
  formAudit: Number(process.env.FORM_AUDIT_RETENTION_DAYS || 90),
  newsletterInactive: Number(process.env.NEWSLETTER_INACTIVE_RETENTION_DAYS || 365),
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function cutoffIso(days) {
  return new Date(Date.now() - days * MS_PER_DAY).toISOString();
}

async function readJsonl(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeJsonl(filePath, rows) {
  if (!rows.length) {
    await fs.writeFile(filePath, '', 'utf-8');
    return;
  }
  const body = rows.map((row) => JSON.stringify(row)).join('\n') + '\n';
  await fs.writeFile(filePath, body, 'utf-8');
}

export async function purgeExpiredJsonl(filePath, maxAgeDays, timestampKey = 'timestamp') {
  const cutoff = cutoffIso(maxAgeDays);
  const rows = await readJsonl(filePath);
  const kept = rows.filter((row) => {
    const ts = row[timestampKey];
    return typeof ts === 'string' && ts >= cutoff;
  });
  const removed = rows.length - kept.length;
  if (removed > 0) {
    await writeJsonl(filePath, kept);
  }
  return { file: path.basename(filePath), removed, kept: kept.length };
}

function normalizeEmail(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '');
}

function entryMatchesContact(entry, emailNorm, phoneNorm) {
  const data = entry?.data || {};
  const entryEmail = normalizeEmail(data.email);
  const entryPhone = normalizePhone(data.phone);
  if (emailNorm && entryEmail && entryEmail === emailNorm) return true;
  if (phoneNorm && entryPhone && entryPhone === phoneNorm) return true;
  return false;
}

export async function eraseFormSubmissionsByContact(filePath, { email, phone } = {}) {
  const emailNorm = normalizeEmail(email);
  const phoneNorm = normalizePhone(phone);
  if (!emailNorm && !phoneNorm) {
    return { removed: 0, kept: 0 };
  }

  const rows = await readJsonl(filePath);
  const kept = rows.filter((row) => !entryMatchesContact(row, emailNorm, phoneNorm));
  const removed = rows.length - kept.length;
  if (removed > 0) {
    await writeJsonl(filePath, kept);
  }
  return { removed, kept: kept.length };
}

export async function purgeInactiveNewsletterSubscribers(filePath, maxAgeDays) {
  const cutoff = cutoffIso(maxAgeDays);
  let subscribers;
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    subscribers = JSON.parse(raw);
  } catch (error) {
    if (error?.code === 'ENOENT') return { removed: 0, kept: 0 };
    throw error;
  }
  if (!Array.isArray(subscribers)) return { removed: 0, kept: 0 };

  const kept = subscribers.filter((sub) => {
    if (sub?.active !== false) return true;
    const updatedAt = sub?.updatedAt || sub?.createdAt || '';
    return typeof updatedAt === 'string' && updatedAt >= cutoff;
  });
  const removed = subscribers.length - kept.length;
  if (removed > 0) {
    await fs.writeFile(filePath, JSON.stringify(kept, null, 2), 'utf-8');
  }
  return { removed, kept: kept.length };
}

export async function eraseNewsletterSubscriber(filePath, email) {
  const emailNorm = normalizeEmail(email);
  if (!emailNorm) return { removed: 0, kept: 0 };

  let subscribers;
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    subscribers = JSON.parse(raw);
  } catch (error) {
    if (error?.code === 'ENOENT') return { removed: 0, kept: 0 };
    throw error;
  }
  if (!Array.isArray(subscribers)) return { removed: 0, kept: 0 };

  const kept = subscribers.filter((sub) => normalizeEmail(sub?.email) !== emailNorm);
  const removed = subscribers.length - kept.length;
  if (removed > 0) {
    await fs.writeFile(filePath, JSON.stringify(kept, null, 2), 'utf-8');
  }
  return { removed, kept: kept.length };
}

export async function runDataRetentionJob(paths) {
  const results = [];
  results.push(await purgeExpiredJsonl(paths.formSubmissions, RETENTION_DAYS.formSubmissions));
  results.push(await purgeExpiredJsonl(paths.formAudit, RETENTION_DAYS.formAudit));
  results.push(
    await purgeInactiveNewsletterSubscribers(paths.newsletter, RETENTION_DAYS.newsletterInactive),
  );
  const totalRemoved = results.reduce((sum, item) => sum + (item.removed || 0), 0);
  return { totalRemoved, results, retentionDays: RETENTION_DAYS };
}

export async function erasePersonalDataByContact(paths, { email, phone } = {}) {
  const form = await eraseFormSubmissionsByContact(paths.formSubmissions, { email, phone });
  const newsletter = email ? await eraseNewsletterSubscriber(paths.newsletter, email) : { removed: 0, kept: 0 };
  return {
    formSubmissions: form,
    newsletter,
    erasedAt: new Date().toISOString(),
  };
}
