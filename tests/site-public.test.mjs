import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const robots = readFileSync('public/robots.txt', 'utf8');
const sitemap = readFileSync('public/sitemap.xml', 'utf8');

test('robots.txt sitemap adresi içerir', () => {
  assert.match(robots, /Sitemap:\s+https:\/\/.+\/sitemap\.xml/);
});

test('sitemap.xml ana sayfayı listeler', () => {
  assert.match(sitemap, /<loc>https:\/\/[^<]+\/<\/loc>/);
});

test('sitemap.xml blog listesini içerir', () => {
  assert.match(sitemap, /\/blog<\/loc>/);
});
