import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const routeSeo = readFileSync('src/lib/routeSeo.ts', 'utf8');
const siteSeo = readFileSync('src/lib/siteSeo.ts', 'utf8');
const seoJsonLd = readFileSync('src/components/SeoJsonLd.tsx', 'utf8');

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

test('routeSeo fiyat ve SGK başlıkları 2026 içerir', () => {
  assert.match(routeSeo, /İşitme Cihazı Fiyatları 2026/);
  assert.match(routeSeo, /SGK İşitme Cihazı Ödeme Tutarları 2026/);
  assert.doesNotMatch(routeSeo, /Fiyatları 2025/);
});

test('siteSeo sahte SearchAction içermez', () => {
  assert.doesNotMatch(siteSeo, /SearchAction/);
  assert.match(siteSeo, /ReserveAction/);
});

test('siteSeo sameAs tekrarlı Maps URL içermez', () => {
  const sameAsBlock = siteSeo.match(/SITE_SAME_AS = \[([\s\S]*?)\] as const/)?.[1] ?? '';
  const mapsCount = (sameAsBlock.match(/SITE_GOOGLE_MAPS_URL/g) ?? []).length;
  assert.equal(mapsCount, 1);
});

test('SeoJsonLd production çift schema önleme kontrolü içerir', () => {
  assert.match(seoJsonLd, /data-seo-inject="page"/);
});
