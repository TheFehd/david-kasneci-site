import { useEffect, useRef } from 'react';

/* react-bits style count-up: the number rolls from 0 when it scrolls
   into view. Falls back to the final value for reduced motion. */

export default function CountUp({ value, decimals = 0, duration = 1.8, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (v) =>
      decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      el.textContent = format(value);
      return;
    }
    el.textContent = format(0);
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(eased * value);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, decimals, duration]);

  return <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }} />;
}
