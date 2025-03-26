
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ContactForm = () => {
  const { elementRef: infoRef, isVisible: infoVisible } = useIntersectionObserver();
  const { elementRef: socialRef, isVisible: socialVisible } = useIntersectionObserver();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div 
        ref={infoRef as React.RefObject<HTMLDivElement>}
        className={`space-y-8 transition-all duration-700 ${
          infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-foreground">Get in Touch</h3>
          <p className="text-muted-foreground">
            I'd love to hear from you about custom orders, questions, or just to say hello.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start">
            <Mail className="text-gingerbread mr-4 mt-1" size={20} />
            <div>
              <h4 className="font-medium">Email</h4>
              <a 
                href="mailto:info@handcrafted.com" 
                className="text-muted-foreground hover:text-gingerbread transition-colors"
              >
                info@handcrafted.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="text-gingerbread mr-4 mt-1" size={20} />
            <div>
              <h4 className="font-medium">Phone</h4>
              <a 
                href="tel:+1234567890" 
                className="text-muted-foreground hover:text-gingerbread transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin className="text-gingerbread mr-4 mt-1" size={20} />
            <div>
              <h4 className="font-medium">Location</h4>
              <p className="text-muted-foreground">
                Handcrafted Studio<br />
                123 Artisan Street<br />
                Craftstown, CR 12345
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={socialRef as React.RefObject<HTMLDivElement>}
        className={`space-y-8 transition-all duration-700 ${
          socialVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-foreground">Connect With Me</h3>
          <p className="text-muted-foreground">
            Follow my social media profiles to see my latest work and get updates on new projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer noopener"
            className="flex items-center p-4 rounded-lg border border-border bg-white hover:border-gingerbread/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white mr-4">
              <Instagram size={20} />
            </div>
            <div>
              <h4 className="font-medium">Instagram</h4>
              <p className="text-sm text-muted-foreground">@handcrafted</p>
            </div>
          </a>
          
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noreferrer noopener"
            className="flex items-center p-4 rounded-lg border border-border bg-white hover:border-gingerbread/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white mr-4">
              <Facebook size={20} />
            </div>
            <div>
              <h4 className="font-medium">Facebook</h4>
              <p className="text-sm text-muted-foreground">Handcrafted Studio</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
