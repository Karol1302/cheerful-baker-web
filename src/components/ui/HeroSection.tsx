
import { useEffect, useState } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { getHeroSlideshowConfig } from '@/utils/configLoader';

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
}: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { images, transitionTime } = getHeroSlideshowConfig();
  
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // 500ms for the fade effect
    }, transitionTime);
    
    return () => clearInterval(interval);
  }, [images.length, transitionTime]);
  
  const scrollToContent = () => {
    const contentSection = document.getElementById('content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentImageIndex === index 
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7)), url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: currentImageIndex === index ? 1 : 0
          }}
        />
      ))}

      {/* Fallback background for no JavaScript */}
      <noscript>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7)), url(${images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </noscript>

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
