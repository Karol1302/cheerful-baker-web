
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Instagram } from 'lucide-react';

const InstagramFeed = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <section
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="py-20 px-6 bg-cream"
    >
      <div className="container mx-auto">
        <div className={`text-center max-w-2xl mx-auto space-y-4 mb-12 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">Latest From Instagram</h2>
          <p className="text-muted-foreground text-pretty">
            Follow me on Instagram for more inspiration and behind-the-scenes looks at my creative process.
          </p>
        </div>

        <div className={`relative overflow-hidden transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* This is where an actual embedded Instagram post would go */}
          {/* For this demo, we'll create a placeholder that looks like an Instagram post */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
            <div className="p-4 border-b flex items-center">
              <div className="w-8 h-8 rounded-full bg-gingerbread flex items-center justify-center text-white">
                <Instagram size={16} />
              </div>
              <span className="ml-3 font-medium">handcrafted</span>
            </div>
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618220179428-22790b485390?q=80&w=2027&auto=format&fit=crop" 
                alt="Handcrafted item" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="line-clamp-2 text-sm">
                Just finished this custom piece for a wonderful client! 
                Love how the natural materials came together. 
                #handcrafted #customorder #woodworking
              </p>
              <p className="text-gray-400 text-xs mt-2">3 days ago</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer noopener"
              className="inline-flex items-center text-gingerbread hover:text-gingerbread-dark transition-colors"
            >
              <Instagram size={16} className="mr-2" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
