import { absoluteUrl } from '@/lib/siteUrl';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
}

export default function Seo({ title, description, path }: SeoProps) {
  const canonical = path ? absoluteUrl(path) : undefined;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="tr_TR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
    </>
  );
}
