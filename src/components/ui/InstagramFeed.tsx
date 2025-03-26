
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Instagram } from 'lucide-react';

const InstagramFeed = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <section
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="py-20 px-6 bg-cream"
    >
      <div className="container mx-auto">
        <div className={`text-center max-w-2xl mx-auto space-y-4 mb-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">Najnowsze z Instagrama</h2>
          <p className="text-muted-foreground text-pretty">
            Śledź mnie na Instagramie, aby zobaczyć więcej inspiracji i zajrzeć za kulisy mojego procesu twórczego.
          </p>
        </div>

        <div className={`relative overflow-hidden transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* This is where an actual embedded Instagram post would go */}
          {/* For this demo, we'll create a placeholder that looks like an Instagram post */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
            <div className="p-4 border-b flex items-center">
              <div className="w-8 h-8 rounded-full bg-gingerbread flex items-center justify-center text-white">
                <Instagram size={16} />
              </div>
              <span className="ml-3 font-medium">pierniczkikim</span>
            </div>
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img 
                src="/lovable-uploads/e0d8e338-2e85-404e-bdfe-3243338b4c91.png" 
                alt="Świąteczne pierniczki" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="line-clamp-2 text-sm">
                Właśnie skończyłam to personalizowane zamówienie dla wspaniałego klienta! 
                Uwielbiam, jak łączą się naturalne składniki i przyprawy. 
                #pierniczkikim #dekoracjeświąteczne #rękodzieło
              </p>
              <p className="text-gray-400 text-xs mt-2">3 dni temu</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer noopener"
              className="inline-flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors"
            >
              <Instagram size={16} className="mr-2" />
              <span>Obserwuj na Instagramie</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
