
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactForm = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This would normally be an API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Wiadomość wysłana! Dziękujemy za kontakt.");
      setFormState({
        name: "",
        email: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`grid md:grid-cols-2 gap-12 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Informacje kontaktowe</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center">
              <span role="img" aria-label="location" className="text-gingerbread">
                📍
              </span>
            </div>
            <div>
              <h3 className="font-medium">Lokalizacja</h3>
              <p className="text-muted-foreground">Warszawa, Polska</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center">
              <span role="img" aria-label="email" className="text-gingerbread">
                ✉️
              </span>
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-muted-foreground">kontakt@pierniczkikim.pl</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center">
              <span role="img" aria-label="phone" className="text-gingerbread">
                📞
              </span>
            </div>
            <div>
              <h3 className="font-medium">Telefon</h3>
              <p className="text-muted-foreground">+48 123 456 789</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <img
            src="/lovable-uploads/22504f23-1163-40c0-8b39-fec70c5d903b.png"
            alt="Pierniczki świąteczne"
            className="rounded-md shadow-sm"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Wyślij wiadomość</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Imię i nazwisko
            </label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Wiadomość
            </label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={formState.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-gingerbread hover:bg-gingerbread/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
