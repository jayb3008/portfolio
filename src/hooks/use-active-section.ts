import { useState, useEffect, useCallback } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const observerCallback = useCallback<IntersectionObserverCallback>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          setActiveSection(entry.target.id);
        });
      }
    });
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      // Adjust the rootMargin to create a larger intersection area
      rootMargin: '-45% 0px -45% 0px',
      // Add multiple thresholds for smoother transitions
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Use a Set to track observed elements
    const observedElements = new Set<Element>();

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && !observedElements.has(element)) {
        observer.observe(element);
        observedElements.add(element);
      }
    });

    return () => {
      observedElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [sectionIds, observerCallback]);

  return activeSection;
}; 