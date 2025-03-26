
import { useEffect, useRef, useState } from 'react';

interface IntersectionOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = true,
}: IntersectionOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        if (isElementVisible) {
          setIsVisible(true);
          if (freezeOnceVisible) {
            observer.disconnect();
          }
        } else if (!freezeOnceVisible) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return { elementRef, isVisible };
}
