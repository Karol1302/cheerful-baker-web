
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/ui/HeroSection";
import InstagramFeed from "@/components/ui/InstagramFeed";
import ProductCard from "@/components/ui/ProductCard";
import ServiceCard from "@/components/ui/ServiceCard";
import GalleryCTA from "@/components/ui/GalleryCTA";
import { Scissors, Sparkles, Clock, PaintBucket, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getCurrentOffers } from "@/utils/configLoader";
import { isCategory } from "@/utils/configLoader";
import CategoryCard from "@/components/ui/CategoryCard";
import SetCard from "@/components/ui/SetCard";

const Index = () => {
  const { elementRef: productsRef, isVisible: productsVisible } = useIntersectionObserver();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useIntersectionObserver();
  const [currentOffers, setCurrentOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);
      try {
        const offers = await getCurrentOffers(6);
        setCurrentOffers(offers);
      } catch (error) {
        console.error("Failed to load current offers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadOffers();
  }, []);
  
  const products = [
    {
      id: 1,
      title: "Świąteczny zestaw pierników",
      description: "Ręcznie robione pierniki świąteczne z naturalnymi przyprawami i własnoręcznie przygotowanymi dekoracjami.",
      imageUrl: "/lovable-uploads/e0d8e338-2e85-404e-bdfe-3243338b4c91.png",
      price: "Od 120 zł",
    },
    {
      id: 2,
      title: "Personalizowane pierniczki",
      description: "Wyjątkowe pierniczki z indywidualnymi napisami i wzorami, idealne na prezent świąteczny.",
      imageUrl: "/lovable-uploads/22504f23-1163-40c0-8b39-fec70c5d903b.png",
      price: "Od 85 zł",
    },
    {
      id: 3,
      title: "Domki z piernika",
      description: "Piękne, dekoracyjne domki z piernika, ręcznie zdobione lukrem i słodkimi ozdobami.",
      imageUrl: "https://images.unsplash.com/photo-1544285231-ae61a4567a75?q=80&w=1960&auto=format&fit=crop",
      price: "Od 150 zł",
    },
  ];

  return (
    <div className="pt-0">
      <HeroSection 
        title="Pierniczki tworzone z miłością i starannością"
        subtitle="Ręcznie wykonane słodkości, które wprowadzą świąteczny klimat do Twojego domu."
        ctaText="Zobacz galerię"
        ctaLink="/gallery"
        backgroundImage="/lovable-uploads/e0d8e338-2e85-404e-bdfe-3243338b4c91.png"
      />
      
      <div id="content">
        {/* Current Offers Section (replaces Products Section) */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div 
              ref={productsRef as React.RefObject<HTMLDivElement>}
              className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
                productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl font-bold mb-4">Aktualna oferta</h2>
              <p className="text-muted-foreground text-pretty">
                Wybierz spośród aktualnie dostępnych propozycji lub skontaktuj się ze mną, aby zamówić coś specjalnego.
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
              </div>
            ) : currentOffers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentOffers.map((item, index) => {
                    if (isCategory(item)) {
                      const hasEnoughImages = item.images && item.images.length >= 4;
                      const imageUrls = hasEnoughImages 
                        ? item.images.slice(0, 4).map(img => img.url) 
                        : [];
                      
                      return (
                        <CategoryCard
                          key={`category-${item.id}`}
                          id={item.id}
                          name={item.name}
                          description={item.description}
                          thumbnail={item.thumbnail}
                          index={index}
                          useCollage={hasEnoughImages}
                          current={item.current}
                          collageImages={imageUrls}
                        />
                      );
                    } else {
                      return (
                        <SetCard
                          key={`set-${item.id}`}
                          id={item.id}
                          name={item.name}
                          description={item.shortDescription || item.description}
                          price={item.price}
                          thumbnail={item.thumbnail}
                          index={index}
                          current={item.current}
                        />
                      );
                    }
                  })}
                </div>
                
                <div className="mt-12 text-center">
                  <Link 
                    to="/gallery" 
                    className="mr-6 inline-flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors group"
                  >
                    <span>Zobacz więcej kategorii</span>
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                  </Link>
                  
                  <Link 
                    to="/sets" 
                    className="inline-flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors group"
                  >
                    <span>Zobacz więcej zestawów</span>
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Aktualnie brak dostępnych ofert. Sprawdź ponownie wkrótce!</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Gallery CTA Section */}
        <GalleryCTA />
        
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
              <h2 className="text-3xl font-bold mb-4">Oferowane usługi</h2>
              <p className="text-muted-foreground text-pretty">
                Od zamówień indywidualnych po personalizowane wzory, oferuję szereg usług, by spełnić Twoją wizję.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard 
                title="Zamówienia indywidualne"
                description="Zrealizuję Twoje unikalne pomysły, tworząc pierniczki w pełni dostosowane do Twoich wymagań."
                icon={<Scissors size={24} />}
                index={0}
              />
              <ServiceCard 
                title="Personalizacja"
                description="Dodaj osobisty akcent z niestandardowymi napisami, monogramami lub specjalnymi dekoracjami."
                icon={<Sparkles size={24} />}
                index={1}
              />
              <ServiceCard 
                title="Szybka realizacja"
                description="Potrzebujesz pierniczków na szybko? Priorytetowa obsługa dostępna dla pilnych zamówień."
                icon={<Clock size={24} />}
                index={2}
              />
              <ServiceCard 
                title="Różne opcje wykończenia"
                description="Wybieraj spośród różnych rodzajów lukru, posypek i kolorów, aby dopasować pierniczki do wystroju."
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
