
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Mail, Instagram, Facebook } from 'lucide-react';

const Pricing = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  const priceItems = [
    {
      name: "Pojedyncze pierniczki z lukrową dekoracją",
      price: "od 8 zł / szt",
      description: "Cena zależy od wielkości i stopnia skomplikowania dekoracji"
    },
    {
      name: "Zestawy świąteczne",
      price: "od 85 zł",
      description: "Gotowe zestawy w różnych rozmiarach z tematycznymi dekoracjami"
    },
    {
      name: "Personalizowane zestawy",
      price: "od 120 zł",
      description: "Zestawy z indywidualnymi napisami, imionami lub dedykacjami"
    },
    {
      name: "Domki z piernika",
      price: "od 150 zł",
      description: "Dekoracyjne domki różnej wielkości, ręcznie zdobione"
    },
    {
      name: "Pierniczki na choinki",
      price: "od 65 zł / 10 szt",
      description: "Zestaw 10 różnych ozdób choinkowych z piernika"
    }
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
          <h1 className="text-4xl font-bold mb-4">Cennik</h1>
          <p className="text-muted-foreground text-pretty">
            Poznaj aktualne ceny naszych produktów. Pamiętaj, że każde zamówienie traktujemy indywidualnie, 
            a ceny mogą się różnić w zależności od stopnia skomplikowania i ilości.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {priceItems.map((item, index) => (
              <div 
                key={index}
                className="border border-muted rounded-lg p-6 hover:border-gingerbread transition-all duration-300 transform hover:shadow-md bg-white"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-medium">{item.name}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                  <div className="text-xl font-bold text-gingerbread">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-cream rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Zamówienia indywidualne</h2>
            <p className="text-center text-pretty mb-6">
              Potrzebujesz czegoś specjalnego? Chciałbyś zamówić pierniczki na wesele, chrzciny, 
              urodziny lub inną wyjątkową okazję? Skontaktuj się ze mną, aby omówić szczegóły i otrzymać indywidualną wycenę.
            </p>
            
            <div className="flex justify-center space-x-8">
              <a
                href="mailto:kontakt@pierniczkikim.pl"
                className="flex flex-col items-center group"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 transition-all duration-300 group-hover:shadow-md group-hover:scale-110">
                  <Mail size={24} className="text-gingerbread" />
                </div>
                <span className="text-sm text-gingerbread">Email</span>
              </a>
              
              <a
                href="https://instagram.com/pierniczkikim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 transition-all duration-300 group-hover:shadow-md group-hover:scale-110">
                  <Instagram size={24} className="text-gingerbread" />
                </div>
                <span className="text-sm text-gingerbread">Instagram</span>
              </a>
              
              <a
                href="https://facebook.com/pierniczkikim"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 transition-all duration-300 group-hover:shadow-md group-hover:scale-110">
                  <Facebook size={24} className="text-gingerbread" />
                </div>
                <span className="text-sm text-gingerbread">Facebook</span>
              </a>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/sets" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gingerbread text-white rounded-md hover:bg-gingerbread-dark transition-all duration-300"
            >
              Zobacz gotowe zestawy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
