
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price?: string;
  index: number;
}

const ProductCard = ({ title, description, imageUrl, price, index }: ProductCardProps) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 space-y-2">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-gingerbread transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        {price && (
          <p className="font-medium text-gingerbread pt-2">
            {price}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
