
import { Mail, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cream py-6">
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
            <div className="flex justify-start md:justify-center gap-6">
              {/* Email Contact Option */}
              <a 
                href="mailto:kontakt@pierniczkikim.pl" 
                className="hover:scale-110 transition-transform"
                aria-label="Email"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all">
                  <Mail size={24} className="text-gingerbread" />
                </div>
              </a>
              
              {/* Instagram Contact Option */}
              <a 
                href="https://instagram.com/pierniczkikim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all">
                  <Instagram size={24} className="text-gingerbread" />
                </div>
              </a>
              
              {/* Facebook Contact Option */}
              <a 
                href="https://facebook.com/pierniczkikim" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all">
                  <Facebook size={24} className="text-gingerbread" />
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-muted text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PierniczkiKiM. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
