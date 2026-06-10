export type InstagramFeedPost = {
  id: string;
  imageUrl: string;
  videoUrl?: string | null;
  permalink: string;
  title: string;
  mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp?: string | null;
};

export type InstagramFeedResponse = {
  ok: boolean;
  source: 'instagram' | 'fallback' | 'unavailable';
  postCount?: number;
  profileUrl?: string;
  posts: InstagramFeedPost[];
};
