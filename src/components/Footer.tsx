
import { Mail, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cream py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gingerbread">PierniczkiKiM</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Tworzę wyjątkowe, ręcznie zdobione pierniczki, które idealnie pasują do Twojej wizji i wprowadzają ciepło do Twojego domu.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Kontakt</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {/* Email Contact Option */}
              <div className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail size={20} className="text-gingerbread" />
                </div>
                <h4 className="text-sm font-medium mb-1">Email</h4>
                <a 
                  href="mailto:kontakt@pierniczkikim.pl" 
                  className="text-sm text-gingerbread hover:text-gingerbread-dark transition-colors"
                >
                  kontakt@pierniczkikim.pl
                </a>
              </div>
              
              {/* Instagram Contact Option */}
              <div className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center mx-auto mb-2">
                  <Instagram size={20} className="text-gingerbread" />
                </div>
                <h4 className="text-sm font-medium mb-1">Instagram</h4>
                <a 
                  href="https://instagram.com/pierniczkikim" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gingerbread hover:text-gingerbread-dark transition-colors"
                >
                  @pierniczkikim
                </a>
              </div>
              
              {/* Facebook Contact Option */}
              <div className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center mx-auto mb-2">
                  <Facebook size={20} className="text-gingerbread" />
                </div>
                <h4 className="text-sm font-medium mb-1">Facebook</h4>
                <a 
                  href="https://facebook.com/pierniczkikim" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gingerbread hover:text-gingerbread-dark transition-colors"
                >
                  pierniczkikim
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-muted text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PierniczkiKiM. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
