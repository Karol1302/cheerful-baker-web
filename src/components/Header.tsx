
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useMedia } from '@/hooks/use-mobile';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMedia('(max-width: 768px)');
  
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
            to="/sets" 
            className={({ isActive }) => 
              `font-medium transition-all hover:text-gingerbread relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-gingerbread after:transition-all ${
                isActive ? 'text-gingerbread after:w-full' : 'text-foreground'
              }`
            }
          >
            Zestawy
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
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`sidebar fixed inset-y-0 right-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
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
              to="/sets" 
              className={({ isActive }) => 
                `text-lg font-medium transition-colors ${
                  isActive ? 'text-gingerbread' : 'text-foreground hover:text-gingerbread'
                }`
              }
              onClick={closeSidebar}
            >
              Zestawy
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </header>
  );
};

export default Header;
