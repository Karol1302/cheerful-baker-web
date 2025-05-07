
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 shadow-md glass' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-2xl font-bold tracking-tight text-gingerbread hover:opacity-90 transition-opacity"
        >
          PierniczkiKiM
        </NavLink>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `font-medium transition-all hover:text-gingerbread relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gingerbread after:transition-all ${
                isActive ? 'text-gingerbread after:w-full' : 'text-foreground'
              }`
            }
          >
            Strona główna
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => 
              `font-medium transition-all hover:text-gingerbread relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gingerbread after:transition-all ${
                isActive ? 'text-gingerbread after:w-full' : 'text-foreground'
              }`
            }
          >
            Galeria
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `font-medium transition-all hover:text-gingerbread relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gingerbread after:transition-all ${
                isActive ? 'text-gingerbread after:w-full' : 'text-foreground'
              }`
            }
          >
            Kontakt
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gingerbread"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Updated to fully fit viewport */}
      <div 
        className={`fixed inset-x-0 top-[60px] z-40 bg-black/90 backdrop-blur-sm transform transition-transform duration-300 ease-in-out max-h-[calc(100vh-60px)] overflow-y-auto ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center py-6 space-y-4 w-full max-w-full">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-xl font-medium px-6 py-3 rounded-md w-4/5 text-center transition-colors ${
                isActive ? 'bg-gingerbread text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Strona główna
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => 
              `text-xl font-medium px-6 py-3 rounded-md w-4/5 text-center transition-colors ${
                isActive ? 'bg-gingerbread text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Galeria
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-xl font-medium px-6 py-3 rounded-md w-4/5 text-center transition-colors ${
                isActive ? 'bg-gingerbread text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Kontakt
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
