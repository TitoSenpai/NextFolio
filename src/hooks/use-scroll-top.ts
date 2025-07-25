import { useState, useEffect } from 'react';

interface UseScrollTopOptions {
  threshold?: number;
}

export function useScrollTop(options: UseScrollTopOptions = {}) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { threshold = 300 } = options;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return {
    showScrollTop,
    scrollToTop
  };
}
