import { useCallback, useEffect, useRef, useState } from 'react';
import type { InstagramFeedPost, InstagramFeedResponse } from '@/types/instagramFeed';
import { trackCTAClick } from '@/lib/tracking';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/hacettepeisitmecihazlari55';
const INSTAGRAM_HANDLE = 'hacettepeisitmecihazlari55';
const FEED_REFRESH_MS = 15 * 60 * 1000;

function formatPostDate(timestamp?: string | null) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

function formatCaption(title: string) {
  return title.replace(/#\S+/g, '').replace(/\s+/g, ' ').trim() || 'Hacettepe İşitme paylaşımı';
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-0.5 md:gap-1">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={`ig-skel-${i}`} className="aspect-square bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

function InstagramGridTile({ post }: { post: InstagramFeedPost }) {
  const tileRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playVideo, setPlayVideo] = useState(false);
  const isVideo = post.mediaType === 'VIDEO' && !!post.videoUrl;
  const caption = formatCaption(post.title);
  const postedAt = formatPostDate(post.timestamp);

  useEffect(() => {
    if (!isVideo || !tileRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlayVideo(entry.isIntersecting);
      },
      { threshold: 0.45 }
    );
    observer.observe(tileRef.current);
    return () => observer.disconnect();
  }, [isVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playVideo) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [playVideo]);

  return (
    <a
      ref={tileRef}
      href={post.permalink || INSTAGRAM_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group relative aspect-square overflow-hidden bg-black"
      onClick={() =>
        trackCTAClick(
          caption.slice(0, 80) || `Instagram ${post.id}`,
          'home_instagram_feed',
          post.permalink || INSTAGRAM_PROFILE_URL
        )
      }
    >
      {isVideo && playVideo ? (
        <video
          ref={videoRef}
          src={post.videoUrl!}
          poster={post.imageUrl}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={post.imageUrl}
          alt={caption}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallback === '1') return;
            img.dataset.fallback = '1';
            img.src = '/local-images/pro-hero-main.webp';
          }}
        />
      )}
      {isVideo ? (
        <span className="absolute top-2 right-2 text-white drop-shadow-md">
          <i className="ri-clapperboard-line text-lg" />
        </span>
      ) : null}
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
      {postedAt ? (
        <span className="absolute bottom-2 left-2 text-[10px] font-medium text-white/90 drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          {postedAt}
        </span>
      ) : null}
    </a>
  );
}

export default function InstagramFeedSection() {
  const [posts, setPosts] = useState<InstagramFeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(false);
  const [postCount, setPostCount] = useState<number | null>(null);

  const loadFeed = useCallback(async () => {
    const res = await fetch('/api/instagram/feed', { cache: 'no-store' });
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
        const data = await loadFeed();
        if (!cancelled) applyFeed(data);
      } catch {
        /* akış yüklenemezse boş kalır */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const refreshId = window.setInterval(() => {
      loadFeed()
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
        <div className="max-w-md mx-auto mb-8 text-center md:max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Instagram &amp; Güncel Kampanyalar</h2>
          <p className="text-white/60">@{INSTAGRAM_HANDLE} hesabımızdaki güncel paylaşımlar</p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Profil başlığı */}
          <div className="px-4 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shrink-0">
                <img
                  src="/local-images/brand-favicon.webp"
                  alt="Hacettepe İşitme"
                  className="w-full h-full rounded-full object-cover bg-white border-2 border-white"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark text-sm truncate">{INSTAGRAM_HANDLE}</p>
                <p className="text-xs text-gray-500 truncate">Hacettepe İşitme Cihazları · Samsun</p>
                <div className="flex gap-4 mt-2 text-center">
                  <div>
                    <p className="font-bold text-sm text-brand-dark">{postCount ?? posts.length}</p>
                    <p className="text-[10px] text-gray-400 uppercase">gönderi</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-brand-dark">—</p>
                    <p className="text-[10px] text-gray-400 uppercase">takipçi</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-brand-dark">—</p>
                    <p className="text-[10px] text-gray-400 uppercase">takip</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-600 leading-relaxed">
              Samsun&apos;da ücretsiz işitme testi, cihaz deneme ve SGK danışmanlığı. Vista · A&amp;M · Nitro · Pediatrik Grup
            </p>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-brand-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#008f7f] transition-colors"
              onClick={() => trackCTAClick('Instagram Profili', 'home_instagram', INSTAGRAM_PROFILE_URL)}
            >
              <i className="ri-instagram-line" />
              Profili Aç
            </a>
          </div>

          {/* Sekmeler */}
          <div className="flex border-b border-gray-100 text-gray-400 text-xs">
            <span className="flex-1 flex items-center justify-center gap-1 py-3 border-b-2 border-brand-dark text-brand-dark font-semibold">
              <i className="ri-grid-line text-base" />
              Gönderiler
            </span>
            <span className="flex-1 flex items-center justify-center gap-1 py-3">
              <i className="ri-clapperboard-line text-base" />
              Reels
            </span>
          </div>

          {/* Izgara */}
          {loading ? (
            <GridSkeleton />
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-0.5 bg-gray-100">
              {posts.map((post) => (
                <InstagramGridTile key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-gray-500">
                Instagram akışı yüklenemedi. Güncel paylaşımlar için profili ziyaret edin.
              </p>
            </div>
          )}

          {!loading && live ? (
            <p className="px-4 py-3 text-[11px] text-gray-400 text-center border-t border-gray-100">
              {postCount ?? posts.length} gönderi · {live ? 'canlı akış' : 'önbellek'}
            </p>
          ) : null}
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
    </section>
  );
}
