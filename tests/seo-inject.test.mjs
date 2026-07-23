import assert from 'node:assert/strict';
import { test } from 'node:test';
import { injectSeoIntoHtml, upsertLink } from '../server/seo-inject.js';

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

test('injectSeoIntoHtml LocalBusiness JSON-LD enjekte eder', () => {
  const shell = `<!doctype html><html><head><title>Shell</title></head><body></body></html>`;
  const entry = {
    path: '/',
    title: 'Hacettepe İşitme Merkezi Samsun | Ücretsiz İşitme Testi',
    description: 'Ücretsiz işitme testi Samsun',
    keywords: 'Hacettepe İşitme',
    image: '/local-images/home-flow/flow-reception.webp',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Hacettepe İşitme',
    },
  };
  const html = injectSeoIntoHtml(shell, '/', entry, 'https://hacettepeisitme.com.tr');
  assert.match(html, /data-seo-inject="page"/);
  assert.match(html, /LocalBusiness/);
  assert.match(html, /<title>Hacettepe İşitme Merkezi Samsun \| Ücretsiz İşitme Testi<\/title>/);
  assert.match(html, /hreflang="tr"/);
  assert.match(html, /hreflang="x-default"/);
});
