
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Badge } from './badge';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  index: number;
  useCollage?: boolean;
  current?: boolean;
  collageImages?: string[];
}

const CategoryCard = ({ 
  id, 
  name, 
  description, 
  thumbnail, 
  index, 
  useCollage = false,
  current = false,
  collageImages = [] 
}: CategoryCardProps) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`cursor-pointer group overflow-hidden rounded-lg ${
        current ? 'ring-2 ring-gingerbread shadow-md' : 'shadow-sm hover:shadow-md'
      } transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link to={`/gallery/${id}`}>
        <div className="relative aspect-square overflow-hidden">
          {useCollage && collageImages && collageImages.length >= 4 ? (
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              {collageImages.slice(0, 4).map((imgUrl, i) => (
                <div key={i} className="overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`${name} image ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <img
              src={thumbnail}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {current && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-gingerbread text-white">
                Aktualna oferta
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4 bg-white">
          <h3 className="font-medium text-foreground group-hover:text-gingerbread transition-colors">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
