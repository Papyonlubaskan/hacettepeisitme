import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const robots = readFileSync('public/robots.txt', 'utf8');
const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const googleVerification = readFileSync('public/google399566b06c8c412a.html', 'utf8');

test('robots.txt sitemap adresi içerir', () => {
  assert.match(robots, /Sitemap:\s+https:\/\/hacettepeisitme\.com\.tr\/sitemap\.xml/);
});

test('robots.txt api yollarını engeller', () => {
  assert.match(robots, /Disallow:\s+\/api\//);
});

test('sitemap.xml ana sayfayı listeler', () => {
  assert.match(sitemap, /<loc>https:\/\/hacettepeisitme\.com\.tr\/<\/loc>/);
});

test('sitemap.xml blog listesini içerir', () => {
  assert.match(sitemap, /\/blog<\/loc>/);
});

test('Google Search Console doğrulama dosyası mevcut', () => {
  assert.equal(
    googleVerification.trim(),
    'google-site-verification: google399566b06c8c412a.html',
  );
});

test('feed.xml blog yazılarını içerir', () => {
  const feed = readFileSync('public/feed.xml', 'utf8');
  assert.match(feed, /<rss version="2.0">/);
  assert.match(feed, /\/blog\//);
});

test('seo-manifest.json üretilmiş olmalı', () => {
  const manifest = readFileSync('out/seo-manifest.json', 'utf8');
  assert.match(manifest, /"\/randevu"/);
  assert.match(manifest, /"\/blog\//);
});
