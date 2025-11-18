
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Instagram } from 'lucide-react';

const InstagramFeed = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div className="container mx-auto">
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={`text-center max-w-2xl mx-auto space-y-4 mb-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="text-3xl font-bold text-foreground">Nasze social media</h2>
        <p className="text-muted-foreground text-pretty">
          Śledź nas na Instagramie, aby zobaczyć więcej inspiracji i zajrzeć za kulisy naszego procesu twórczego.
        </p>
      </div>

      <div className={`relative overflow-hidden transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Instagram Reel Embed */}
        <div className="max-w-md mx-auto">
          <iframe
            src="https://www.instagram.com/reel/DMvf3DtM95V/embed"
            width="300"
            height="600"
            frameBorder="0"
            scrolling="no"
            className="mx-auto rounded-lg shadow-md"
            title="Instagram Reel"
          ></iframe>
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://www.instagram.com/pierniczkikim" 
            target="_blank" 
            rel="noreferrer noopener"
            className="inline-flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors"
          >
            <Instagram size={16} className="mr-2" />
            <span>Obserwuj mnie na Instagramie</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;
