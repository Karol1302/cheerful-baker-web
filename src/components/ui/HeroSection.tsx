
import { ArrowDownCircle } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage = 'https://images.unsplash.com/photo-1606744888344-493238951221?q=80&w=2012&auto=format&fit=crop'
}: HeroSectionProps) => {
  
  const scrollToContent = () => {
    const contentSection = document.getElementById('content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-6 z-10">
        <div 
          className="max-w-4xl mx-auto text-center space-y-6 opacity-0 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="pt-4">
            <a
              href={ctaLink}
              className="inline-flex items-center justify-center px-8 py-3 rounded-md text-white bg-gingerbread hover:bg-gingerbread-dark transition-colors duration-300 text-base font-medium shadow-sm hover:shadow-md"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
      
      <button
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gingerbread animate-float"
        aria-label="Scroll down"
      >
        <ArrowDownCircle size={36} />
      </button>
    </section>
  );
};

export default HeroSection;
