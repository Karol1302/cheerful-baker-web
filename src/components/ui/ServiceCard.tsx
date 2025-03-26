
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard = ({ title, description, icon, index }: ServiceCardProps) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 transform border border-transparent hover:border-gingerbread/10 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-gingerbread/10 flex items-center justify-center text-gingerbread mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
