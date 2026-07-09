import { useEffect, useRef } from 'react';
import Btn from './Btn.jsx';
import BlurText from './BlurText.jsx';

/* triquetra glyph — the "O" of the PROJECT 369 wordmark */
function Triquetra({ ring = false, className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="4.5">
        <path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" />
        <path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" transform="rotate(120 50 54)" />
        <path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" transform="rotate(240 50 54)" />
        {ring && <circle cx="50" cy="54" r="45" strokeWidth="3" />}
      </g>
    </svg>
  );
}

function Mark() {
  return (
    <span className="b369__mark">
      PR<Triquetra className="b369__triq" />JECT
      <span className="b369__mark369">3 6 9</span>
    </span>
  );
}

const BOOKS = [
  {
    key: 'planner',
    url: 'https://369project.com/products/project-369-manifestation-planner',
    minor: true,
    coil: true,
    art: '/assets/369/planner.jpg',
    spine: 'Manifestation Planner',
    title: 'Manifestation Planner',
    sub: '2026',
    label: 'Project 369 — Manifestation Planner',
  },
  {
    key: 'universe',
    url: 'https://369project.com/products/369-manifestation-journal',
    art: '/assets/369/universe.jpg',
    spine: 'The Key to the Universe',
    title: 'The Key to the Universe',
    sub: 'Awakened Consciousness',
    label: 'Project 369 — The Key to the Universe',
  },
  {
    key: 'bliss',
    url: 'https://369project.com/products/project-369-the-key-to-happiness-gratitude-consciousness',
    art: '/assets/369/bliss.jpg',
    spine: 'The Key to Enlightenment',
    title: 'The Key to Enlightenment',
    sub: 'Bliss Consciousness',
    label: 'Project 369 — The Key to Enlightenment',
  },
  {
    key: 'wealth',
    url: 'https://369project.com/products/project-369-the-key-to-wealth-abundance-prosperity',
    art: '/assets/369/wealth.jpg',
    spine: 'The Key to Abundance',
    title: 'The Key to Abundance',
    sub: 'Wealth Consciousness',
    label: 'Project 369 — The Key to Abundance',
  },
  {
    key: 'iam',
    url: 'https://369project.com/products/project-369-the-key-to-wholeness-soul-work-journal',
    minor: true,
    coil: true,
    iam: true,
    art: '/assets/369/iam.jpg',
    spine: 'I AM',
    title: 'I AM',
    sub: 'The Journal',
    label: 'Project 369 — I AM, the journal',
  },
];

/* resting pose of each book on the shelf, left to right */
const POSE = ['24deg', '15deg', '0deg', '-15deg', '-24deg'];

export default function Books369() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const scaleRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const scaleWrap = scaleRef.current;
    const scene = sceneRef.current;
    if (!section || !stage || !scaleWrap || !scene) return;

    /* fit the shelf to any viewport */
    const fit = () => {
      const s = Math.min(1, (stage.clientWidth - 16) / scene.offsetWidth);
      scaleWrap.style.transform = `scale(${s.toFixed(3)})`;
      stage.style.height = `${Math.ceil(scene.offsetHeight * s + 90)}px`;
    };
    fit();
    window.addEventListener('resize', fit);
    if (reduce) return () => window.removeEventListener('resize', fit);

    /* cursor: tilt the shelf, sweep the gloss */
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    const frame = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      scene.style.transform = `rotateX(${(2.5 - cy * 4).toFixed(2)}deg) rotateY(${(cx * 9).toFixed(2)}deg)`;
      section.style.setProperty('--mx', cx.toFixed(3));
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(frame);
      else raf = null;
    };
    const move = (e) => {
      const r = section.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const leave = () => {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    section.addEventListener('mousemove', move);
    section.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('resize', fit);
      section.removeEventListener('mousemove', move);
      section.removeEventListener('mouseleave', leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="b369" id="books" ref={sectionRef}>
      <div className="b369__head">
        <span className="b369__label reveal">The Books</span>
        <h2 className="b369__title">
          <BlurText text="Project 369" step={0.12} />
        </h2>
        <p className="b369__sub reveal reveal--d2">
          Three keys, a planner and a journal — the 3-6-9 manifestation practice, on paper.
        </p>
      </div>

      <div className="b369__stage reveal reveal--d2" ref={stageRef}>
        <div className="b369__scale" ref={scaleRef}>
          <div className="b369__scene" ref={sceneRef}>
            {BOOKS.map((b, i) => (
              <a
                key={b.key}
                className={`b369__slot${b.minor ? ' b369__slot--minor' : ''}`}
                href={b.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${b.label} — view in the store`}
                style={{
                  '--ry': POSE[i],
                  '--bw': b.minor ? '176px' : '212px',
                  '--bh': b.minor ? '244px' : '312px',
                  '--t': b.minor ? '30px' : '44px',
                }}
              >
                <div className="b369__book">
                  <div className="b369__face b369__back" style={{ backgroundImage: `url(${b.art})` }} />
                  <div className="b369__face b369__pages" />
                  <div className="b369__face b369__ptop" />
                  <div className="b369__face b369__spine" style={{ backgroundImage: `url(${b.art})` }}>
                    <span className="b369__spineTitle">{b.spine}</span>
                  </div>
                  <div className="b369__face b369__front" style={{ backgroundImage: `url(${b.art})` }}>
                    {b.coil && <span className="b369__coil" aria-hidden="true" />}
                    {b.iam ? (
                      <Triquetra ring className="b369__iamSymbol" />
                    ) : (
                      <Mark />
                    )}
                    <span className={`b369__covTitle${b.iam ? ' b369__covTitle--iam' : ''}`}>
                      {b.title}
                      <em>{b.sub}</em>
                    </span>
                    <span className="b369__gloss" aria-hidden="true" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="b369__hint reveal reveal--d3">Pull a book from the shelf &mdash; each one opens in the store.</p>

      <div className="b369__ctaRow reveal reveal--d3">
        <Btn
          href="https://369project.com/products/the-ultimate-manifestation-bundle"
          target="_blank"
          rel="noreferrer"
        >
          Start the 33 days &mdash; from $33.33
        </Btn>
        <span className="b369__ctaNote">Free US shipping over $50</span>
      </div>
    </section>
  );
}
