
import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ImageGallery from "@/components/ui/ImageGallery";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Gallery = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allGalleryItems = [
    {
      id: 1,
      title: "Pierniczki z lukrem",
      description: "Tradycyjne pierniczki ozdobione białym lukrem, idealne na świąteczny stół.",
      imageUrl: "https://images.unsplash.com/photo-1607920592519-ab0664cd8c39?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Kolekcja świąteczna",
      description: "Zestaw pierniczków w kształcie gwiazdek, choinek i bałwanków.",
      imageUrl: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?q=80&w=2014&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Pierniki z przyprawami",
      description: "Puszyste pierniki z cynamonem, goździkami i imbirem, ręcznie zdobione.",
      imageUrl: "https://images.unsplash.com/photo-1608877904943-f546cee61cb1?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Domek z piernika",
      description: "Tradycyjny domek z piernika, ozdobiony kolorowym lukrem i posypkami.",
      imageUrl: "https://images.unsplash.com/photo-1544285231-ae61a4567a75?q=80&w=1960&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Pierniczki świąteczne",
      description: "Klasyczne pierniczki w kształcie reniferów i Mikołajów, idealne na prezent.",
      imageUrl: "https://images.unsplash.com/photo-1576618148500-a84b370cad53?q=80&w=2075&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Lukrowane ciasteczka",
      description: "Delikatnie przyprawione pierniki z artystycznie wykonanymi wzorami.",
      imageUrl: "https://images.unsplash.com/photo-1607920592529-3b1e314a27a3?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Pierniki na choinkę",
      description: "Ozdobne pierniczki do zawieszenia na choince, z otworami na wstążkę.",
      imageUrl: "https://images.unsplash.com/photo-1513267598994-9e3b4052dc0c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Świąteczne słodkości",
      description: "Różnorodne kształty i wzory pierników, każdy starannie ręcznie przyozdobiony.",
      imageUrl: "https://images.unsplash.com/photo-1482854256601-fb51a5d0fded?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 9,
      title: "Mini pierniczki",
      description: "Małe pierniczki z gwiazdkami i płatkami śniegu, idealne do kawy.",
      imageUrl: "https://images.unsplash.com/photo-1480953251531-1dd49ad1818f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 10,
      title: "Zestaw świąteczny",
      description: "Komplet pierników w ekologicznym opakowaniu, gotowy do podarowania.",
      imageUrl: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 11,
      title: "Pierniki z polewą",
      description: "Wykwintne pierniki z czekoladową polewą i orzechami, dla koneserów.",
      imageUrl: "https://images.unsplash.com/photo-1575468131771-cb23a4f6a3da?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 12,
      title: "Świąteczna kolekcja",
      description: "Pierniki w różnych kształtach z tradycyjnymi świątecznymi motywami.",
      imageUrl: "https://images.unsplash.com/photo-1639610806629-84192417bcb2?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allGalleryItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allGalleryItems.length / itemsPerPage);

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
            Przeglądaj moją kolekcję ręcznie wykonanych pierniczków. Kliknij na dowolne zdjęcie, aby zobaczyć je w powiększeniu.
          </p>
        </div>
        
        <ImageGallery items={currentItems} />

        {/* Pagination */}
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink 
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
