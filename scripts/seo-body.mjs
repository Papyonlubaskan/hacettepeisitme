/**
 * Sunucu tarafında #root içine gömülen statik HTML içerik.
 * Botlar JS çalıştırmadan sayfanın gerçek metnini ve iç linklerini görür;
 * React ilk render'da bu içeriği kendi DOM'u ile değiştirir.
 */

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function heading(title) {
  return String(title).split('|')[0].trim();
}

function faqHtml(faqs) {
  if (!faqs?.length) return '';
  return `<section><h2>Sıkça Sorulan Sorular</h2>${faqs
    .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
    .join('')}</section>`;
}

function linkList(title, links) {
  if (!links.length) return '';
  return `<section><h2>${esc(title)}</h2><ul>${links
    .map(([href, label]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`)
    .join('')}</ul></section>`;
}

export function createSeoBodyBuilder(ctx) {
  const {
    ROUTE_SEO,
    blogPosts,
    DEVICE_CATEGORIES,
    CATALOGS,
    SITE_FAQ,
    PAGE_FAQS,
    services,
    contact,
  } = ctx;

  const mainNav = Object.entries(ROUTE_SEO)
    .filter(([path]) => !/gizlilik|kullanim|kvkk/.test(path))
    .map(([path, seo]) => [path, heading(seo.title)]);

  const nav = `<nav aria-label="Site"><ul>${mainNav
    .map(([href, label]) => `<li><a href="${esc(href)}">${esc(label)}</a></li>`)
    .join('')}</ul></nav>`;

  const nap = `<footer><p><strong>Hacettepe İşitme Cihazları</strong> — ${esc(contact.address)}. Telefon: <a href="tel:${esc(
    contact.phoneE164,
  )}">${esc(contact.phoneDisplay)}</a>. Çalışma saatleri: Pazartesi–Cumartesi 09:00–18:00.</p><p><a href="${esc(
    contact.mapUrl,
  )}">Google Haritalar'da konum ve yol tarifi</a> · <a href="/randevu">Ücretsiz işitme testi randevusu</a></p></footer>`;

  const latestPosts = blogPosts.map((p) => [`/blog/${p.slug}`, p.title]);

  function heroHtml(path, entry) {
    const img = entry.preloadImage;
    if (!img?.srcset) return '';
    const alt = path === '/' ? 'Hacettepe İşitme Merkezi Samsun — merkez' : heading(entry.title);
    return `<div class="seo-hero${path === '/' ? '' : ' seo-hero--page'}"><img srcset="${esc(img.srcset)}" sizes="${esc(
      img.sizes || '100vw',
    )}" src="${esc(img.href)}" alt="${esc(alt)}" fetchpriority="high" decoding="async"></div>`;
  }

  let currentHero = '';
  function wrap(inner) {
    return `${currentHero}<div class="seo-shell">${nav}<main>${inner}</main>${nap}</div>`;
  }

  return function build(path, entry) {
    currentHero = heroHtml(path, entry);
    const blogPost = path.startsWith('/blog/') ? blogPosts.find((p) => `/blog/${p.slug}` === path) : null;
    if (blogPost) {
      const others = latestPosts.filter(([href]) => href !== path);
      return wrap(
        `<article><h1>${esc(blogPost.title)}</h1><p>${esc(blogPost.author)} · ${esc(
          blogPost.authorTitle,
        )} · <time datetime="${esc(blogPost.date)}">${esc(blogPost.date)}</time> · ${esc(
          blogPost.readTime,
        )} okuma</p>${blogPost.content}</article>${linkList('Diğer yazılar', others)}`,
      );
    }

    const category = path.startsWith('/isitme-cihazlari/')
      ? DEVICE_CATEGORIES.find((c) => `/isitme-cihazlari/${c.slug}` === path)
      : null;
    if (category) {
      return wrap(
        `<h1>${esc(category.title)}</h1><p>${esc(category.summary)}</p>${category.paragraphs
          .map((p) => `<p>${esc(p)}</p>`)
          .join('')}<ul>${category.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>${linkList(
          'Diğer cihaz tipleri',
          DEVICE_CATEGORIES.filter((c) => c !== category).map((c) => [`/isitme-cihazlari/${c.slug}`, c.title]),
        )}`,
      );
    }

    const catalog = path.startsWith('/katalog/') ? CATALOGS.find((c) => `/katalog/${c.slug}` === path) : null;
    if (catalog) {
      return wrap(
        `<h1>${esc(catalog.title)}</h1><p>${esc(catalog.subtitle)}</p><p>${esc(catalog.summary)}</p>${catalog.intro
          .map((p) => `<p>${esc(p)}</p>`)
          .join('')}<section><h2>${esc(catalog.lineName)} serileri</h2>${catalog.series
          .map((s) => `<h3>${esc(s.name)}</h3><p>${esc(s.description)}</p>`)
          .join('')}</section>${linkList(
          'Diğer kataloglar',
          CATALOGS.filter((c) => c !== catalog).map((c) => [`/katalog/${c.slug}`, c.title]),
        )}`,
      );
    }

    if (path === '/') {
      return wrap(
        `<h1>Hacettepe İşitme Merkezi — Samsun</h1><p>${esc(entry.description)}</p><section><h2>Hizmetlerimiz</h2>${services
          .map((s) => `<h3><a href="${esc(s.link)}">${esc(s.title)}</a></h3><p>${esc(s.description)}</p>`)
          .join('')}</section>${linkList('İşitme cihazı tipleri', DEVICE_CATEGORIES.map((c) => [
          `/isitme-cihazlari/${c.slug}`,
          c.title,
        ]))}${faqHtml(SITE_FAQ)}${linkList('Blog', latestPosts)}`,
      );
    }

    if (path === '/blog') {
      return wrap(
        `<h1>${esc(heading(entry.title))}</h1><p>${esc(entry.description)}</p>${blogPosts
          .map(
            (p) =>
              `<article><h2><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a></h2><p>${esc(p.excerpt)}</p></article>`,
          )
          .join('')}`,
      );
    }

    if (path === '/isitme-cihazlari') {
      return wrap(
        `<h1>${esc(heading(entry.title))}</h1><p>${esc(entry.description)}</p>${DEVICE_CATEGORIES.map(
          (c) => `<h2><a href="/isitme-cihazlari/${esc(c.slug)}">${esc(c.title)}</a></h2><p>${esc(c.summary)}</p>`,
        ).join('')}`,
      );
    }

    if (path === '/katalog') {
      return wrap(
        `<h1>${esc(heading(entry.title))}</h1><p>${esc(entry.description)}</p>${CATALOGS.map(
          (c) => `<h2><a href="/katalog/${esc(c.slug)}">${esc(c.title)}</a></h2><p>${esc(c.summary)}</p>`,
        ).join('')}`,
      );
    }

    return wrap(
      `<h1>${esc(heading(entry.title))}</h1><p>${esc(entry.description)}</p>${faqHtml(PAGE_FAQS[path])}${linkList(
        'İlgili sayfalar',
        mainNav.filter(([href]) => href !== path).slice(0, 8),
      )}`,
    );
  };
}
