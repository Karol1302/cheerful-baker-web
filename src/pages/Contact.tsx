
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ContactForm from "@/components/ui/ContactForm";

const Contact = () => {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="container mx-auto">
        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-pretty">
            Have a question or interested in a custom order? Reach out using the contact information below.
          </p>
        </div>
        
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
