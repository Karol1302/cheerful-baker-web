
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import SetThumbnail from './SetThumbnail';

interface SetCardProps {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  index: number;
  price?: string;
  showDescriptionOnMobile?: boolean;
}

const SetCard = ({ 
  id, 
  name, 
  description, 
  thumbnail, 
  index,
  price,
  showDescriptionOnMobile = false,
}: SetCardProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({ rootMargin: '200px 0px' });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-300 w-full ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-2'
      }`}
      style={{ transitionDelay: `${Math.min(index * 30, 90)}ms` }}
    >
      <Link to={`/sets/${id}`} className="block h-full">
        <div className="group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
          <div className="relative aspect-square overflow-hidden">
            <SetThumbnail
              thumbnail={thumbnail}
              alt={name}
              sizes="(min-width: 1264px) 368px, (min-width: 600px) calc((100vw - 160px) / 3), (min-width: 340px) calc((100vw - 144px) / 2), calc(100vw - 112px)"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-2 md:p-4 bg-white">
            <h3 className="font-medium text-foreground group-hover:text-gingerbread transition-colors">
              {name}
            </h3>
            {description && (
              <p className={`${showDescriptionOnMobile ? '' : 'hidden md:block'} text-sm text-muted-foreground mt-1 line-clamp-2`}>
                {description}
              </p>
            )}
            {price && <p className="mt-2 font-medium text-gingerbread-dark">{price}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SetCard;
