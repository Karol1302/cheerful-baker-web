
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
          Handcrafted
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
            Home
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => 
              `font-medium transition-all hover:text-gingerbread relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gingerbread after:transition-all ${
                isActive ? 'text-gingerbread after:w-full' : 'text-foreground'
              }`
            }
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `font-medium transition-all hover:text-gingerbread relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gingerbread after:transition-all ${
                isActive ? 'text-gingerbread after:w-full' : 'text-foreground'
              }`
            }
          >
            Contact
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

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-2xl font-medium ${isActive ? 'text-gingerbread' : 'text-foreground'}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => 
              `text-2xl font-medium ${isActive ? 'text-gingerbread' : 'text-foreground'}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-2xl font-medium ${isActive ? 'text-gingerbread' : 'text-foreground'}`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
