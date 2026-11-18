import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAssetUrl } from '@/utils/url';

const logoUrl = getAssetUrl('Logo.png');
const links = [
  { to: '/', label: 'Strona główna', desktopOnly: true },
  { to: '/sets', label: 'Oferta' },
  { to: '/gallery', label: 'Galeria', desktopOnly: true },
  { to: '/contact', label: 'Kontakt' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 py-2 transition-[background-color,backdrop-filter] duration-400 ${
        scrolled ? 'bg-white/90 backdrop-blur shadow-md' : 'bg-white shadow-sm md:bg-transparent md:shadow-none'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 px-6 max-md:px-4">
        <NavLink
          to="/"
          aria-label="Pierniczki KiM – strona główna"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
        >
          <img
            src={logoUrl}
            alt="Pierniczki KiM"
            className="h-12 w-auto max-md:max-w-[42vw] max-md:object-contain max-md:object-left md:h-14 lg:h-16"
          />
        </NavLink>

        <nav aria-label="Menu główne" className="flex items-center gap-1 md:gap-8">
          {links.map(({ to, label, desktopOnly }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${desktopOnly ? 'hidden md:inline-flex' : 'inline-flex'} items-center whitespace-nowrap font-medium transition-colors hover:text-gingerbread focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gingerbread max-md:min-h-11 max-md:rounded-md max-md:px-2.5 max-md:text-sm md:relative md:after:absolute md:after:bottom-0 md:after:left-0 md:after:h-0.5 md:after:w-0 md:after:bg-gingerbread md:after:transition-all md:hover:after:w-full ${
                  isActive ? 'text-gingerbread max-md:bg-cream max-md:text-gingerbread-dark md:after:w-full' : 'text-foreground'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
