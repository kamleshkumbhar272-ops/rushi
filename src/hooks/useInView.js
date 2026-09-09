import { useEffect, useRef, useState } from "react";

/**
 * useInView — tiny IntersectionObserver hook.
 * Returns [ref, isVisible]. Attach `ref` to the element you want to
 * observe; `isVisible` flips to true once it scrolls into view (and
 * stays true — it's a one-shot reveal, not a toggle).
 */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
