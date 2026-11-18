import offerThumbnails from '@/config/offerThumbnails.json';
import { getAssetUrl } from '@/utils/url';

interface ThumbnailVariant {
  url: string;
  width: number;
}

const thumbnails: Partial<Record<string, ThumbnailVariant[]>> = offerThumbnails;

interface SetThumbnailProps {
  thumbnail: string;
  alt: string;
  sizes: string;
  className: string;
}

const SetThumbnail = ({ thumbnail, alt, sizes, className }: SetThumbnailProps) => {
  const variants = thumbnails[thumbnail];
  const srcSet = variants?.map(({ url, width }) => `${getAssetUrl(url)} ${width}w`).join(', ');
  const fallback = variants?.[variants.length - 1]?.url ?? thumbnail;

  return (
    <img
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      sizes={srcSet ? `auto, ${sizes}` : undefined}
      srcSet={srcSet}
      src={getAssetUrl(fallback)}
    />
  );
};

export default SetThumbnail;
