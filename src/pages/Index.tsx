
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
      title: "Świąteczny zestaw pierników",
      description: "Ręcznie robione pierniki świąteczne z naturalnymi przyprawami i własnoręcznie przygotowanymi dekoracjami.",
      imageUrl: "https://images.unsplash.com/photo-1607920592529-3b1e314a27a3?q=80&w=2070&auto=format&fit=crop",
      price: "Od 120 zł",
    },
    {
      id: 2,
      title: "Personalizowane pierniczki",
      description: "Wyjątkowe pierniczki z indywidualnymi napisami i wzorami, idealne na prezent świąteczny.",
      imageUrl: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?q=80&w=2014&auto=format&fit=crop",
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
        backgroundImage="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=2070&auto=format&fit=crop"
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
              <h2 className="text-3xl font-bold mb-4">Najnowsze kreacje</h2>
              <p className="text-muted-foreground text-pretty">
                Każdy pierniczek jest starannie wykonany ręcznie, co zapewnia wyjątkową jakość, unikalność i dbałość o detale.
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
