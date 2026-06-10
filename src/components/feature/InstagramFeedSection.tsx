import { useCallback, useEffect, useState } from 'react';
import type { InstagramFeedPost, InstagramFeedResponse } from '@/types/instagramFeed';
import { trackCTAClick } from '@/lib/tracking';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/hacettepeisitmecihazlari55';
const INSTAGRAM_HANDLE = 'hacettepeisitmecihazlari55';
const FEED_REFRESH_MS = 90 * 1000;

function formatPostDate(timestamp?: string | null) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function PostSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-full" />
      </div>
    </div>
  );
}

export default function InstagramFeedSection() {
  const [posts, setPosts] = useState<InstagramFeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);
  const [postCount, setPostCount] = useState<number | null>(null);

  const loadFeed = useCallback(async (fresh = false) => {
    const q = fresh ? '?fresh=1' : '';
    const res = await fetch(`/api/instagram/feed${q}`, { cache: 'no-store' });
    return (await res.json()) as InstagramFeedResponse;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const applyFeed = (data: InstagramFeedResponse) => {
      if (data.source !== 'instagram' || !Array.isArray(data.posts) || data.posts.length === 0) return;
      setPosts(data.posts);
      setLive(true);
      setPostCount(data.postCount ?? data.posts.length);
    };

    (async () => {
      try {
        const data = await loadFeed(true);
        if (!cancelled) applyFeed(data);
      } catch {
        /* akış yüklenemezse boş kalır */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const refreshId = window.setInterval(() => {
      loadFeed(true)
        .then((data) => {
          if (!cancelled) applyFeed(data);
        })
        .catch(() => {});
    }, FEED_REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(refreshId);
    };
  }, [loadFeed]);

  return (
    <section className="py-20 md:py-28 bg-brand-dark">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Instagram &amp; Güncel Kampanyalar</h2>
              <p className="text-white/60">
                Güncel kampanyalar ve{' '}
                <span className="text-brand-accent font-semibold">@{INSTAGRAM_HANDLE}</span> paylaşımları
              </p>
              {!loading && live && postCount != null && (
                <p className="mt-2 text-sm text-white/50">{postCount} paylaşım · otomatik güncellenir</p>
              )}
            </div>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-[#008f7f] transition-all whitespace-nowrap"
              onClick={() => trackCTAClick('Instagram Profili', 'home_instagram', INSTAGRAM_PROFILE_URL)}
            >
              <i className="ri-instagram-line text-lg" />
              <span>Profili Aç</span>
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 6 }, (_, i) => <PostSkeleton key={`ig-skel-${i}`} />)
              : posts.length > 0
                ? posts.map((post) => {
                    const postedAt = formatPostDate(post.timestamp);
                    return (
                      <a
                        key={post.id}
                        href={post.permalink || INSTAGRAM_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        onClick={() =>
                          trackCTAClick(
                            post.title.slice(0, 80) || `Instagram ${post.id}`,
                            'home_instagram_feed',
                            post.permalink || INSTAGRAM_PROFILE_URL
                          )
                        }
                      >
                        <div
                          className="relative overflow-hidden bg-gray-50"
                          style={{ aspectRatio: post.mediaType === 'VIDEO' ? '9 / 16' : '4 / 5' }}
                        >
                          {post.mediaType === 'VIDEO' && post.videoUrl ? (
                            <video
                              src={post.videoUrl}
                              poster={post.imageUrl}
                              className="absolute left-1/2 top-1/2 min-h-[112%] min-w-[112%] -translate-x-1/2 -translate-y-[46%] object-cover"
                              muted
                              loop
                              playsInline
                              autoPlay
                              preload="metadata"
                              onLoadedMetadata={(e) => {
                                const v = e.currentTarget;
                                if (v.videoWidth && v.videoHeight) {
                                  v.parentElement?.style.setProperty(
                                    'aspect-ratio',
                                    `${v.videoWidth} / ${v.videoHeight}`
                                  );
                                }
                              }}
                            />
                          ) : (
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-500"
                              onLoad={(e) => {
                                const img = e.currentTarget;
                                if (img.naturalWidth && img.naturalHeight) {
                                  img.parentElement?.style.setProperty(
                                    'aspect-ratio',
                                    `${img.naturalWidth} / ${img.naturalHeight}`
                                  );
                                }
                              }}
                              onError={(e) => {
                                const img = e.currentTarget;
                                if (img.dataset.fallback === '1') return;
                                img.dataset.fallback = '1';
                                img.src = '/local-images/pro-hero-main.webp';
                              }}
                            />
                          )}
                          {post.mediaType === 'VIDEO' && (
                            <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
                              <i className="ri-play-fill" />
                              Video
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2 text-xs text-gray-400 mb-2">
                            <span className="inline-flex items-center gap-2">
                              <i className="ri-instagram-line" />
                              @{INSTAGRAM_HANDLE}
                            </span>
                            {postedAt && <time dateTime={post.timestamp || undefined}>{postedAt}</time>}
                          </div>
                          <p className="text-sm font-medium text-brand-dark line-clamp-2">{post.title}</p>
                        </div>
                      </a>
                    );
                  })
                : (
                  <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
                    <p className="text-white/70">
                      Canlı Instagram akışı şu an yüklenemedi. Güncel paylaşımlar için profili ziyaret edebilirsiniz.
                    </p>
                  </div>
                )}
          </div>
          <div className="text-center mt-8">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:text-[#008f7f] transition-colors"
              onClick={() => trackCTAClick('Instagramda Daha Fazla', 'home_instagram_more', INSTAGRAM_PROFILE_URL)}
            >
              <span>Instagram&apos;da daha fazla paylaşım görüntüle</span>
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
