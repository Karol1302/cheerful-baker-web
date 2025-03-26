
import { NavLink } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cream py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gingerbread">PierniczkiKiM</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Tworzę wyjątkowe, ręcznie zdobione pierniczki, które idealnie pasują do Twojej wizji i wprowadzają ciepło do Twojego domu.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-foreground">Kontakt</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-gingerbread transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-gingerbread transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="mailto:info@pierniczkikim.pl" 
                className="text-muted-foreground hover:text-gingerbread transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:+48123456789" 
                className="text-muted-foreground hover:text-gingerbread transition-colors"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-10 border-t border-muted text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} PierniczkiKiM. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
