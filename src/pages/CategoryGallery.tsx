
import { useParams, useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ImageGallery from "@/components/ui/ImageGallery";
import { getGalleryCategory } from "@/utils/configLoader";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";

const CategoryGallery = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { elementRef, isVisible } = useIntersectionObserver();
  
  const category = getGalleryCategory(categoryId || "");
  
  useEffect(() => {
    if (!category) {
      navigate("/gallery", { replace: true });
    }
  }, [category, navigate]);

  if (!category) {
    return null;
  }

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <button 
          onClick={() => navigate("/gallery")}
          className="flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          <span>Powrót do kategorii</span>
        </button>
        
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl font-bold mb-4 text-center">{category.name}</h1>
          <p className="text-muted-foreground text-pretty text-center">
            {category.description}
          </p>
        </div>
        
        <ImageGallery items={category.images} />
      </div>
    </div>
  );
};

export default CategoryGallery;
