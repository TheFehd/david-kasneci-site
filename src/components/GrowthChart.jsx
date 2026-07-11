import { useEffect, useRef } from 'react';
import CountUp from './CountUp.jsx';

/* The trajectory — an illustrative growth curve that draws itself on
   entry: grey dashed drift vs. the aligned emerald climb, with the
   30-day milestones from the program marked on the curve. */

const DOTS = [
  { x: 208, y: 226, d: 'Day 7' },
  { x: 280, y: 214, d: 'Day 10' },
  { x: 376, y: 194, d: 'Day 14' },
  { x: 744, y: 64, d: 'Day 30' },
];

export default function GrowthChart() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([en]) => { if (en.isIntersecting) { el.classList.add('is-in'); io.disconnect(); } },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="gchart" ref={ref}>
      <div className="tml__head">
        <span className="pillars__label reveal">The trajectory</span>
        <h2 className="tml__title reveal reveal--d1">Money follows <i className="fx">alignment.</i></h2>
      </div>

      <div className="gchart__frame reveal">
        <svg viewBox="0 0 800 340" role="img" aria-label="Illustrative curve: a flat drifting baseline versus a rising aligned trajectory across 30 days">
          <defs>
            <linearGradient id="ggrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#10b981" stopOpacity="0.28" />
              <stop offset="1" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[70, 130, 190, 250].map((y) => (
            <line key={y} x1="40" x2="760" y1={y} y2={y} stroke="rgba(240,240,240,0.06)" strokeWidth="1" />
          ))}
          <path className="gchart__area" d="M40 235 C 200 232, 320 224, 420 188 C 520 152, 640 104, 744 64 L 744 300 L 40 300 Z" fill="url(#ggrad)" />
          <path className="gchart__old" d="M40 238 C 240 234, 520 242, 760 236" fill="none" stroke="rgba(240,240,240,0.28)" strokeWidth="1.5" strokeDasharray="5 7" />
          <path className="gchart__line" d="M40 235 C 200 232, 320 224, 420 188 C 520 152, 640 104, 744 64" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          {DOTS.map((p, i) => (
            <g className="gchart__dot" style={{ transitionDelay: `${1.1 + i * 0.25}s` }} key={p.d}>
              <circle cx={p.x} cy={p.y} r="4.5" fill="#34d399" />
              <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="rgba(52,211,153,0.35)" strokeWidth="1" />
              <text x={p.x} y={p.y - 18} textAnchor="middle">{p.d}</text>
            </g>
          ))}
          <text className="gchart__axis" x="40" y="322">Day 0</text>
          <text className="gchart__axis" x="744" y="322" textAnchor="end">Day 30</text>
          <text className="gchart__oldlabel" x="758" y="252" textAnchor="end">old pattern</text>
          <text className="gchart__newlabel" x="700" y="42" textAnchor="end">the aligned path</text>
        </svg>
      </div>

      <ul className="gchart__stats reveal reveal--d1" aria-label="Program facts">
        <li><CountUp className="gchart__n" value={30} duration={1.4} /><span>days of activation</span></li>
        <li><CountUp className="gchart__n" value={6} duration={1.2} /><span>phases</span></li>
        <li><CountUp className="gchart__n" value={52} duration={1.8} /><span>live calls a year</span></li>
        <li><span className="gchart__n">$100k+</span><span>paid for this privately</span></li>
      </ul>
      <p className="gchart__note reveal reveal--d2">Illustrative &mdash; the shape of aligned momentum, not an income guarantee.</p>
    </section>
  );
}
