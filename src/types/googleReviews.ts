export type GoogleReview = {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
  profileUrl?: string;
};

export type GoogleReviewsResponse = {
  ok: boolean;
  source: 'google' | 'unavailable';
  rating?: number;
  reviewCount?: number;
  mapsUrl?: string;
  reviews: GoogleReview[];
};
