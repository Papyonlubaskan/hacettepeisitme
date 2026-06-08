import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const robots = readFileSync('public/robots.txt', 'utf8');
const sitemap = readFileSync('public/sitemap.xml', 'utf8');

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
