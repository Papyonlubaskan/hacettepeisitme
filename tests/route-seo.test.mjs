import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const routeSeo = readFileSync('src/lib/routeSeo.ts', 'utf8');

test('routeSeo ana sayfa meta tanımı içerir', () => {
  assert.match(routeSeo, /withImage\('\/',\s*\{/);
  assert.match(routeSeo, /title:\s*'/);
});

test('routeSeo blog listesi meta tanımı içerir', () => {
  assert.match(routeSeo, /withImage\('\/blog',\s*\{/);
});

test('routeSeo ana sayfa yerel anahtar kelime içerir', () => {
  assert.match(routeSeo, /hacettepe işitme cihazları/i);
  assert.match(routeSeo, /keywords/);
});

test('routeSeo pro-hero-main referansı içermez', () => {
  assert.doesNotMatch(routeSeo, /pro-hero-main/);
});
