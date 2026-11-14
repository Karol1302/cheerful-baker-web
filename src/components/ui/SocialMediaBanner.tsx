
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { ArrowUpRight, Facebook, Instagram } from 'lucide-react';

const SocialMediaBanner = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div className="container mx-auto">
      <div
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={`max-w-4xl mx-auto rounded-3xl border border-gingerbread/15 bg-white/80 px-6 py-12 sm:px-12 sm:py-14 shadow-sm text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-gingerbread mb-3">Bądźmy w kontakcie</p>
        <h2 className="text-3xl font-bold text-foreground">Znajdź nas w social mediach</h2>
        <p className="text-muted-foreground text-pretty max-w-xl mx-auto mt-4">
          Zobacz nasze najnowsze pierniczki, inspiracje i kulisy ich powstawania.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="https://instagram.com/pierniczkikim" target="_blank" rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-gingerbread px-6 py-3 font-medium text-white transition-colors hover:bg-gingerbread-dark">
            <Instagram size={20} aria-hidden="true" /> Instagram <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="https://facebook.com/pierniczkikim" target="_blank" rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-gingerbread/30 px-6 py-3 font-medium text-gingerbread transition-colors hover:bg-cream">
            <Facebook size={20} aria-hidden="true" /> Facebook <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBanner;
