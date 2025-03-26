
import HeroSection from "@/components/ui/HeroSection";
import InstagramFeed from "@/components/ui/InstagramFeed";
import ProductCard from "@/components/ui/ProductCard";
import ServiceCard from "@/components/ui/ServiceCard";
import { Scissors, Sparkles, Clock, PaintBucket } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Index = () => {
  const { elementRef: productsRef, isVisible: productsVisible } = useIntersectionObserver();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useIntersectionObserver();
  
  const products = [
    {
      id: 1,
      title: "Custom Wooden Box",
      description: "Handcrafted wooden box made from premium oak with dovetail joints and personalized engraving.",
      imageUrl: "https://images.unsplash.com/photo-1591300205624-1c0242b4e81b?q=80&w=2070&auto=format&fit=crop",
      price: "From $120",
    },
    {
      id: 2,
      title: "Hand-Woven Basket",
      description: "Meticulously woven basket using natural rattan, perfect for storage and decoration.",
      imageUrl: "https://images.unsplash.com/photo-1632160518617-ca99ce512ce5?q=80&w=2012&auto=format&fit=crop",
      price: "From $85",
    },
    {
      id: 3,
      title: "Ceramic Tea Set",
      description: "Elegant ceramic tea set glazed in soft natural tones, including teapot and four cups.",
      imageUrl: "https://images.unsplash.com/photo-1576691616283-99a24df27e08?q=80&w=2070&auto=format&fit=crop",
      price: "From $150",
    },
  ];

  return (
    <div className="pt-0">
      <HeroSection 
        title="Handcrafted with Love and Care"
        subtitle="Custom pieces made just for you, bringing warmth and character to your home."
        ctaText="View Gallery"
        ctaLink="/gallery"
        backgroundImage="https://images.unsplash.com/photo-1609335045485-3c56e5a89d0c?q=80&w=1974&auto=format&fit=crop"
      />
      
      <div id="content">
        {/* Products Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div 
              ref={productsRef as React.RefObject<HTMLDivElement>}
              className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
                productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl font-bold mb-4">Latest Creations</h2>
              <p className="text-muted-foreground text-pretty">
                Each piece is meticulously crafted by hand, ensuring quality, uniqueness, and attention to detail.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Instagram Feed */}
        <InstagramFeed />
        
        {/* Services Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div 
              ref={servicesRef as React.RefObject<HTMLDivElement>}
              className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
                servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl font-bold mb-4">Services Offered</h2>
              <p className="text-muted-foreground text-pretty">
                From custom orders to personalized designs, I offer a range of services to bring your vision to life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard 
                title="Custom Orders"
                description="Bring your unique ideas to life with fully customized creations tailored to your specifications."
                icon={<Scissors size={24} />}
                index={0}
              />
              <ServiceCard 
                title="Personalization"
                description="Add a personal touch with custom engravings, monograms, or special messages."
                icon={<Sparkles size={24} />}
                index={1}
              />
              <ServiceCard 
                title="Quick Turnaround"
                description="Need your custom piece quickly? Priority service is available for urgent orders."
                icon={<Clock size={24} />}
                index={2}
              />
              <ServiceCard 
                title="Finishing Options"
                description="Choose from a variety of finishes, stains, and colors to match your home decor."
                icon={<PaintBucket size={24} />}
                index={3}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
