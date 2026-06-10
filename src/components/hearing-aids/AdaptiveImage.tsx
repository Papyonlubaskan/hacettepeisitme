import { useState } from 'react';

interface AdaptiveImageProps {
  src: string;
  alt: string;
  className?: string;
  maxWidthClass?: string;
}

export default function AdaptiveImage({
  src,
  alt,
  className = '',
  maxWidthClass = 'max-w-md',
}: AdaptiveImageProps) {
  const [ratio, setRatio] = useState('4 / 3');

  return (
    <div
      className={`relative mx-auto w-full overflow-hidden rounded-2xl bg-gray-100 ${maxWidthClass} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain"
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            setRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
          }
        }}
      />
    </div>
  );
}
