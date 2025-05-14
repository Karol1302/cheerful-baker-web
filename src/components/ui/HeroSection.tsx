import { useEffect, useState } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { getHeroSlideshowConfig } from '@/utils/configLoader';
import { Mail, Image } from 'lucide-react';
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
}: HeroSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { images, transitionTime } = getHeroSlideshowConfig();

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, transitionTime || 10000); // 10 sekund na zmianę

    return () => clearInterval(interval);
  }, [images.length, transitionTime]);

  const scrollToContent = () => {
    const contentSection = document.getElementById('content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: currentImageIndex === index ? 1 : 0 }}
        >
          <img
            src={img.startsWith('/') ? import.meta.env.BASE_URL + img.slice(1) : img}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
          {/* Jasna półprzezroczysta maska */}
          <div className="absolute inset-0 bg-white opacity-75"></div>
        </div>
      ))}

      {/* Fallback dla no-JS */}
      <noscript>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${images[0].startsWith('/') ? import.meta.env.BASE_URL + images[0].slice(1) : images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </noscript>

      {/* Hero Content */}
      <div className="container mx-auto px-6 z-10">
        <div
          className="max-w-4xl mx-auto text-center space-y-6 opacity-0 animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground text-pretty max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            {/* Przycisk 1: Zobacz galerię */}
            <a
              href={ctaLink}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-white bg-gingerbread hover:bg-gingerbread-dark transition-colors duration-300 text-base font-medium shadow-sm hover:shadow-md w-fit"
            >
              <Image className="w-5 h-5" />
              {ctaText}
            </a>

            {/* Przycisk 2: Skontaktuj się */}
            <a
              href={import.meta.env.BASE_URL + "contact"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-white bg-gingerbread hover:bg-gingerbread-dark transition-colors duration-300 text-base font-medium shadow-sm hover:shadow-md w-fit"
            >
              <Mail className="w-5 h-5" />
              Skontaktuj się
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
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
