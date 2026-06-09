import { absoluteUrl } from '@/lib/siteUrl';
import {
  SITE_LOCALE,
  SITE_NAME,
  SITE_DEFAULT_KEYWORDS,
  defaultOgImageUrl,
} from '@/lib/siteSeo';

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export default function Seo({
  title,
  description,
  path,
  image,
  type = 'website',
  noindex = false,
  keywords,
  publishedTime,
  modifiedTime,
  author,
  section,
}: SeoProps) {
  const canonical = path ? absoluteUrl(path) : absoluteUrl('/');
  const ogImage = image ? (image.startsWith('http') ? image : absoluteUrl(image)) : defaultOgImageUrl();
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const metaKeywords = keywords || SITE_DEFAULT_KEYWORDS;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE_NAME} />
      <meta name="language" content="Turkish" />
      <meta name="geo.region" content="TR-55" />
      <meta name="geo.placename" content="Samsun" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="tr" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {type === 'article' && publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {type === 'article' && modifiedTime ? (
        <meta property="article:modified_time" content={modifiedTime} />
      ) : null}
      {type === 'article' && author ? <meta property="article:author" content={author} /> : null}
      {type === 'article' && section ? <meta property="article:section" content={section} /> : null}
    </>
  );
}
