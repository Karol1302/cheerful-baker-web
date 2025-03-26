
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ImageGallery from "@/components/ui/ImageGallery";

const Gallery = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  const galleryItems = [
    {
      id: 1,
      title: "Handcrafted Wooden Bowl",
      description: "Solid oak bowl with natural grain pattern, hand-turned and finished with food-safe oil.",
      imageUrl: "https://images.unsplash.com/photo-1635115428736-aee25eb1b087?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Ceramic Vase Collection",
      description: "Set of three organic-shaped vases in complementary earthy tones.",
      imageUrl: "https://images.unsplash.com/photo-1604678786654-ce998f21c8a9?q=80&w=2073&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Woven Wall Hanging",
      description: "Natural fiber wall hanging with intricate pattern, perfect for adding texture to your walls.",
      imageUrl: "https://images.unsplash.com/photo-1617806104780-ff7a4a0b1e4e?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Leather Journal",
      description: "Hand-stitched leather journal with handmade paper pages and brass closure.",
      imageUrl: "https://images.unsplash.com/photo-1544775677-4614a9ad1324?q=80&w=1936&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Wooden Cutting Board",
      description: "End-grain cutting board made from maple and walnut with juice groove and handle.",
      imageUrl: "https://images.unsplash.com/photo-1648183163286-32a0c8f62809?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Macrame Plant Hanger",
      description: "Intricately knotted plant hanger made from natural cotton rope.",
      imageUrl: "https://images.unsplash.com/photo-1615529162924-f8605388461d?q=80&w=1974&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Hand-Poured Candles",
      description: "Soy wax candles in reusable ceramic containers with custom scent blends.",
      imageUrl: "https://images.unsplash.com/photo-1605651531143-4fdbd71f904d?q=80&w=2012&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Ceramic Dinnerware Set",
      description: "Complete set of plates, bowls, and cups in speckled clay with minimalist design.",
      imageUrl: "https://images.unsplash.com/photo-1567300089216-439c77fd8e0d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 9,
      title: "Carved Wooden Spoons",
      description: "Set of hand-carved cooking and serving spoons in various hardwoods.",
      imageUrl: "https://images.unsplash.com/photo-1613645693539-24df70a03e5b?q=80&w=1974&auto=format&fit=crop",
    },
  ];

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-muted-foreground text-pretty">
            Browse through my collection of handcrafted items. Click on any image to view it in more detail.
          </p>
        </div>
        
        <ImageGallery items={galleryItems} />
      </div>
    </div>
  );
};

export default Gallery;
