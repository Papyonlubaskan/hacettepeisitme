import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const siteContact = readFileSync(join(root, 'src/lib/siteContact.ts'), 'utf8');

test('harita linkleri tam adres içerir (eski koordinat-only değil)', () => {
  assert.match(siteContact, /SITE_MAP_DIRECTIONS_URL/);
  assert.match(siteContact, /encodeURIComponent\(SITE_ADDRESS_SINGLE\)/);
  assert.doesNotMatch(siteContact, /destination=\$\{SITE_MAP_LAT\}/);
});

test('koordinatlar Tepecik 1537. Sokak geocode ile uyumlu', () => {
  assert.match(siteContact, /SITE_MAP_LAT = 41\.2693501/);
  assert.match(siteContact, /SITE_MAP_LNG = 36\.2966171/);
});

test('Google İşletme CID Tepecik profiline işaret eder', () => {
  assert.match(siteContact, /SITE_GOOGLE_CID = '16601713861178672737'/);
});
