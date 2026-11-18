
import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import SetThumbnail from './SetThumbnail';

interface SetRowProps {
  id: string;
  name: string;
  description: string;
  price: string;
  thumbnail: string;
}

const SetRow = ({
  id,
  name,
  description,
  price,
  thumbnail
}: SetRowProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({ rootMargin: '200px 0px' });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <Link
        to={`/sets/${id}`}
        className="flex flex-col sm:flex-row items-center bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="w-full shrink-0 max-sm:relative max-sm:aspect-[4/3] sm:h-28 sm:w-32 md:h-32 md:w-40">
          <SetThumbnail
            thumbnail={thumbnail}
            alt={name}
            sizes="(min-width: 768px) 160px, (min-width: 640px) 128px, calc(100vw - 34px)"
            className="h-full w-full object-cover max-sm:absolute max-sm:inset-0"
          />
        </div>
        <div className="flex min-w-0 flex-grow p-4 max-sm:w-full max-sm:items-start max-sm:gap-3 sm:items-center">
          <div className="min-w-0 flex-grow">
            <h3 className="font-medium text-lg sm:text-xl text-gingerbread mb-1">{name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          <div className="shrink-0 whitespace-nowrap font-medium text-gingerbread-dark sm:ml-4">
            {price}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SetRow;
