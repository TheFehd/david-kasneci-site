import { useEffect, useRef } from 'react';

/* Site background — a quiet monochrome particle field (react-bits
   "Particles" aesthetic, zero-dependency canvas build). Stars twinkle
   slowly and drift with scroll depth. Static single frame for
   prefers-reduced-motion. */

export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let stars = [];
    let raf;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 10500);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        depth: 0.25 + Math.random() * 0.75,
        r: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 1.1,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      ctx.fillStyle = '#ffffff';
      for (const s of stars) {
        const y = (((s.y - scroll * s.depth * 0.08) % h) + h) % h;
        const twinkle = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(s.phase + t * 0.001 * s.speed);
        ctx.globalAlpha = (0.12 + 0.42 * s.depth) * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    seed();
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }
    const onResize = () => {
      seed();
      if (reduce) draw(0);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas className="starfield" ref={ref} aria-hidden="true" />;
}
