import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to all `.fade-in` elements
 * within the given container ref (defaults to document).
 * Call once at the layout / page level.
 */
export function useFadeIn(containerRef = null) {
  useEffect(() => {
    const root = containerRef?.current ?? document;
    const elements = root.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}
