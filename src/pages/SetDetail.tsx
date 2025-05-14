import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import { getSet } from "@/utils/setsLoader";
import { ChevronLeft } from "lucide-react";
import { GiftSet } from "@/utils/setsLoader";

const SetDetail = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [set, setSet] = useState<GiftSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Load set data
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

  // Prepare gallery items
  const galleryItems = set.images.map((img, index) => ({
    id: index + 1,
    title: img.description || `Image ${index + 1}`,
    description: img.description || "",
    imageUrl: process.env.PUBLIC_URL + img.url
  }));

  // Single main image (first image)
  const mainImage = galleryItems[0];
  // Additional images
  const extraImages = galleryItems.slice(1);

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

        {/* Grid layout: left side text, right side image */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16 transition-all duration-700 ${
            animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left column: title, price, description */}
          <div className="space-y-6 text-left">
            <h1 className="text-3xl md:text-4xl font-bold">
              {set.name}
            </h1>
            <span className="text-2xl font-bold text-gingerbread block">
              {set.price}
            </span>
            <div className="text-muted-foreground text-pretty">
              {set.description.split("\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right column: main image */}
          <div className="flex items-center justify-center">
            <img
              src={mainImage.imageUrl}
              alt={mainImage.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Additional images below grid */}
        {extraImages.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <ImageGallery items={extraImages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SetDetail;
