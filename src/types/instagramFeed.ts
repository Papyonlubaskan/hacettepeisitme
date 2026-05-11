export type InstagramFeedPost = {
  id: string;
  imageUrl: string;
  permalink: string;
  title: string;
};

export type InstagramFeedResponse = {
  ok: boolean;
  source: 'instagram' | 'fallback';
  posts: InstagramFeedPost[];
};
