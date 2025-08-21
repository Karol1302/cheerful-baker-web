
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Mail, Instagram, Facebook, Phone } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const navigate = useNavigate();

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
          <h1 className="text-4xl font-bold mb-4">Skontaktuj się</h1>
          <p className="text-muted-foreground text-pretty">
            Masz pytanie lub interesujesz się indywidualnym zamówieniem? Skontaktuj się, korzystając z poniższych informacji.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Email Contact Option */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={28} className="text-gingerbread" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-muted-foreground mb-4">Napisz do mnie email</p>
              <a 
                href="mailto:kontakt@pierniczkikim.pl" 
                className="text-gingerbread hover:text-gingerbread-dark transition-colors font-medium"
              >
                kontakt@pierniczkikim.pl
              </a>
            </div>
            
            {/* Instagram Contact Option */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <Instagram size={28} className="text-gingerbread" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Instagram</h3>
              <p className="text-muted-foreground mb-4">Obserwuj najnowsze kreacje</p>
              <a 
                href="https://instagram.com/pierniczkikim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gingerbread hover:text-gingerbread-dark transition-colors font-medium"
              >
                @pierniczkikim
              </a>
            </div>
            
            {/* Phone Contact Option */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={28} className="text-gingerbread" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Telefon</h3>
              <p className="text-muted-foreground mb-4">Zadzwoń bezpośrednio</p>
              <a 
                href="tel:+48123456789" 
                className="text-gingerbread hover:text-gingerbread-dark transition-colors font-medium"
              >
                +48 123 456 789
              </a>
            </div>

            {/* Facebook Contact Option */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <Facebook size={28} className="text-gingerbread" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Facebook</h3>
              <p className="text-muted-foreground mb-4">Dołącz do społeczności</p>
              <a 
                href="https://facebook.com/pierniczkikim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gingerbread hover:text-gingerbread-dark transition-colors font-medium"
              >
                pierniczkikim
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
