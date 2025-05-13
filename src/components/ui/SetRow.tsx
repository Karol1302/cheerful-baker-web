
import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ArrowRight } from 'lucide-react';
import { Badge } from './badge';

interface SetRowProps {
  id: string;
  name: string;
  description: string;
  price: string;
  thumbnail: string;
  index: number;
  current?: boolean;
}

const SetRow = ({ 
  id, 
  name, 
  description, 
  price,
  thumbnail, 
  index, 
  current = false,
}: SetRowProps) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`w-full group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link to={`/sets/${id}`} className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-24 md:w-40 h-40 sm:h-auto overflow-hidden">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {current && (
            <div className="absolute top-2 right-2 sm:hidden">
              <Badge variant="default" className="bg-gingerbread text-white">
                Aktualna oferta
              </Badge>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 flex flex-col sm:flex-row items-start sm:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground text-lg group-hover:text-gingerbread transition-colors">
                {name}
              </h3>
              {current && (
                <Badge variant="default" className="hidden sm:inline-flex bg-gingerbread text-white">
                  Aktualna oferta
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2 max-w-xl">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between w-full sm:w-auto mt-3 sm:mt-0">
            <p className="font-medium text-gingerbread text-lg sm:mr-8">{price}</p>
            <span className="text-gingerbread">
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SetRow;
