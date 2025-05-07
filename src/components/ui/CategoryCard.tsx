
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  index: number;
}

const CategoryCard = ({ id, name, description, thumbnail, index }: CategoryCardProps) => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`cursor-pointer group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link to={`/gallery/${id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
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
