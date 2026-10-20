import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import jiti from 'jiti';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = (process.env.VITE_SITE_URL || 'https://hacettepeisitme.com.tr').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const importSource = jiti(import.meta.url, {
  alias: {
    '@': join(rootDir, 'src'),
  },
});
const { ROUTE_SEO } = importSource('../src/lib/routeSeo.ts');
const { blogPosts } = importSource('../src/mocks/blog.ts');
const { DEVICE_CATEGORIES, CATALOGS } = importSource('../src/mocks/hearingAids.ts');
const { breadcrumbJsonLd, localBusinessJsonLd, faqPageJsonLd, SITE_FAQ, SAMSUN_CIHAZLARI_FAQ, SAMSUN_CIHAZI_FAQ, SAMSUN_TESTI_FAQ, serviceJsonLd, webPageJsonLd } =
  importSource('../src/lib/schema.ts');
const { organizationJsonLd, websiteJsonLd, SITE_DEFAULT_OG_IMAGE } = importSource('../src/lib/siteSeo.ts');
const { PAGE_IMAGES, pageHeroSrcSet } = importSource('../src/lib/pageImages.ts');
const { HOME_FLOW_SLIDES, HERO_LCP_SRCSET } = importSource('../src/lib/homeFlowImages.ts');
const { services } = importSource('../src/mocks/services.ts');
const { SITE_ADDRESS_SINGLE, SITE_PHONE_E164, SITE_PHONE_DISPLAY, SITE_MAP_URL } =
  importSource('../src/lib/siteContact.ts');
const { createSeoBodyBuilder } = await import('./seo-body.mjs');

const buildBodyHtml = createSeoBodyBuilder({
  ROUTE_SEO,
  blogPosts,
  DEVICE_CATEGORIES,
  CATALOGS,
  SITE_FAQ,
  PAGE_FAQS: {
    '/samsun-isitme-cihazlari': SAMSUN_CIHAZLARI_FAQ,
    '/samsun-isitme-cihazi': SAMSUN_CIHAZI_FAQ,
    '/samsun-isitme-testi': SAMSUN_TESTI_FAQ,
  },
  services,
  contact: {
    address: SITE_ADDRESS_SINGLE,
    phoneE164: SITE_PHONE_E164,
    phoneDisplay: SITE_PHONE_DISPLAY,
    mapUrl: SITE_MAP_URL,
  },
});

const DEFAULT_OG = SITE_DEFAULT_OG_IMAGE;
const CATALOG_SEO_IMAGES = {
  vista: '/local-images/showcase/vista-showcase.webp',
  'a-m': '/local-images/showcase/am-showcase.webp',
  nitro: '/local-images/showcase/nitro-showcase.webp',
  pediatrik: '/local-images/pediatrik-isitme-cocuk.webp',
};

function absoluteUrl(path) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Rota → lazy sayfa chunk'ları (Vite manifest). HTML'e modulepreload eklenir;
 * aksi halde tarayıcı ana JS'i bitirmeden sayfa chunk'ını istemez (LCP'yi geciktiren ek tur).
 */
function buildRouteChunks() {
  const manifestPath = join(rootDir, 'out', '.vite', 'manifest.json');
  if (!existsSync(manifestPath)) return () => [];
  const vite = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const config = readFileSync(join(rootDir, 'src', 'router', 'config.tsx'), 'utf8');

  const importByName = {};
  for (const [, name, rel] of config.matchAll(/const (\w+) = lazy\(\(\) => import\("\.\.\/([^"]+)"\)\)/g)) {
    importByName[name] = rel;
  }
  const routes = [];
  for (const [, routePath, name] of config.matchAll(/path: "([^"]+)",\s*element: \(\s*<Suspense[^\n]*>\s*<(\w+)/g)) {
    const rel = importByName[name];
    if (!rel) continue;
    const key = Object.keys(vite).find((k) => k.replace(/\.tsx?$/, '') === `src/${rel}`);
    if (key) routes.push({ routePath, key });
  }

  function collect(key, out) {
    const chunk = vite[key];
    if (!chunk || chunk.isEntry) return;
    const file = `/${chunk.file}`;
    if (out.includes(file)) return;
    out.push(file);
    for (const imp of chunk.imports ?? []) collect(imp, out);
  }

  return (path) => {
    const exact = routes.find((r) => r.routePath === path);
    const dynamic = routes.find(
      (r) => r.routePath.includes('/:') && path.startsWith(r.routePath.split('/:')[0] + '/'),
    );
    const match = exact ?? dynamic;
    if (!match) return [];
    const files = [];
    collect(match.key, files);
    return files;
  };
}

const routeChunks = buildRouteChunks();

/** Build-time SSG (out-ssr/entry-server.js). Yoksa özet HTML (bodyHtml) kullanılır. */
const ssrEntry = join(rootDir, 'out-ssr', 'entry-server.js');
const ssrRender = existsSync(ssrEntry) ? (await import(pathToFileURL(ssrEntry).href)).render : null;

// React head'e taşınacak etiketleri (title/meta/link) gövdenin başına yazar; sunucu head'i zaten dolduruyor
function stripLeadingHoistables(html) {
  const bodyStart = html.search(/<(?!link\b|meta\b|title\b|\/title\b)[a-z]/i);
  return bodyStart > 0 ? html.slice(bodyStart) : html;
}

async function renderSsr(path) {
  if (!ssrRender) return null;
  try {
    // İlk render lazy route modüllerini yükletir; ikincisi içeriği askıya almadan satır içi üretir
    await ssrRender(path);
    const html = await ssrRender(path);
    if (html.includes('<!--$?-->')) {
      console.warn(`[ssr] ${path}: askıda Suspense kaldı, özet HTML kullanılacak`);
      return null;
    }
    return stripLeadingHoistables(html);
  } catch (error) {
    console.warn(`[ssr] ${path}: ${error.message}`);
    return null;
  }
}

function buildManifest() {
  const manifest = {};

  for (const [path, seo] of Object.entries(ROUTE_SEO)) {
    const entry = {
      path,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      image: seo.image ? absoluteUrl(seo.image) : absoluteUrl(DEFAULT_OG),
      type: 'website',
      priority:
        path === '/'
          ? '1.0'
          : path.includes('gizlilik') || path.includes('kullanim') || path.includes('kvkk')
            ? '0.3'
            : path.includes('randevu') || path.includes('test')
              ? '0.9'
              : '0.8',
      changefreq: path === '/' || path.includes('blog') ? 'weekly' : 'monthly',
      lastmod: today,
    };

    if (path === '/') {
      entry.jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          organizationJsonLd(),
          websiteJsonLd(),
          localBusinessJsonLd(),
          faqPageJsonLd(SITE_FAQ),
        ],
      };
    }

    if (path === '/samsun-isitme-testi') {
      entry.jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          webPageJsonLd(
            'Samsun İşitme Testi',
            'Samsun İlkadım merkezimizde ücretsiz odyometri ve işitme testi hizmeti.',
            path,
          ),
          serviceJsonLd(
            'Samsun İşitme Testi',
            'Samsun İlkadım merkezimizde ücretsiz odyometri ve işitme testi hizmeti.',
            path,
          ),
          breadcrumbJsonLd([
            { name: 'Ana Sayfa', path: '/' },
            { name: 'Samsun İşitme Testi', path },
          ]),
          faqPageJsonLd(SAMSUN_TESTI_FAQ),
        ],
      };
      entry.priority = '0.9';
    }

    if (path === '/samsun-isitme-cihazi') {
      entry.jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          webPageJsonLd(
            'Samsun İşitme Cihazı',
            'Samsun İlkadım merkezinde işitme cihazı satışı, ücretsiz test ve SGK danışmanlığı.',
            path,
          ),
          serviceJsonLd(
            'Samsun İşitme Cihazı Satışı',
            'Samsun İlkadım merkezinde işitme cihazı satışı, ücretsiz test ve SGK danışmanlığı.',
            path,
          ),
          breadcrumbJsonLd([
            { name: 'Ana Sayfa', path: '/' },
            { name: 'Samsun İşitme Cihazı', path },
          ]),
          faqPageJsonLd(SAMSUN_CIHAZI_FAQ),
        ],
      };
      entry.priority = '0.9';
    }

    if (path === '/samsun-isitme-cihazlari') {
      entry.jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          webPageJsonLd(
            'Samsun İşitme Cihazları',
            "Samsun'da işitme cihazları satışı, ücretsiz test ve SGK danışmanlığı.",
            path,
          ),
          serviceJsonLd(
            'Samsun İşitme Cihazları Satışı',
            "Samsun'da işitme cihazları satışı, ücretsiz test ve SGK danışmanlığı.",
            path,
          ),
          breadcrumbJsonLd([
            { name: 'Ana Sayfa', path: '/' },
            { name: 'Samsun İşitme Cihazları', path },
          ]),
          faqPageJsonLd(SAMSUN_CIHAZLARI_FAQ),
        ],
      };
      entry.priority = '0.98';
      entry.changefreq = 'weekly';
    }

    if (path === '/isitme-cihazlari') {
      entry.priority = '0.9';
      entry.jsonLd = serviceJsonLd(
        'İşitme Cihazları Satışı',
        'Samsun Hacettepe İşitme Merkezi’nde Vista, A&M ve Nitro işitme cihazı satışı ve uyarlama.',
        path,
      );
    }

    if (path === '/isitme-cihazi-fiyatlari') {
      entry.jsonLd = serviceJsonLd(
        'İşitme Cihazı Fiyatları Samsun',
        'Vista, A&M ve Nitro işitme cihazı fiyat danışmanlığı ve SGK bilgilendirmesi.',
        path,
      );
    }

    manifest[path] = entry;
  }

  for (const cat of DEVICE_CATEGORIES) {
    const path = `/isitme-cihazlari/${cat.slug}`;
    manifest[path] = {
      path,
      title: cat.seoTitle,
      description: cat.seoDescription,
      keywords: cat.keywords,
      image: absoluteUrl(
        cat.slug === 'cocuk-isitme-cihazlari' ? PAGE_IMAGES.hearingAids : PAGE_IMAGES.hearingAids,
      ),
      type: 'website',
      priority: '0.75',
      changefreq: 'monthly',
      lastmod: today,
    };
  }

  for (const catalog of CATALOGS) {
    const path = `/katalog/${catalog.slug}`;
    manifest[path] = {
      path,
      title: catalog.seoTitle,
      description: catalog.seoDescription,
      keywords: catalog.keywords,
      image: absoluteUrl(CATALOG_SEO_IMAGES[catalog.slug] || PAGE_IMAGES.catalog),
      type: 'website',
      priority: '0.75',
      changefreq: 'monthly',
      lastmod: today,
    };
  }

  for (const post of blogPosts) {
    const path = `/blog/${post.slug}`;
    manifest[path] = {
      path,
      title: `${post.title} | Hacettepe İşitme Cihazları Blog`,
      description: post.metaDescription,
      keywords: post.keywords,
      image: absoluteUrl(post.ogImage),
      type: 'article',
      priority: '0.85',
      changefreq: 'weekly',
      lastmod: today,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        image: absoluteUrl(post.ogImage),
        url: absoluteUrl(path),
        author: {
          '@type': 'Person',
          name: post.author,
          jobTitle: post.authorTitle,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Hacettepe İşitme Cihazları',
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/local-images/brand-favicon.webp'),
          },
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': absoluteUrl(path),
        },
      },
    };
  }

  manifest['/'].preloadImage = { href: HOME_FLOW_SLIDES[0].src, srcset: HERO_LCP_SRCSET, sizes: '100vw' };
  for (const [path, seo] of Object.entries(ROUTE_SEO)) {
    const srcset = path !== '/' && seo.image ? pageHeroSrcSet(seo.image) : undefined;
    if (srcset) manifest[path].preloadImage = { href: seo.image, srcset, sizes: '100vw' };
  }

  for (const [path, entry] of Object.entries(manifest)) {
    entry.bodyHtml = buildBodyHtml(path, entry);
    const chunks = routeChunks(path);
    if (chunks.length) entry.modulepreload = chunks;
  }

  for (const [path, entry] of Object.entries(manifest)) {
    if (path === '/' || path.startsWith('/blog/')) continue;
    const crumbs = [{ name: 'Ana Sayfa', path: '/' }];
    const label = ROUTE_SEO[path]?.title?.split('|')[0]?.trim();
    if (label) crumbs.push({ name: label, path });
    entry.jsonLd = entry.jsonLd || breadcrumbJsonLd(crumbs);
  }

  return manifest;
}

function buildSitemap(manifest) {
  const urls = Object.values(manifest)
    .sort((a, b) => Number(b.priority) - Number(a.priority))
    .map(
      (entry) => `  <url>
    <loc>${absoluteUrl(entry.path)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRss(manifest) {
  const items = blogPosts
    .map((post) => {
      const path = `/blog/${post.slug}`;
      const url = absoluteUrl(path);
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Hacettepe İşitme Cihazları Blog</title>
    <link>${absoluteUrl('/blog')}</link>
    <description>İşitme sağlığı, cihaz teknolojileri ve Samsun işitme merkezi rehberleri.</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

const manifest = buildManifest();

let ssrCount = 0;
for (const [path, entry] of Object.entries(manifest)) {
  const html = await renderSsr(path);
  if (html) {
    entry.ssrHtml = html;
    delete entry.bodyHtml;
    // SSG HTML'i LCP'yi JS'siz karşılıyor; route chunk preload'ları yalnızca LCP görseliyle bant genişliği yarıştırır
    delete entry.modulepreload;
    ssrCount++;
  }
}

const outDir = 'out';
const publicDir = 'public';

mkdirSync(outDir, { recursive: true });

const manifestJson = JSON.stringify(manifest, null, 2);
const sitemapXml = buildSitemap(manifest);
const feedXml = buildRss(manifest);

writeFileSync(`${outDir}/seo-manifest.json`, manifestJson);
writeFileSync(`${outDir}/sitemap.xml`, sitemapXml);
writeFileSync(`${outDir}/feed.xml`, feedXml);
writeFileSync(`${publicDir}/sitemap.xml`, sitemapXml);
writeFileSync(`${publicDir}/feed.xml`, feedXml);

console.log(
  `SEO assets: ${Object.keys(manifest).length} routes (${ssrCount} SSG), sitemap + feed + manifest written.`,
);
