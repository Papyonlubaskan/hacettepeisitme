function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function replaceTag(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html;
}

function upsertMeta(html, attr, key, content) {
  const pattern = new RegExp(`<meta\\s+${attr}=["']${key}["'][^>]*>`, 'i');
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function upsertLink(html, rel, href, extra = '') {
  const pattern = new RegExp(`<link\\s+rel=["']${rel}["'][^>]*>`, 'i');
  const tag = `<link rel="${rel}" href="${escapeAttr(href)}"${extra ? ` ${extra}` : ''} />`;
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function removeJsonLdBlocks(html) {
  return html.replace(
    /<script type="application\/ld\+json" data-seo-inject="page">[\s\S]*?<\/script>\s*/gi,
    '',
  );
}

export const GA_MEASUREMENT_ID = process.env.VITE_GA_MEASUREMENT_ID || 'G-5HBR604GT5';

export function ensureGa4Script(html) {
  if (!GA_MEASUREMENT_ID || html.includes(GA_MEASUREMENT_ID)) return html;
  const gaScript = `<!-- Google Analytics (GA4) -->
  <script>
    (function () {
      var id = '${GA_MEASUREMENT_ID}';
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', id);
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.appendChild(s);
    })();
  </script>`;
  return html.replace('</head>', `  ${gaScript}\n</head>`);
}

export function injectSeoIntoHtml(html, pathname, entry, siteUrl) {
  if (!entry) return ensureGa4Script(html);

  const canonical = `${siteUrl}${entry.path || pathname}`;
  const ogImage = entry.image?.startsWith('http') ? entry.image : `${siteUrl}${entry.image || '/local-images/home-flow/flow-reception.webp'}`;

  let next = html;
  next = replaceTag(next, /<title>[^<]*<\/title>/i, `<title>${escapeAttr(entry.title)}</title>`);
  next = upsertMeta(next, 'name', 'description', entry.description);
  next = upsertMeta(next, 'name', 'keywords', entry.keywords || '');
  next = upsertMeta(next, 'name', 'robots', entry.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  next = upsertLink(next, 'canonical', canonical);
  next = upsertLink(next, 'alternate', canonical, 'hreflang="tr"');
  next = upsertMeta(next, 'property', 'og:title', entry.title);
  next = upsertMeta(next, 'property', 'og:description', entry.description);
  next = upsertMeta(next, 'property', 'og:url', canonical);
  next = upsertMeta(next, 'property', 'og:image', ogImage);
  next = upsertMeta(next, 'property', 'og:type', entry.type || 'website');
  next = upsertMeta(next, 'name', 'twitter:title', entry.title);
  next = upsertMeta(next, 'name', 'twitter:description', entry.description);
  next = upsertMeta(next, 'name', 'twitter:image', ogImage);

  next = removeJsonLdBlocks(next);

  if (entry.jsonLd) {
    const script = `<script type="application/ld+json" data-seo-inject="page">${JSON.stringify(entry.jsonLd)}</script>`;
    next = next.replace('</head>', `  ${script}\n</head>`);
  }

  return ensureGa4Script(next);
}

export function resolveSeoEntry(manifest, pathname) {
  if (!manifest) return null;
  return manifest[pathname] || manifest[pathname.replace(/\/$/, '')] || null;
}
