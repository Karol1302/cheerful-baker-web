
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
  // Props for external control/lightbox mode
  isLightbox?: boolean;
  startIndex?: number;
  onClose?: () => void;
  onImageClick?: (index: number) => void;
}

const ImageGallery = ({ 
  items, 
  isLightbox = false, // Domyślnie tryb siatki
  startIndex = 0,     // Domyślnie start z indeksu 0
  onClose,            // Funkcja zamykająca Lightboxa z zewnątrz (używana w SetDetail)
  onImageClick        // Handler kliknięcia (używany w SetDetail)
}: ImageGalleryProps) => {
  
  // W trybie Lightboxa używamy stanu do śledzenia aktualnie wybranego zdjęcia, 
  // inicjujemy go na podstawie startIndex.
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(isLightbox ? startIndex : 0);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(isLightbox ? items[startIndex] : null);
  
  // W trybie Lightboxa to ten prop mówi nam, że jest otwarty. W trybie siatki - selectedImage.
  const isLightboxOpen = isLightbox || selectedImage !== null;

  const { elementRef, isVisible } = useIntersectionObserver();

  // Track touch for swipe detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Required minimum distance in px to be considered a swipe
  const minSwipeDistance = 50;

  // Efekt do obsługi początkowego stanu Lightboxa w trybie zewnętrznym
  useEffect(() => {
    if (isLightbox && items.length > 0) {
      document.body.style.overflow = 'hidden';
      // Synchronizacja stanów na podstawie propsów zewnętrznych
      setSelectedImage(items[startIndex]);
      setInternalSelectedIndex(startIndex);
    }
  }, [isLightbox, items, startIndex]);


  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    const index = items.findIndex(i => i.id === item.id);
    setInternalSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  // Ujednolicona funkcja zamykania
  const handleClose = () => {
    if (isLightbox && onClose) {
        onClose(); // Użyj zewnętrznej funkcji onClose w trybie Lightboxa (dla SetDetail)
    } else {
        setSelectedImage(null); // Użyj wewnętrznej w trybie siatki (gdy jest używana jako samodzielna galeria)
    }
    document.body.style.overflow = 'auto';
  };

  const navigateToImage = useCallback((direction: 'next' | 'prev') => {
    if (!isLightboxOpen) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (internalSelectedIndex + 1) % items.length;
    } else {
      newIndex = (internalSelectedIndex - 1 + items.length) % items.length;
    }
    
    setInternalSelectedIndex(newIndex);
    setSelectedImage(items[newIndex]);
  }, [isLightboxOpen, internalSelectedIndex, items]);

  // Handle keyboard navigation
useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (event.key === 'ArrowRight') {
        navigateToImage('next');
      } else if (event.key === 'ArrowLeft') {
        navigateToImage('prev');
      } else if (event.key === 'Escape') {
        handleClose();
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
    // Ograniczenie liczby miniaturek w trybie siatki (obok głównego zdjęcia)
  const maxVisibleThumbnails = 6;
  const isGridMode = !isLightbox;

  const visibleItems = isGridMode
    ? items.slice(0, maxVisibleThumbnails)
    : items;

  const extraCount = isGridMode
    ? Math.max(0, items.length - maxVisibleThumbnails)
    : 0;

return (
  <>
      {!isLightbox && ( 
        <div 
          className="flex justify-end w-full"
        >
          <div 
            ref={elementRef as React.RefObject<HTMLDivElement>}
            // klucz: odwracamy kierunek układu grida (zaczynamy od prawej)
            style={{ direction: 'rtl' }}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full transition-opacity duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {visibleItems.map((item, index) => {
              const isLastVisible = index === visibleItems.length - 1;
              const showOverlayCount = extraCount > 0 && isLastVisible && isGridMode;

              return (
                <div
                  key={item.id}
                  // a tu przywracamy normalny kierunek dla zawartości
                  dir="ltr"
                  className={`cursor-pointer group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${
                    isVisible 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => {
                    if (onImageClick) {
                      onImageClick(index);
                    } else {
                      openLightbox(item);
                    }
                  }}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {showOverlayCount && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          +{extraCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox - reszta bez zmian */}

      {isLightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={handleClose}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
            onClick={handleClose}
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
              {/* {selectedImage.description && (
                <p className="text-gray-300 mt-2">{selectedImage.description}</p>
              )} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
