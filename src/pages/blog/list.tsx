import { Link } from 'react-router-dom';
import { blogPosts } from '../../mocks/blog';
import { trackCTAClick } from '@/lib/tracking';

export default function BlogListPage() {
  return (
    <div className="pt-[72px] animate-fadeInUp">
      <section className="bg-brand-dark py-16 md:py-20">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto text-center">
          <p className="text-brand-accent text-sm font-semibold tracking-wide uppercase mb-3">Blog</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            İşitme Sağlığı ve Cihaz Rehberleri
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            İşitme kaybı, cihaz seçimi, bakım ve SGK süreçleri hakkında uzman içerikler.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-brand-cream">
        <div className="w-full px-6 lg:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => trackCTAClick(post.title, 'blog_list_card', `/blog/${post.slug}`)}
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="text-brand-accent font-semibold">{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-lg font-bold text-brand-dark mb-2 line-clamp-2 group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
