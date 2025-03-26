
import { NavLink } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cream py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gingerbread">Handcrafted</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Creating unique, custom pieces that perfectly match your vision and bring warmth to your home.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-foreground">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className="text-sm text-muted-foreground hover:text-gingerbread transition-colors">
                Home
              </NavLink>
              <NavLink to="/gallery" className="text-sm text-muted-foreground hover:text-gingerbread transition-colors">
                Gallery
              </NavLink>
              <NavLink to="/contact" className="text-sm text-muted-foreground hover:text-gingerbread transition-colors">
                Contact
              </NavLink>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-foreground">Connect</h3>
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
                href="mailto:info@handcrafted.com" 
                className="text-muted-foreground hover:text-gingerbread transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:+1234567890" 
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
            &copy; {currentYear} Handcrafted. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
