import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const siteContact = readFileSync(join(root, 'src/lib/siteContact.ts'), 'utf8');

test('yol tarifi CID linki kullanır (eski /dir/ koordinat rotası değil)', () => {
  assert.match(siteContact, /SITE_MAP_LAT = 41\.2695067/);
  assert.match(siteContact, /SITE_MAP_LNG = 36\.2974595/);
  assert.match(siteContact, /SITE_MAP_DIRECTIONS_URL = SITE_MAP_URL/);
  assert.doesNotMatch(siteContact, /maps\/dir\/\?api=1&destination=\$\{MAP_COORDS\}/);
});

test('Google Maps CID Şok Market Tepecik', () => {
  assert.match(siteContact, /SITE_GOOGLE_CID = '3773788576008759636'/);
  assert.match(siteContact, /maps\?cid=\$\{SITE_GOOGLE_CID\}/);
});
