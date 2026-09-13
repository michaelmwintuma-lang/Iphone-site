import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating Back-to-Top Button
 * Appears smoothly when the user has scrolled down past 320px.
 * Clicking scrolls smoothly straight back to the top of the page.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 320);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top-btn ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll straight to the top"
      title="Back to top"
    >
      <ArrowUp size={20} strokeWidth={2.4} />
    </button>
  );
}
