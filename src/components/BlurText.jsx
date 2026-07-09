import { useEffect, useRef } from 'react';

/* react-bits BlurText pattern — words sharpen out of a blur, staggered,
   when the heading enters the viewport. CSS-driven; each word is tiny so
   the blur costs nothing. */

export default function BlurText({ text, step = 0.06, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span className={`blurtext ${className}`} ref={ref}>
      {text.split(' ').map((w, i) => {
        const fancy = w.startsWith('*');
        const word = fancy ? w.slice(1) : w;
        return (
          <span
            className={`blurtext__w${fancy ? ' fx' : ''}`}
            style={{ transitionDelay: `${delay + i * step}s` }}
            key={i}
          >
            {word}&nbsp;
          </span>
        );
      })}
    </span>
  );
}
