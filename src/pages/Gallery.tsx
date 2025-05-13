
import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import CategoryCard from "@/components/ui/CategoryCard";
import { getSortedCategories } from "@/utils/configLoader";
import type { Category } from "@/utils/categoriesLoader";

const Gallery = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const sortedCategories = await getSortedCategories();
        setCategories(sortedCategories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">Galeria</h1>
          <p className="text-muted-foreground text-pretty">
            Przeglądaj moją kolekcję ręcznie wykonanych pierniczków. Wybierz kategorię, aby zobaczyć więcej.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const hasEnoughImages = category.images && category.images.length >= 4;
              const imageUrls = hasEnoughImages 
                ? category.images.slice(0, 4).map(img => img.url) 
                : [];
              
              return (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  thumbnail={category.thumbnail}
                  index={index}
                  useCollage={hasEnoughImages}
                  current={category.current}
                  collageImages={imageUrls}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
