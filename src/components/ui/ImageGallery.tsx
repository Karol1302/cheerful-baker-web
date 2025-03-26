
import { useState } from 'react';
import { X } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
}

interface ImageGalleryProps {
  items: GalleryItem[];
}

const ImageGallery = ({ items }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const { elementRef, isVisible } = useIntersectionObserver();

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`cursor-pointer group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
              isVisible 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => openLightbox(item)}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-medium text-foreground group-hover:text-gingerbread transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <div 
            className="max-w-4xl w-full max-h-[80vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="mt-4 text-white">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-gray-300 mt-2">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
