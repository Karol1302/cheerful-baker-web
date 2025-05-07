
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const GalleryCTA = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <section
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`py-16 px-6 bg-gradient-to-r from-cream/50 to-cream transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <Link 
            to="/gallery" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gingerbread text-white rounded-full text-lg font-medium shadow-lg hover:bg-gingerbread-dark hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
          >
            <span>chcesz zobaczyć więcej kreacji – przejdź do galerii</span>
            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={24} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryCTA;
