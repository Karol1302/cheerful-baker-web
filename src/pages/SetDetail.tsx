
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ImageGallery from "@/components/ui/ImageGallery";
import { getSet } from "@/utils/setsLoader";
import { ChevronLeft } from "lucide-react";
import { GiftSet } from "@/utils/setsLoader";

const SetDetail = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const { elementRef, isVisible } = useIntersectionObserver();
  const [set, setSet] = useState<GiftSet | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadSet = async () => {
      setLoading(true);
      try {
        if (setId) {
          const setData = await getSet(setId);
          if (setData) {
            setSet(setData);
          } else {
            navigate("/sets", { replace: true });
          }
        }
      } catch (error) {
        console.error("Failed to load set:", error);
        navigate("/sets", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    
    loadSet();
  }, [setId, navigate]);

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

  // Convert set images to gallery items format
  const galleryItems = set.images.map((img, index) => ({
    id: index + 1,
    title: img.description || `Image ${index + 1}`,
    description: img.description || "",
    imageUrl: img.url
  }));

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <button 
          onClick={() => navigate("/sets")}
          className="flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          <span>Powrót do zestawów</span>
        </button>
        
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">{set.name}</h1>
          </div>
          
          <div className="flex justify-center mb-6">
            <span className="text-2xl font-bold text-gingerbread">{set.price}</span>
          </div>
          
          <div className="text-muted-foreground text-pretty text-center mb-12 bg-cream p-6 rounded-lg">
            {set.description.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        <ImageGallery items={galleryItems} />
      </div>
    </div>
  );
};

export default SetDetail;
