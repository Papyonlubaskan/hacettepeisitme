import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import {
  eraseFormSubmissionsByContact,
  purgeExpiredJsonl,
  RETENTION_DAYS,
} from '../server/dataRetention.mjs';

test('RETENTION_DAYS varsayılan değerleri KVKK ile uyumlu', () => {
  assert.equal(RETENTION_DAYS.formSubmissions, 730);
  assert.equal(RETENTION_DAYS.formAudit, 90);
  assert.equal(RETENTION_DAYS.newsletterInactive, 365);
});

test('purgeExpiredJsonl süresi dolan kayıtları siler', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'retention-'));
  const file = path.join(dir, 'form-submissions.jsonl');
  const old = new Date(Date.now() - 800 * 24 * 60 * 60 * 1000).toISOString();
  const recent = new Date().toISOString();
  await fs.writeFile(
    file,
    `${JSON.stringify({ timestamp: old, formType: 'contact', data: { email: 'eski@test.com' } })}\n` +
      `${JSON.stringify({ timestamp: recent, formType: 'contact', data: { email: 'yeni@test.com' } })}\n`,
    'utf-8',
  );

  const result = await purgeExpiredJsonl(file, 730);
  assert.equal(result.removed, 1);
  assert.equal(result.kept, 1);

  const raw = await fs.readFile(file, 'utf-8');
  assert.match(raw, /yeni@test.com/);
  assert.doesNotMatch(raw, /eski@test.com/);
  await fs.rm(dir, { recursive: true, force: true });
});

test('eraseFormSubmissionsByContact e-posta ile kayıt siler', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'erase-'));
  const file = path.join(dir, 'form-submissions.jsonl');
  await fs.writeFile(
    file,
    `${JSON.stringify({ timestamp: new Date().toISOString(), data: { email: 'sil@test.com', phone: '5331112233' } })}\n` +
      `${JSON.stringify({ timestamp: new Date().toISOString(), data: { email: 'kalsin@test.com' } })}\n`,
    'utf-8',
  );

  const result = await eraseFormSubmissionsByContact(file, { email: 'sil@test.com' });
  assert.equal(result.removed, 1);
  const raw = await fs.readFile(file, 'utf-8');
  assert.doesNotMatch(raw, /sil@test.com/);
  assert.match(raw, /kalsin@test.com/);
  await fs.rm(dir, { recursive: true, force: true });
});
