
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Handle scroll effect
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
  
  // Close sidebar when resizing to desktop
  useEffect(() => {
    if (!isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, sidebarOpen]);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sidebarOpen) {
        const target = e.target as HTMLElement;
        // Close if clicking outside the sidebar and not on the menu button
        if (!target.closest('.sidebar') && !target.closest('.menu-button')) {
          setSidebarOpen(false);
        }
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-2 transition-[background-color,backdrop-filter] duration-400 ${
          scrolled ? 'bg-white/90 backdrop-blur shadow-md' : 'bg-transparent backdrop-blur-0 shadow-none'
        }`}
      >


      <div className="container mx-auto px-6 flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-2xl font-bold tracking-tight text-gingerbread hover:opacity-90 transition-opacity"
        >
          PierniczkiKiM
        </NavLink>
        
        {/* Desktop Navigation */}
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
            to="/sets" 
            className={({ isActive }) => 
              `font-medium transition-all hover:text-gingerbread relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gingerbread after:transition-all ${
                isActive ? 'text-gingerbread after:w-full' : 'text-foreground'
              }`
            }
          >
            Oferta
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
          className="menu-button md:hidden text-gingerbread p-2 z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {/* {sidebarOpen ? <X size={24} /> : <Menu size={24} />} */}
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar */}
        <div 
          className={`absolute top-full left-0 right-0 z-40 transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          sidebarOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } ${scrolled || sidebarOpen ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'}`}
        >
        <div className="flex flex-col py-4 px-6">
          <nav className="flex flex-col space-y-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors ${
                  isActive ? 'text-gingerbread' : 'text-foreground hover:text-gingerbread'
                }`
              }
              onClick={closeSidebar}
            >
              Strona główna
            </NavLink>
            <NavLink 
              to="/sets" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors ${
                  isActive ? 'text-gingerbread' : 'text-foreground hover:text-gingerbread'
                }`
              }
              onClick={closeSidebar}
            >
              Oferta
            </NavLink>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors ${
                  isActive ? 'text-gingerbread' : 'text-foreground hover:text-gingerbread'
                }`
              }
              onClick={closeSidebar}
            >
              Galeria
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors ${
                  isActive ? 'text-gingerbread' : 'text-foreground hover:text-gingerbread'
                }`
              }
              onClick={closeSidebar}
            >
              Kontakt
            </NavLink>
          </nav>
        </div>
      </div>
      
      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed left-0 right-0 top-20 bottom-0 bg-white/40 backdrop-blur-md z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </header>
  );
};

export default Header;
