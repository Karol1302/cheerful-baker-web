
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/ui/HeroSection";
import InstagramFeed from "@/components/ui/InstagramFeed";
import ServiceCard from "@/components/ui/ServiceCard";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { loadSets } from "@/utils/setsLoader";
import { GiftSet } from "@/utils/setsLoader";
import { getSortedCategories, Category } from "@/utils/categoriesLoader";
import SetCard from "@/components/ui/SetCard";
import CategoryCard from "@/components/ui/CategoryCard";
import {
  HandHeart,   // ręczna praca
  Leaf,        // naturalne składniki
  Brush,       // lukrowanie
  Sparkles,    // dekoracje okolicznościowe
  Gift,        // eleganckie pakowanie
  Tag,         // bileciki, etykiety
  Boxes,       // ikona przycisku „Oferta”
  ArrowRight,
} from "lucide-react";
import { getAssetUrl } from "@/utils/url";

const Index = () => {
  const { elementRef: productsRef, isVisible: productsVisible } = useIntersectionObserver();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useIntersectionObserver();
  const { elementRef: categoriesRef, isVisible: categoriesVisible } = useIntersectionObserver();
  
  const [currentSets, setCurrentSets] = useState<GiftSet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    document.title = "Pierniczki KiM – Ręcznie dekorowane pierniczki";
  }, []);

  
  // Load all sets
  useEffect(() => {
    const loadAllSets = async () => {
      setLoading(true);
      try {
        const allSets = await loadSets();
        // Limit to 6 sets
        setCurrentSets(allSets.slice(0, 6));
      } catch (error) {
        console.error("Failed to load sets:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAllSets();
  }, []);
  
  // Load categories for "Poprzednie realizacje"
  useEffect(() => {
    const loadCategories = async () => {
      setCategoriesLoading(true);
      try {
        const allCategories = await getSortedCategories();
        // Take first 3 categories
        setCategories(allCategories.slice(0, 3));
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  return (
    <div className="pt-0">
      <HeroSection 
          title="Witamy w świecie słodkiego rękodzieła"
          subtitle="Zajmujemy sie tworzeniem wyjątkowych ręcznie dekorowanych pierniczków."
        />

      
      <div id="content">
        {/* Current Sets Section */}
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
                Wybierz spośród aktualnie dostępnych zestawów lub skontaktuj się ze mną, aby zamówić coś specjalnego.
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
              </div>
            ) : currentSets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {currentSets.map((set, index) => (
                  <SetCard
                    key={set.id}
                    id={set.id}
                    name={set.name}
                    description={set.shortDescription || set.description}
                    thumbnail={set.thumbnail}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Aktualnie brak dostępnych zestawów. Sprawdź ponownie wkrótce!</p>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <Link 
                to="/sets" 
                className="inline-flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors group"
              >
                <span>Zobacz więcej</span>
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-24 px-6 bg-cream/50">
          <div className="container mx-auto">
            <div
              ref={servicesRef as React.RefObject<HTMLDivElement>}
              className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
                servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold mb-4">
                Dlaczego warto wybrać nasze pierniczki?
              </h2>

              <p className="text-muted-foreground text-pretty">
                Pierniczki KiM to pracownia rękodzieła artystycznego,&nbsp;tworząca od podstaw dekoracyjne pierniczki&nbsp;zdobione lukrem królewskim.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="Ręczne wykonanie"
                description="Od wyrobienia ciasta po ostatnią kropkę lukru – 100 % handmade."
                icon={<HandHeart size={24} />}
                index={0}
              />
              <ServiceCard
                title="Naturalne składniki"
                description="Mąka, jajka, masło, miód naturalny, cukier, soda, kakao, przyprawy korzenne – nic sztucznego."
                icon={<Leaf size={24} />}
                index={1}
              />
              <ServiceCard
                title="Lukier królewski"
                description="Każdy detal tworzymy lukrem z białka w proszku (albumina), cukru pudru i barwników spożywczych."
                icon={<Brush size={24} />}
                index={2}
              />
              <ServiceCard
                title="Dekoracja na każdą okazję"
                description="Pierniczki oferujemy jako artykuł dekoracyjny – idealne na święta, urodziny, jubileusze i inne wyjątkowe chwile."
                icon={<Sparkles size={24} />}
                index={3}
              />
              <ServiceCard
                title="Eleganckie pakowanie"
                description="Celofan lub pudełko prezentowe – zawsze przewiązane wstążką, gotowe do wręczenia jako prezent."
                icon={<Gift size={24} />}
                index={4}
              />
              <ServiceCard
                title="Bileciki i etykiety"
                description="Możemy dodać naklejkę, bilecik lub etykietę z Twoim tekstem."
                icon={<Tag size={24} />}
                index={5}
              />
            </div>
          </div>
        </section>

        {/* Poprzednie realizacje - Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto">
            <div 
              ref={categoriesRef as React.RefObject<HTMLDivElement>}
              className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
                categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl font-bold mb-4">Poprzednie realizacje</h2>
              <p className="text-muted-foreground text-pretty">
                Zobacz wybrane przykłady moich realizacji z różnych kategorii.
              </p>
            </div>
            
            {categoriesLoading ? (
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
              </div>
            ) : categories.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categories.map((category, index) => {
                    const imageUrls = category.images
                      ? category.images.slice(0, 4).map(img => getAssetUrl(img.url))
                      : [];

                    const hasEnoughImages = imageUrls.length >= 4 && new Set(imageUrls).size >= 4;

                    return (
                      <CategoryCard
                        key={`category-${category.id}`}
                        id={category.id}
                        name={category.name}
                        description={category.description}
                        thumbnail={getAssetUrl(category.thumbnail)}
                        index={index}
                        useCollage={hasEnoughImages}
                        collageImages={imageUrls}
                      />
                    );
                  })}
                </div>
                
                <div className="mt-12 text-center">
                  <Link 
                    to="/gallery" 
                    className="inline-flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors group"
                  >
                    <span>Zobacz więcej</span>
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Brak kategorii do wyświetlenia.</p>
              </div>
            )}
          </div>
        </section>
        
        {/* Instagram Feed */}
        <section className="py-24 px-6 bg-gradient-to-b from-cream to-white">
          <InstagramFeed />
        </section>
      </div>
    </div>
  );
};

export default Index;
