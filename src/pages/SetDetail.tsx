import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import { loadSets } from "@/utils/setsLoader";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GiftSet } from "@/utils/setsLoader";
import { getAssetUrl } from "@/utils/url";

const SetDetail = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [sets, setSets] = useState<GiftSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  // Stan do zarządzania otwartą galerią (lightboxem)
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number | null>(null);

  // Funkcje do kontroli lightboxa
  const openGallery = (index: number) => {
    setCurrentGalleryIndex(index);
  };

  const closeGallery = () => {
    setCurrentGalleryIndex(null);
  };

  // Trigger animation on mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Load the offer in the same order used on the offer page.
  useEffect(() => {
    let active = true;
    const loadOffer = async () => {
      try {
        const products = await loadSets();
        if (active) setSets(products);
      } catch (error) {
        console.error("Failed to load set:", error);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadOffer();
    return () => { active = false; };
  }, []);

  const currentIndex = sets.findIndex((product) => product.id === setId);
  const set = sets[currentIndex];
  const previousSet = sets[currentIndex - 1];
  const nextSet = sets[currentIndex + 1];

  useEffect(() => {
    if (!loading && currentIndex === -1) navigate("/sets", { replace: true });
  }, [loading, currentIndex, navigate]);

  useEffect(() => {
    setCurrentGalleryIndex(null);
    return () => { document.body.style.overflow = ''; };
  }, [setId]);

  if (loading) {
    return (
      <div className="pt-28 pb-24 px-6 flex justify-center">
        <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!set) {
    return null;
  }

  // Prepare gallery items
  const galleryItems = set.images.map((img, index) => ({
    id: index + 1,
    title: img.description || `Image ${index + 1}`,
    description: img.description || "",
    imageUrl: getAssetUrl(img.url)
  }));

  // Single main image (first image)
  const mainImage = galleryItems[0];
  // Additional images
  const extraImages = galleryItems.slice(1);

  const productLink = (product: GiftSet | undefined, direction: "previous" | "next") => {
    const previous = direction === "previous";
    const label = previous ? "Poprzedni produkt" : "Następny produkt";
    const className = `inline-flex w-full items-center justify-center gap-1 rounded-lg border px-3 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gingerbread ${
      product ? "border-gingerbread/30 bg-white text-gingerbread hover:bg-cream" : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
    }`;
    const content = <>{previous && <ChevronLeft size={18} aria-hidden="true" />}<span>{label}</span>{!previous && <ChevronRight size={18} aria-hidden="true" />}</>;
    return product ? (
      <Link to={`/sets/${product.id}`} className={className} aria-label={`${label}: ${product.name}`}>{content}</Link>
    ) : (
      <button type="button" disabled className={className}>{content}</button>
    );
  };

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <button
          onClick={() => navigate("/sets")}
          className="flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          <span>Powrót do oferty</span>
        </button>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 transition-all duration-700 ${
            animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left column: title, price, description + thumbnails */}
          <div className="flex flex-col gap-6 text-left">
            <h1 className="text-3xl md:text-4xl font-bold">
              {set.name}
            </h1>
            <span className="text-2xl font-bold text-gingerbread block">
              {set.price}
            </span>

            {/* Opis – lekko ograniczamy wysokość, żeby zrobić miejsce na miniatury */}
            <div className="text-muted-foreground text-pretty md:max-h-64 md:overflow-auto">
              {set.description.split("\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Miniatury obok głównego zdjęcia – pod opisem, wyrównane do prawej */}
            {extraImages.length > 0 && (
              <div className="mt-4 flex justify-end">
                <ImageGallery 
                  items={extraImages} 
                  onImageClick={(index) => openGallery(index + 1)}
                />
              </div>
            )}
          </div>

          {/* Right column: main image */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => openGallery(0)} // Otwórz pełną galerię zaczynając od pierwszego zdjęcia (index 0)
              className="w-full h-auto p-0 border-none bg-transparent cursor-pointer"
            >
              <img
                src={mainImage.imageUrl}
                alt={mainImage.title}
                className="w-full h-auto object-cover rounded-lg shadow-md hover:opacity-90 transition-opacity"
              />
            </button>
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-3 max-w-4xl mx-auto" aria-label="Nawigacja między produktami">
          {productLink(previousSet, "previous")}
          {productLink(nextSet, "next")}
        </nav>

        {currentGalleryIndex !== null && (
          <ImageGallery 
            items={galleryItems} // Używamy pełnej listy zdjęć
            startIndex={currentGalleryIndex}
            onClose={closeGallery}
            isLightbox={true}
          />
        )}
      </div>
    </div>
  );
};

export default SetDetail;
