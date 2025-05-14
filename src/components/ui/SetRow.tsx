
import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SetRowProps {
  id: string;
  name: string;
  description: string;
  price: string;
  thumbnail: string;
  index: number;
}

const SetRow = ({
  id,
  name,
  description,
  price,
  thumbnail,
  index
}: SetRowProps) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link
        to={`/sets/${id}`}
        className="flex flex-col sm:flex-row items-center bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="w-full sm:w-32 md:w-40 h-40 sm:h-28 md:h-32 flex-shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}${thumbnail}`}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow p-4 flex flex-col sm:flex-row items-center">
          <div className="flex-grow text-center sm:text-left">
            <h3 className="font-medium text-lg sm:text-xl text-gingerbread mb-1">{name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4 font-medium text-gingerbread-dark">
            {price}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SetRow;
