import assert from 'node:assert/strict';
import { test } from 'node:test';
import { injectSeoIntoHtml, upsertLink } from '../server/seo-inject.js';

const SITE = 'https://hacettepeisitme.com.tr';
const SHELL = `<!doctype html><html><head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Shell</title>
</head><body><div id="root"></div></body></html>`;

const baseEntry = {
  path: '/',
  title: 'Hacettepe İşitme Merkezi Samsun | Ücretsiz İşitme Testi',
  description: 'Ücretsiz işitme testi Samsun',
  keywords: 'Hacettepe İşitme',
  image: '/local-images/home-flow/flow-reception.webp',
};

test('upsertLink hreflang=tr ve x-default ayrı ayrı günceller', () => {
  let html = `<html><head>
<link rel="alternate" hreflang="tr" href="https://hacettepeisitme.com.tr/" />
<link rel="alternate" hreflang="x-default" href="https://hacettepeisitme.com.tr/" />
</head></html>`;
  html = upsertLink(html, 'alternate', 'https://hacettepeisitme.com.tr/blog', 'hreflang="tr"');
  html = upsertLink(html, 'alternate', 'https://hacettepeisitme.com.tr/blog', 'hreflang="x-default"');
  assert.match(html, /href="https:\/\/hacettepeisitme\.com\.tr\/blog"[^>]*hreflang="tr"/);
  assert.match(html, /href="https:\/\/hacettepeisitme\.com\.tr\/blog"[^>]*hreflang="x-default"/);
  assert.doesNotMatch(html, /hreflang="tr"[^>]*href="https:\/\/hacettepeisitme\.com\.tr\/"/);
});

test('injectSeoIntoHtml LocalBusiness JSON-LD enjekte eder ve </ kaçışlar', () => {
  const entry = {
    ...baseEntry,
    jsonLd: { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Hacettepe </script> İşitme' },
  };
  const html = injectSeoIntoHtml(SHELL, '/', entry, SITE);
  assert.match(html, /data-seo-inject="page"/);
  assert.match(html, /LocalBusiness/);
  assert.doesNotMatch(html, /Hacettepe <\/script> İşitme/);
  assert.match(html, /<title>Hacettepe İşitme Merkezi Samsun \| Ücretsiz İşitme Testi<\/title>/);
  assert.match(html, /hreflang="x-default"/);
});

test('LCP preload viewport meta sonrasına ve href olmadan eklenir', () => {
  const entry = {
    ...baseEntry,
    preloadImage: { href: '/a.webp', srcset: '/a-828.webp 828w, /a.webp 1920w', sizes: '100vw' },
  };
  const html = injectSeoIntoHtml(SHELL, '/', entry, SITE);
  const viewportAt = html.indexOf('name="viewport"');
  const preloadAt = html.indexOf('rel="preload" as="image"');
  assert.ok(preloadAt > viewportAt, 'preload viewport meta sonrasında olmalı');
  assert.match(html, /imagesrcset="\/a-828\.webp 828w, \/a\.webp 1920w"/);
  assert.doesNotMatch(html, /rel="preload" as="image"[^>]*href=/);
});

test('route chunk modulepreload ve SSG HTML #root içine eklenir', () => {
  const entry = {
    ...baseEntry,
    modulepreload: ['/assets/page-abc.js'],
    ssrHtml: '<header>Nav</header><main><h1>Başlık</h1></main>',
    bodyHtml: '<div class="seo-shell">yedek</div>',
  };
  const html = injectSeoIntoHtml(SHELL, '/', entry, SITE);
  assert.match(html, /<link rel="modulepreload" crossorigin href="\/assets\/page-abc\.js" \/>/);
  assert.match(html, /<div id="root" data-ssr="1"><header>Nav<\/header><main><h1>Başlık<\/h1><\/main><\/div>/);
  assert.doesNotMatch(html, /seo-shell/);
});

test('SSG yoksa özet HTML #root içine hydration işareti olmadan eklenir', () => {
  const entry = { ...baseEntry, bodyHtml: '<div class="seo-shell"><h1>Özet</h1></div>' };
  const html = injectSeoIntoHtml(SHELL, '/', entry, SITE);
  assert.match(html, /<div id="root"><div class="seo-shell"><h1>Özet<\/h1><\/div><\/div>/);
  assert.doesNotMatch(html, /data-ssr/);
});
