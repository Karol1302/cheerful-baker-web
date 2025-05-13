
import { useParams, useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ImageGallery from "@/components/ui/ImageGallery";
import { getCategory } from "@/utils/configLoader";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Category } from "@/utils/categoriesLoader";
import { Badge } from "@/components/ui/badge";

const CategoryGallery = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { elementRef, isVisible } = useIntersectionObserver();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategory = async () => {
      setLoading(true);
      try {
        if (categoryId) {
          const categoryData = await getCategory(categoryId);
          if (categoryData) {
            setCategory(categoryData);
          } else {
            navigate("/gallery", { replace: true });
          }
        }
      } catch (error) {
        console.error("Failed to load category:", error);
        navigate("/gallery", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    
    loadCategory();
  }, [categoryId, navigate]);

  if (loading) {
    return (
      <div className="pt-28 pb-24 px-6 flex justify-center">
        <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!category) {
    return null;
  }

  // Convert category images to gallery items format
  const galleryItems = category.images.map((img, index) => ({
    id: index + 1,
    title: img.description || `Image ${index + 1}`,
    description: img.description || "",
    imageUrl: img.url
  }));

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
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-center">{category.name}</h1>
            {category.current && (
              <Badge variant="outline" className="bg-gingerbread text-white">
                Aktualna oferta
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-pretty text-center">
            {category.description}
          </p>
        </div>
        
        <ImageGallery items={galleryItems} />
      </div>
    </div>
  );
};

export default CategoryGallery;
