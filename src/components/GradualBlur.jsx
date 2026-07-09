import { useEffect, useState } from 'react';

/* react-bits GradualBlur — a progressive frosted band along the bottom
   edge: 4 stacked backdrop layers, each blurrier and masked tighter.
   Desktop only; the band is ~120px tall so the per-frame cost is small. */

const LAYERS = [
  { blur: 0.6, from: 0, to: 40 },
  { blur: 1.6, from: 25, to: 65 },
  { blur: 3.4, from: 50, to: 100 },
  { blur: 5.0, from: 75, to: 100 },
];

export default function GradualBlur() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (min-width: 861px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setOn(fine.matches && !reduce.matches);
    update();
    fine.addEventListener('change', update);
    return () => fine.removeEventListener('change', update);
  }, []);

  if (!on) return null;

  return (
    <div className="gblur" aria-hidden="true">
      {LAYERS.map((l, i) => (
        <div
          key={i}
          style={{
            backdropFilter: `blur(${l.blur}px)`,
            WebkitBackdropFilter: `blur(${l.blur}px)`,
            maskImage: `linear-gradient(to bottom, transparent ${l.from}%, black ${l.to}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent ${l.from}%, black ${l.to}%)`,
          }}
        />
      ))}
    </div>
  );
}
