
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { elementRef, isVisible } = useIntersectionObserver();

  // Track touch for swipe detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Required minimum distance in px to be considered a swipe
  const minSwipeDistance = 50;

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    const index = items.findIndex(i => i.id === item.id);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateToImage = useCallback((direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % items.length;
    } else {
      newIndex = (currentIndex - 1 + items.length) % items.length;
    }
    
    setCurrentIndex(newIndex);
    setSelectedImage(items[newIndex]);
  }, [selectedImage, currentIndex, items]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (event.key === 'ArrowRight') {
        navigateToImage('next');
      } else if (event.key === 'ArrowLeft') {
        navigateToImage('prev');
      } else if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, navigateToImage]);

  // Handle touch events for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      navigateToImage('next');
    } else if (isRightSwipe) {
      navigateToImage('prev');
    }
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
            {/* Caption removed from grid view as requested */}
          </div>
        ))}
      </div>

      {/* Lightbox - Captions only shown here */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          {/* Left arrow navigation */}
          <button
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              navigateToImage('prev');
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          
          {/* Right arrow navigation */}
          <button
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              navigateToImage('next');
            }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
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
