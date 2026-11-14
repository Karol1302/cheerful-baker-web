
import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import SetRow from "@/components/ui/SetRow";
import SetCard from "@/components/ui/SetCard";
import { loadSets } from "@/utils/setsLoader";
import type { GiftSet, OfferTag } from "@/utils/setsLoader";
import { Check, ChevronLeft, Grid2X2, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import siteConfig from "@/config/siteConfig.json";

const Sets = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [sets, setSets] = useState<GiftSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<OfferTag | null>(null);
  const [view, setView] = useState<"list" | "gallery">("list");
  const navigate = useNavigate();
  const visibleSets = activeTag ? sets.filter((set) => set.tag === activeTag) : sets;

  const filters: { tag: OfferTag; label: string }[] = [
    { tag: "zestaw", label: "Zestawy pierników" },
    { tag: "pojedynczy", label: "Pojedyncze pierniczki" },
  ];

  useEffect(() => {
    document.title = "Oferta – Pierniczki KiM";
  }, []);


  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const loadedSets = await loadSets();
        setSets(loadedSets);
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
          <h1 className="text-4xl font-bold mb-4">{siteConfig.offerTitle}</h1>
          <p className="text-muted-foreground text-pretty">
            Tutaj znajdziesz nasze aktualne pierniczki dekoracyjne, dostępne do zamówienia.</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-gingerbread border-r-transparent rounded-full animate-spin"></div>
          </div>
        ) : sets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
                Aktualnie brak dostępnych pierniczków. Sprawdź ponownie wkrótce!
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-stretch sm:flex-row sm:items-center sm:justify-center gap-3 mb-8" role="group" aria-label="Filtruj ofertę">
              {filters.map(({ tag, label }) => {
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveTag(active ? null : tag)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm sm:text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gingerbread ${
                      active
                        ? "border-gingerbread bg-gingerbread text-white shadow-sm"
                        : "border-gingerbread/30 bg-white text-gingerbread hover:bg-cream hover:border-gingerbread"
                    }`}
                  >
                    {active && <Check size={17} aria-hidden="true" />}
                    {label}
                  </button>
                );
              })}
            </div>
            <div aria-live="polite" aria-atomic="true" className="text-center text-sm text-muted-foreground mb-6">
              {activeTag ? `Wyświetlane produkty: ${visibleSets.length}` : "Wyświetlane są wszystkie produkty"}
            </div>
            <div className="flex justify-center sm:justify-end mb-6" role="group" aria-label="Widok oferty">
              <div className="inline-flex rounded-lg border border-gingerbread/30 bg-white p-1">
                {([
                  { value: "list" as const, label: "Lista", Icon: List },
                  { value: "gallery" as const, label: "Galeria", Icon: Grid2X2 },
                ]).map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={view === value}
                    onClick={() => setView(value)}
                    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gingerbread ${view === value ? 'bg-gingerbread text-white' : 'text-gingerbread hover:bg-cream'}`}
                  >
                    <Icon size={18} aria-hidden="true" />{label}
                  </button>
                ))}
              </div>
            </div>
            {visibleSets.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">Brak produktów w tej kategorii. Wybierz drugi filtr lub kliknij ponownie, aby zobaczyć całą ofertę.</p>
            ) : (
            <div className={view === "list" ? "space-y-4" : "grid grid-cols-1 min-[340px]:grid-cols-2 md:grid-cols-3 gap-6"}>
            {visibleSets.map((set, index) => (
              view === "list" ? (
              <SetRow
                key={set.id}
                id={set.id}
                name={set.name}
                description={set.shortDescription || set.description}
                price={set.price}
                thumbnail={set.thumbnail}
              />
              ) : (
                <SetCard
                  key={set.id}
                  id={set.id}
                  name={set.name}
                  description={set.shortDescription || set.description}
                  price={set.price}
                  thumbnail={set.thumbnail}
                  index={index}
                  showDescriptionOnMobile
                />
              )
            ))}
            </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sets;
