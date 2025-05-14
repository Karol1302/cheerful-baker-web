
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
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">Zestawy</h1>
          <p className="text-muted-foreground text-pretty">
            Odkryj piękne zestawy pierniczków przygotowane na różne okazje. Wybierz jeden z gotowych 
            zestawów lub skontaktuj się ze mną, aby stworzyć coś specjalnie dla Ciebie.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
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
