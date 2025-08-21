
import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import SetRow from "@/components/ui/SetRow";
import { loadSets } from "@/utils/setsLoader";
import type { GiftSet } from "@/utils/setsLoader";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sets = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [sets, setSets] = useState<GiftSet[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Oferta – Pierniczki KiM";
  }, []);


  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Sort sets alphabetically by name
        const loadedSets = await loadSets();
        const sortedSets = [...loadedSets].sort((a, b) => 
          a.name.localeCompare(b.name)
        );
        setSets(sortedSets);
      } catch (error) {
        console.error("Failed to load sets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          <span>Powrót na stronę główną</span>
        </button>
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center px-2 sm:px-4 lg:px-8 max-w-full lg:max-w-4xl lg:mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">Oferta</h1>
          <p className="text-muted-foreground text-pretty">
            Tutaj znajdziesz nasze aktualne zestawy pierniczków dekoracyjnych, dostępne do zamówienia</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
          </div>
        ) : sets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aktualnie brak dostępnych zestawów. Sprawdź ponownie wkrótce!
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {sets.map((set, index) => (
              <SetRow
                key={set.id}
                id={set.id}
                name={set.name}
                description={set.shortDescription || set.description}
                price={set.price}
                thumbnail={set.thumbnail}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sets;
