export type InstagramFeedPost = {
  id: string;
  imageUrl: string;
  permalink: string;
  title: string;
  mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp?: string | null;
};

export type InstagramFeedResponse = {
  ok: boolean;
  source: 'instagram' | 'fallback';
  postCount?: number;
  profileUrl?: string;
  posts: InstagramFeedPost[];
};
