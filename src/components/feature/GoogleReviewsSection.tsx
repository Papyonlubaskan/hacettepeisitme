import { useCallback, useEffect, useRef, useState } from 'react';
import type { GoogleReview, GoogleReviewsResponse } from '@/types/googleReviews';

const FEED_CARD_COUNT = 5;
const REVIEW_REFRESH_MS = 15 * 60 * 1000;

type Props = {
  subtitle?: string;
};

function ReviewSkeleton() {
  return (
    <div
      data-review-skeleton
      className="min-w-[280px] sm:min-w-[320px] shrink-0 snap-start bg-white rounded-2xl p-6 animate-pulse"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-2 bg-gray-100 rounded w-1/4" />
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-3 w-3 rounded bg-gray-100" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${rating} yıldız`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i
          key={i}
          className={`ri-star-fill text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.authorName.trim().charAt(0).toUpperCase() || 'G';

  return (
    <article className="min-w-[280px] sm:min-w-[320px] shrink-0 snap-start bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        {review.authorPhotoUrl ? (
          <img
            src={review.authorPhotoUrl}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover bg-gray-100"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
            <span className="text-sm font-bold text-brand-accent">{initial}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-bold text-brand-dark truncate">{review.authorName}</p>
          <p className="text-xs text-gray-400">{review.relativeTime}</p>
        </div>
      </div>
      <StarRow rating={review.rating} />
      <p className="text-sm text-gray-500 leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
    </article>
  );
}

export default function GoogleReviewsSection({
  subtitle = 'Google işletme değerlendirmeleri',
}: Props) {
  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState<GoogleReviewsResponse | null>(null);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);

  const pauseAutoScroll = useCallback(() => {
    setPaused(true);
    if (resumeTimerRef.current != null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimerRef.current = null;
    }, 4000);
  }, []);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('article, [data-review-skeleton]');
    const step = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
    pauseAutoScroll();
  }, [pauseAutoScroll]);

  const loadReviews = useCallback(async () => {
    const res = await fetch('/api/google/reviews', { cache: 'no-store' });
    return (await res.json()) as GoogleReviewsResponse;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await loadReviews();
        if (!cancelled) setPayload(data);
      } catch {
        if (!cancelled) {
          setPayload({ ok: false, source: 'unavailable', reviews: [] });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const refreshId = window.setInterval(() => {
      loadReviews()
        .then((data) => {
          if (!cancelled) setPayload(data);
        })
        .catch(() => {});
    }, REVIEW_REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(refreshId);
    };
  }, [loadReviews]);

  const reviews = payload?.reviews ?? [];
  const mapsUrl = payload?.mapsUrl;
  const rating = payload?.rating;
  const reviewCount = payload?.reviewCount;
  useEffect(() => {
    const track = trackRef.current;
    if (!track || reviews.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frameId = 0;
    const tick = () => {
      if (!paused) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll > 0) {
          track.scrollLeft += 0.7;
          if (track.scrollLeft >= maxScroll) {
            track.scrollLeft = 0;
          }
        }
      }
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [paused, reviews]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current != null) {
        window.clearTimeout(resumeTimerRef.current);
      }
    },
    []
  );

  return (
    <section className="py-20 md:py-28 bg-brand-cream">
      <div className="w-full min-w-0 px-6 lg:px-12">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-3">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-gray-500">{subtitle}</p>
          {!loading && payload?.source === 'google' && rating != null && (
            <p className="mt-3 text-sm text-brand-dark">
              <span className="inline-flex items-center gap-1 font-semibold">
                <i className="ri-google-fill text-brand-accent" />
                Google
              </span>
              <span className="mx-2 text-gray-300">·</span>
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span className="text-gray-400"> / 5</span>
              {reviewCount != null && (
                <span className="text-gray-500"> ({reviewCount} değerlendirme)</span>
              )}
            </p>
          )}
        </div>

        <div className="relative min-w-0 -mx-6 lg:-mx-12">
          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-md transition hover:bg-white sm:h-10 sm:w-10"
            aria-label="Önceki yorum"
            onClick={() => scrollByCard(-1)}
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-md transition hover:bg-white sm:h-10 sm:w-10"
            aria-label="Sonraki yorum"
            onClick={() => scrollByCard(1)}
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
          <div
            ref={trackRef}
            className="flex w-full min-w-0 gap-4 overflow-x-auto overscroll-x-contain px-6 lg:px-12 pb-2 scroll-smooth snap-x snap-mandatory touch-pan-x"
            aria-label="Google yorum akışı"
            onScroll={pauseAutoScroll}
            onPointerDown={pauseAutoScroll}
            onWheel={pauseAutoScroll}
          >
            {loading
              ? Array.from({ length: FEED_CARD_COUNT }, (_, i) => (
                  <ReviewSkeleton key={`review-skel-${i}`} />
                ))
              : reviews.length > 0
                ? reviews.map((review) => <ReviewCard key={review.id} review={review} />)
                : (
                    <div className="min-w-full px-2">
                      <div className="max-w-xl mx-auto text-center bg-white rounded-2xl p-8 border border-gray-100">
                        <p className="text-sm text-gray-500">
                          Google yorumları şu an yüklenemedi. Güncel değerlendirmeleri Google
                          Haritalar üzerinden görüntüleyebilirsiniz.
                        </p>
                      </div>
                    </div>
                  )}
          </div>
        </div>

        {mapsUrl && (
          <div className="text-center mt-8">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-accent transition-colors"
            >
              <i className="ri-google-fill" />
              <span>Google&apos;daki tüm yorumları görüntüle</span>
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
