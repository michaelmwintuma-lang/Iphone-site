import React from 'react';
import { useInView } from '../hooks/useInView';

/**
 * Wraps a block so it fades/rises in the first time it scrolls into view.
 * `delay` staggers siblings (in ms). All motion is disabled by the
 * prefers-reduced-motion rule on .reveal in index.css.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
