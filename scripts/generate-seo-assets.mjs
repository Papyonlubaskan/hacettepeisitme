import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
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
const { breadcrumbJsonLd, localBusinessJsonLd, faqPageJsonLd, SITE_FAQ, serviceJsonLd } =
  importSource('../src/lib/schema.ts');
const { organizationJsonLd, websiteJsonLd, SITE_DEFAULT_OG_IMAGE } = importSource('../src/lib/siteSeo.ts');
const { PAGE_IMAGES } = importSource('../src/lib/pageImages.ts');

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
      priority: path === '/' ? '1.0' : path.includes('randevu') || path.includes('test') ? '0.9' : '0.8',
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
      entry.jsonLd = serviceJsonLd(
        'Samsun İşitme Testi',
        'Samsun İlkadım merkezimizde ücretsiz odyometri ve işitme testi hizmeti.',
        path,
      );
    }

    if (path === '/samsun-isitme-cihazi') {
      entry.jsonLd = serviceJsonLd(
        'Samsun İşitme Cihazı Satışı',
        'Samsun İlkadım merkezinde işitme cihazı satışı, ücretsiz test ve SGK danışmanlığı.',
        path,
      );
      entry.priority = '0.95';
    }

    if (path === '/samsun-isitme-cihazlari') {
      entry.jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          serviceJsonLd(
            'Samsun İşitme Cihazları Satışı',
            "Samsun'da işitme cihazları satışı, ücretsiz test ve SGK danışmanlığı.",
            path,
          ),
          breadcrumbJsonLd([
            { name: 'Ana Sayfa', path: '/' },
            { name: 'Samsun İşitme Cihazları', path },
          ]),
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
      priority: '0.7',
      changefreq: 'yearly',
      lastmod: post.date,
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

console.log(`SEO assets: ${Object.keys(manifest).length} routes, sitemap + feed + manifest written.`);
