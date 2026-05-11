import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../../mocks/blog';
import NotFound from '../NotFound';
import { trackCTAClick, trackWhatsAppClick } from '@/lib/tracking';
import { SITE_PHONE_E164, SITE_PHONE_WA } from '@/lib/siteContact';

function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  const otherRelated = blogPosts
    .filter((p) => p.id !== post.id && !relatedPosts.find((r) => r.id === p.id))
    .slice(0, 3 - relatedPosts.length);

  const allRelated = [...relatedPosts, ...otherRelated];

  return (
    <div className="animate-fadeInUp">
      {/* SEO: Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDescription,
          image: post.ogImage,
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
              url: '/local-images/readdy-blog-logo-seq-logo.webp',
            },
          },
          datePublished: post.date,
          dateModified: post.date,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://hacettepeisitme.com/blog/${post.slug}`,
          },
        })}
      </script>

      {/* React 19 Document Metadata */}
      <title>{`${post.title} | Hacettepe İşitme Cihazları Blog`}</title>
      <meta name="description" content={post.metaDescription} />
      <meta name="keywords" content={post.keywords} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.metaDescription} />
      <meta property="og:image" content={post.ogImage} />
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content={post.author} />
      <meta property="article:section" content={post.category} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.metaDescription} />
      <meta name="twitter:image" content={post.ogImage} />

      {/* Hero */}
      <section className="relative min-h-[400px] md:min-h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/30" />
        </div>

        <div className="relative z-10 w-full px-6 lg:px-12 pb-12 pt-32">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block bg-brand-accent/20 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/60">
                <i className="ri-time-line" />
                <span>{post.readTime} okuma</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-white/60">
                <i className="ri-calendar-line" />
                <span>{post.date}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <span className="text-sm font-bold text-brand-accent">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{post.author}</p>
                <p className="text-xs text-white/60">{post.authorTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="w-full px-6 lg:px-12 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share & CTA */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-brand-dark">Paylaş:</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://hacettepeisitme.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white transition-colors"
                  aria-label="WhatsApp ile paylaş"
                >
                  <i className="ri-whatsapp-line" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://hacettepeisitme.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label="Facebook ile paylaş"
                >
                  <i className="ri-facebook-fill" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://hacettepeisitme.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors"
                  aria-label="X ile paylaş"
                >
                  <i className="ri-twitter-x-fill" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <i className="ri-eye-line" />
                <span>{post.readTime} okuma süresi</span>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-brand-cream rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">
                    Ücretsiz İşitme Testi Randevusu Alın
                  </h3>
                  <p className="text-sm text-gray-500">
                    Uzmanlarımızdan randevu alarak işitme sağlığınızı kontrol ettirin.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/randevu"
                    className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-[#008f7f] transition-all whitespace-nowrap"
                    onClick={() => trackCTAClick('Blog Detaydan Randevu', 'blog_detail_cta', '/randevu')}
                  >
                    <span>Randevu Oluştur</span>
                    <i className="ri-arrow-right-line" />
                  </Link>
                  <a
                    href={`https://wa.me/${SITE_PHONE_WA}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center gap-2 border border-brand-dark/20 text-brand-dark font-semibold px-6 py-3 rounded-full hover:bg-brand-dark hover:text-white transition-all whitespace-nowrap"
                    onClick={() => trackWhatsAppClick(SITE_PHONE_E164)}
                  >
                    <i className="ri-whatsapp-line" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {allRelated.length > 0 && (
        <section className="w-full px-6 lg:px-12 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark mb-8">
              İlgili Yazılar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRelated.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group bg-brand-cream rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {related.category}
                    </span>
                    <h3 className="text-base font-bold text-brand-dark mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <i className="ri-time-line" />
                      <span>{related.readTime} okuma</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default BlogDetail;