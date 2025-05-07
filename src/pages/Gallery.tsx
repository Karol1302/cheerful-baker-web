
import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import CategoryCard from "@/components/ui/CategoryCard";
import { getAllGalleryCategories } from "@/utils/configLoader";

const Gallery = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const categories = getAllGalleryCategories();

  // Function to determine if we should show a collage or a single image
  const shouldShowCollage = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category && category.images && category.images.length >= 4;
  };

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const hasEnoughImages = category.images && category.images.length >= 4;
            
            return (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                description={category.description}
                thumbnail={category.thumbnail}
                index={index}
                collageImages={hasEnoughImages ? category.images.slice(0, 4).map(img => img.imageUrl) : []}
                useCollage={hasEnoughImages}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
